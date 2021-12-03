import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api/api.service';
import { TwoFactorAuthDto } from '../auth/auth.models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private apiService: ApiService, private httpClient: HttpClient) {}

  removeTwoFactorAuthenticate(): Observable<{ accesToken: string }> {
    return this.apiService.post('tfa/turn-off', {});
  }

  generateTwoFactorQr(): Observable<any> {
    return this.apiService.get('tfa/generate', { responseType: 'blob' });
  }

  activateTwoFactor(code: string): Observable<{ accesToken: string }> {
    const dto: TwoFactorAuthDto = {
      twoFactorAuthenticationCode: code,
    };
    return this.apiService.post<{ accesToken: string }>('tfa/turn-on', dto);
  }
}
