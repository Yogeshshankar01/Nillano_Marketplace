import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WelcomeModule } from 'src/app/components/welcome/welcome.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { CategoriesModule } from 'src/app/components/categories/categories.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    WelcomeModule,
    HeaderModule,
    CategoriesModule,
    FlexLayoutModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
