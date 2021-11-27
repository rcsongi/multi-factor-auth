import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    return this.authenticate();
  }

  canLoad(): boolean {
    return this.authenticate();
  }

  authenticate(): boolean {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isSecondFactorAuthenticated()) {
        return true;
      } else {
        this.router.navigateByUrl('auth/twofactor');
      }
    } else {
      this.router.navigateByUrl('auth/login');
      return false;
    }
  }
}
