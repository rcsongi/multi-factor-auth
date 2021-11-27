import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/notification.service';
import { RegisterDataModel } from '../auth.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerFormControls: Record<keyof RegisterDataModel, FormControl> = {
    email: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordAgain: new FormControl('', Validators.required),
  };

  registerForm = new FormGroup(this.registerFormControls);

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      const registerData: RegisterDataModel = this.registerForm.value;

      if (registerData.password !== registerData.passwordAgain) {
        this.notificationService.openSnackbar('A 2 jelszó nem egyezik meg');
        return;
      } else {
        this.authService.register(registerData).subscribe(() => {
          this.notificationService.openSnackbar(
            'Sikeres regisztráció, kérjük jelentkezz be.'
          );
          this.router.navigateByUrl('auth/login');
        });
      }
    }
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('auth/login');
  }
}
