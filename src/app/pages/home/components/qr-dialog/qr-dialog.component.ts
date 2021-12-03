import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.scss'],
})
export class QrDialogComponent implements OnInit {
  formControls = {
    code: new FormControl('', Validators.required),
  };

  activateForm = new FormGroup(this.formControls);

  constructor(
    private dialogRef: MatDialogRef<QrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private homeService: HomeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  activate(): void {
    if (this.activateForm.valid)
      this.homeService
        .activateTwoFactor(this.activateForm.value.code)
        .subscribe((res) => {
          this.authService.setAccesToken(res.accesToken);
          this.dialogRef.close(200);
        });
  }
}
