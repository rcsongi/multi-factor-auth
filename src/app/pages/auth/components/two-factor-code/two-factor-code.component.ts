import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/notification.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-two-factor-code',
  templateUrl: './two-factor-code.component.html',
})
export class TwoFactorCodeComponent implements OnInit {
  formControls: Record<keyof any, FormControl> = {
    code: new FormControl('', Validators.required),
  };

  twofactorForm = new FormGroup(this.formControls);

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  sendCode(): void {
    this.authService
      .sendTwoFactorCode(this.twofactorForm.value.code)
      .subscribe((res) => {
        this.notificationService.openSnackbar('Sikeres Authentikáció');
        this.router.navigateByUrl('home');
      });
  }
}
