import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/pages/auth/auth.models';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { HomeService } from '../../home.service';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.scss'],
})
export class HomeProfileComponent implements OnInit {
  user: User;
  qr: Blob = new Blob();
  fileUrl: any;

  constructor(
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
    private homeService: HomeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.getUser.subscribe((res) => {
      this.user = res;
      console.log('User, ', res);
    });
  }

  changeGoogleAuthStatus() {
    if (this.user.isTwoFactorEnabled) {
      this.homeService.removeTwoFactorAuthenticate().subscribe((res) => {
        this.authService.setAccesToken(res.accesToken);
      });
    } else {
      this.homeService
        .generateTwoFactorQr()
        .pipe(
          switchMap((res) => {
            this.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(res)
            );
            return this.dialog
              .open(QrDialogComponent, {
                data: this.fileUrl,
              })
              .afterClosed();
          })
        )
        .subscribe((res) => {});
    }
  }
}
