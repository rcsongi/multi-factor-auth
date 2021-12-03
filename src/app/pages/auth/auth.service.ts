import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api/api.service';
import {
  AccesTokenModel,
  LoginDataModel,
  LoginResponseModel,
  RegisterDataModel,
  RegisterDto,
  TwoFactorAuthDto,
  User,
} from './auth.models';

const ACCES_TOKEN = 'ACCES_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(null);
  constructor(
    private apiService: ApiService,
    private jwtHelper: JwtHelperService
  ) {
    this.currentUserSubject.next(jwtDecode(this.getAccesToken) as User);
  }

  login(loginData: LoginDataModel): Observable<LoginResponseModel> {
    return this.apiService
      .post<LoginResponseModel>('auth/signIn', loginData)
      .pipe(tap((res) => this.setAccesToken(res.accesToken)));
  }

  register(registerData: RegisterDataModel): Observable<any> {
    const dto: RegisterDto = {
      email: registerData.email,
      password: registerData.password,
      userName: registerData.userName,
    };
    return this.apiService.post('auth/signUp', dto);
  }

  sendTwoFactorCode(code: string): Observable<LoginResponseModel> {
    const dto: TwoFactorAuthDto = { twoFactorAuthenticationCode: code };
    return this.apiService
      .post<LoginResponseModel>('tfa/authenticate', dto)
      .pipe(tap((res) => this.setAccesToken(res.accesToken)));
  }

  setAccesToken(token: string): void {
    localStorage.setItem(ACCES_TOKEN, token);

    if (token) {
      const jwt = jwtDecode(token) as AccesTokenModel;
      this.currentUserSubject.next({
        email: jwt.email,
        isTwoFactorEnabled: jwt.isTwoFactorEnabled,
        userName: jwt.userName,
      });
    }
  }

  get getAccesToken(): string {
    return localStorage.getItem(ACCES_TOKEN);
  }

  isAuthenticated(): boolean {
    const token = this.getAccesToken;

    if (
      token.match('^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_.+/=]*$')
    ) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  isSecondFactorAuthenticated(): boolean {
    const token = this.getAccesToken;
    const jwt = jwtDecode(token) as AccesTokenModel;

    return (
      !jwt.isTwoFactorEnabled ||
      (jwt.isTwoFactorEnabled && jwt.isSecondFactorAuthenticated)
    );
  }

  get getUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }
}
