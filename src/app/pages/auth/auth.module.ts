import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './components/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './auth.service';
import { TwoFactorCodeComponent } from './components/two-factor-code/two-factor-code.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, TwoFactorCodeComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  providers: [AuthService],
})
export class AuthModule {}
