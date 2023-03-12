import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { EditproductComponent } from 'src/app/components/editproduct/editproduct.component';
import { ListProductComponent } from 'src/app/components/list-product/list-product.component';
import { ProductsserviceService } from 'src/app/services/productsservice/productsservice.service';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { getUserProducts } from 'src/app/store/userProducts/userproducts.actions';
import { AppState } from 'src/app/types/AppState';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {

  constructor(private modalCtrl: ModalController, private actionSheetController: ActionSheetController, private store: Store<AppState>, private toastController: ToastController, private productsService: ProductsserviceService) { }

  async presentListProductModal() {

    // if(this.user.account_status != "verified"){
    //   this.toastController.create({
    //     message: "Please verify your account to continue",
    //     duration: 2000,
    //     color: 'danger',
    //     position: 'bottom',
    //   }).then((toast) => {
    //     toast.present()
    //   })

    //   return
    // }

    if(!this.user.username){
      this.toastController.create({
        message: "Please provide a username to continue",
        duration: 2000,
        color: 'danger',
        position: 'bottom',
      }).then((toast) => {
        toast.present()
      })

      return
    }

    const modal = await this.modalCtrl.create({
      component: ListProductComponent,
      showBackdrop: true,
    });
    return await modal.present();
  }

  async presentEditProductModal(product: any) {

    const modal = await this.modalCtrl.create({
      component: EditproductComponent,
      showBackdrop: true,
      componentProps: { product }
    });
    return await modal.present();
  }

  async presentDeleteProductActionSheet(productID: Number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to delete this product?',
      subHeader: 'This action cannot be undone.',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          // do nothing
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        role: 'destructive',
        handler: () => {

          this.store.dispatch(startLoading())
          // logic for deleting the product here
          this.productsService.removeProduct(productID)
            .pipe(take(1))
            .subscribe(
              res => {
                this.store.dispatch(endLoading())
                this.toastController.create({
                  message: res.message,
                  duration: 5000,
                  header: "Product Deleted",
                  color: 'primary',
                  position: 'bottom',
                }).then((toast) => {
                  toast.present()
                })

                this.store.dispatch(getUserProducts())
              },
              err => {
                this.store.dispatch(endLoading())
                this.toastController.create({
                  message: err.message,
                  duration: 5000,
                  header: "Error deleting product",
                  color: 'danger',
                  position: 'bottom',
                }).then((toast) => {
                  toast.present()
                })
              }
            )

        }
      }]
    });
    await actionSheet.present();
  }


  products: any

  editProduct(product: any) { }

  user:any ;

  ngOnInit() {

    this.store.select('checkLogin')
    .subscribe(
      res=>{

        if(res.loggedIn){
          this.user = res.profile
        }

       

      }
    )

    this.store.dispatch(getUserProducts())

    this.store.select('userProducts')
      .subscribe(
        products => {

          if (products.process) {
            this.store.dispatch(startLoading())
          }

          if (products.success) {
            this.store.dispatch(endLoading())
            this.products = products.products
          }

          if (products.failure) {
            this.store.dispatch(endLoading())

            this.toastController.create({
              message: products.message,
              duration: 5000,
              header: "Error",
              color: 'danger',
              position: 'bottom',
            }).then((toast) => {
              toast.present()
            })

          }

        }
      )

  }


  handleRefresh(event:any) {
    // do some work to refresh the content here
    // ...

    // let refreshertext = document.querySelector(".refresher-refreshing-text") as HTMLElement

    // refreshertext.style.color = "#000"

    location.reload()
  
    // when the refresh is complete, call the complete() method
    setTimeout(() => {

      event.target.complete();
      
    }, 1500);
  }


}
