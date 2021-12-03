import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';

const IMPORTS = [
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatButtonModule,
  ReactiveFormsModule,
  MatTabsModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...IMPORTS],
  exports: [...IMPORTS],
})
export class SharedModule {}
