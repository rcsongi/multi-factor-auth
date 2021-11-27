import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/notification.service';
import { LoginDataModel } from '../auth.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginFormControls: Record<keyof LoginDataModel, FormControl> = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  };

  loginForm = new FormGroup(this.loginFormControls);

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  navigateToReg() {
    this.router.navigate(['auth/register']);
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          this.notificationService.openSnackbar('Sikeres Bejelentkezés');
          this.router.navigateByUrl('/home');
        },
        (err: HttpErrorResponse) => {
          this.notificationService.openSnackbar(
            err.error ? err.error.message : 'Váratlan hiba történt'
          );
        }
      );
    } else {
    }
  }
}
