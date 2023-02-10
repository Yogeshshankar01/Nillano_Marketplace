import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProductsPageRoutingModule } from './my-products-routing.module';

import { MyProductsPage } from './my-products.page';
import { ListProductModule } from 'src/app/components/list-product/list-product.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProductsPageRoutingModule,
    ListProductModule
  ],
  declarations: [MyProductsPage]
})
export class MyProductsPageModule {}
