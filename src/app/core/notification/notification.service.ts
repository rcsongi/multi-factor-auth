import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  openSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', { duration: 4000 });
  }
}
