import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api/api.service';
import { LoginDataModel, RegisterDataModel, RegisterDto } from './auth.models';

const ACCES_TOKEN = 'ACCES_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private jwtHelper: JwtHelperService
  ) {}

  login(loginData: LoginDataModel): Observable<{ accesToken: string }> {
    return this.apiService
      .post<{ accesToken: string }>('auth/signIn', loginData)
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

  setAccesToken(token: string): void {
    localStorage.setItem(ACCES_TOKEN, token);
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
}
