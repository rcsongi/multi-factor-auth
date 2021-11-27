import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';
import { HomeWelcomeComponent } from './components/home-welcome/home-welcome.component';
import { HomeMultiFactorComponent } from './components/home-multi-factor/home-multi-factor.component';

@NgModule({
  declarations: [HomePageComponent, HomeProfileComponent, HomeWelcomeComponent, HomeMultiFactorComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
