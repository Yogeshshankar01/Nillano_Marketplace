import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
