import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
