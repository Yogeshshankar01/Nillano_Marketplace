import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ProductsserviceService } from 'src/app/services/productsservice/productsservice.service';
import { filterProducts } from 'src/app/store/products/products.action';
import { AppState } from 'src/app/types/AppState';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

categories:any = []

  @ViewChild('popover') popover:any;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  constructor(private productsservice:ProductsserviceService,private store:Store<AppState>,private router : Router,private popoverController:PopoverController,private modalCtrl : ModalController) { }


  productFilter(categoryID:Number,SubcategoryID:Number){

    this.popoverController.dismiss();

    this.modalCtrl.dismiss()

    this.store.dispatch(filterProducts({ filters: { category: categoryID, subcategory: SubcategoryID, priceRange: undefined } }))

    this.router.navigateByUrl('products')

    // console.log({categoryID,SubcategoryID})

  }

  ngOnInit() {
    this.productsservice.getCategoriesAndSubCategoies().subscribe(
      categories=>{
        // console.log(categories)
        this.categories = categories
      }
    )
  }

}
