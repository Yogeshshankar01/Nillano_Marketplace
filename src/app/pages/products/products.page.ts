import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { InfiniteScrollCustomEvent, PopoverController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { filterProducts, getProducts } from 'src/app/store/products/products.action';
import { AppState } from 'src/app/types/AppState';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { ProductsserviceService } from 'src/app/services/productsservice/productsservice.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: any = [];
  categoriesAndSubcategories: any = [];
  // selectedCategory: string | undefined;
  // selectedPriceRange: string | undefined;

  selectedCategory: any
  selectedSubcategory: any
  priceRange: any

  masonry: any

  constructor(private popoverController: PopoverController, private store: Store<AppState>, private productsService: ProductsserviceService, private toastController: ToastController, private activatedRoute: ActivatedRoute) {

  }

  getProducts = false

  ngOnInit() {

    // Getting all avialable categories and subcategories
    this.productsService.getCategoriesAndSubCategoies()
    .pipe(take(1))
    .subscribe(
      (res) => {
        this.categoriesAndSubcategories = res

        // console.log(res)

        this.activatedRoute.queryParams
        .pipe(take(1))
        .subscribe(params => {
          if (params['openFilter']) {
            this.openFilter();
          }
        });

      },
      (err) => {

        console.log(err)

      })


      // Getting the states of the products at each time
    this.store.select('products')
    .pipe(take(1))
    .subscribe(res => {

      if(!res.filter && !this.getProducts){
        this.store.dispatch(getProducts())
        this.getProducts = true
      }

      if (res.process) {
        this.store.dispatch(startLoading())
      }

      if (res.success) {
        this.store.dispatch(endLoading())
        console.log(res.products)
        this.products = res.products

        setTimeout(() => {
          let products = document.querySelector('.products') as HTMLElement
          let masonry = new Masonry(products, {
            itemSelector: '.product-item'
          })
        }, 2000);

      }

      if (res.failure) {

        this.store.dispatch(endLoading())

        console.log(res.message)

        this.toastController.create({
          message: res.message ? res.message : "Sorry, we're unable to retrieve products at the moment. We're working to fix the issue. Please try again later.",
          header: "Product Retrieval Error",
          color: 'danger',
          position: 'bottom',
          cssClass: 'flex-contianer',
          buttons: [
            {
              text: 'Retry',
              handler: () => {
                this.store.dispatch(getProducts())
                this.productsService.getCategoriesAndSubCategoies()
                .pipe(take(1))
                .subscribe(
                  (res) => {
                    this.categoriesAndSubcategories = res
                  },
                  (err) => {

                    console.log(err)

                  })
              }
            }
          ]
        }).then(toast => toast.present())


      }

    })
  }


  filterProducts() {

    // this.getProducts();
    this.products = this.products.filter((product: { category: string; price: number; }) => {
      if (this.selectedCategory && product.category != this.selectedCategory) {
        return false;
      }
      if (this.priceRange) {
        if (this.priceRange === 'low' && (product.price < 50)) {
          return true;
        } else if (this.priceRange === 'medium' && (product.price >= 50 && product.price <= 100)) {
          return true;
        } else if (this.priceRange === 'high' && (product.price > 100)) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    });
  }


  loadMoreProducts(event: any) {

    setTimeout(() => {

      // const nextBatch = this.getProducts1()

      // this.products.push(...nextBatch);
      // event.target.complete();

      // this.masonry.reload()

      (event as InfiniteScrollCustomEvent).target.complete();

    }, 5000);

    // Call the function that retrieves the next batch of products from the database
    // this.getMoreProducts().then(() => {
    //   event.target.complete();
    // });
  }

  openFilter() {

    this.popoverController.create({
      component: FilterComponent,
      componentProps: {
        selectedCategory: this.selectedCategory,
        selectedSubcategory: this.selectedSubcategory,
        priceRange: this.priceRange,
        categoriesAndSubcategories: this.categoriesAndSubcategories
      }
    }).then((popover: any) => {
      console.log({ cat: this.selectedCategory, sub: this.selectedSubcategory, price: this.priceRange })
      popover.onDidDismiss().then((data: any) => {
        if (data && data.data) {
          this.selectedCategory = data.data.selectedCategory;
          this.selectedSubcategory = data.data.selectedSubcategory;
          this.priceRange = data.data.priceRange;

          // this.filterProducts()

          console.log({ cat: this.selectedCategory, sub: this.selectedSubcategory, price: this.priceRange })

          this.store.dispatch(filterProducts({ filters: { category: this.selectedCategory, subcategory: this.selectedSubcategory, priceRange: this.priceRange } }))
          // Filter your products here using the selected values of category, subcategory and price
        }
      });
      popover.present();
    });
  }

  ngAfterViewInit() {

    // window.addEventListener('load',()=>{
    //   let products = document.querySelector('.products') as HTMLElement
    // this.masonry = new Masonry(products,{
    //   itemSelector : '.product-item'
    // })
    // })


  }

}
