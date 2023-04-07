import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/AppState';
import Masonry from 'masonry-layout';
import { Router } from '@angular/router';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { ActionSheetController, AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { getProducts } from 'src/app/store/products/products.action';
import { ProductsserviceService } from 'src/app/services/productsservice/productsservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { SearchComponent } from 'src/app/components/search/search.component';
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy, OnInit {

  handleRefresh(event: any) {
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

  isLoggedIn = false

  products: any = []

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  title = 'Home Page'

  welcomeMessage = false

  selectedTab = 'buying';

  segmentChanged(event: any) {

    this.selectedTab = event.detail.value;

  }

  isIOS!: boolean;

  constructor(private store: Store<AppState>, private router: Router, private toastController: ToastController, private productsService: ProductsserviceService, private authService: AuthService, private actionSheetController: ActionSheetController, private platform: Platform, private alertController: AlertController, private modalCtrl: ModalController, private websocketservice: WebSocketServiceService) {

    this.isIOS = this.platform.is('ios');

  }

  async presentLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Login Required',
      message: 'You need to log in to perform this action.',
      buttons: ['OK']
    });

    await alert.present();
  }

  productsStateSubscription: Subscription | undefined;

  toast: any

  connected!: boolean;

  retry() {
    this.store.dispatch(getProducts({ page: 1 }))
  }

  totalUnreadMessages = 0

  ionViewDidEnter() {

    // this.store.dispatch(startLoading())

    setTimeout(() => {
      let products = document.querySelector('.products') as HTMLElement
      let masonry = new Masonry(products, {
        itemSelector: '.product-item'
      })
      // this.store.dispatch(endLoading())
    }, 2000);

    if (localStorage.getItem("access_token")) {
      this.isLoggedIn = true
    }
    else {
      this.isLoggedIn = false
    }
  }

  loadMoreProducts(event: any) {
    // Fetch more products from your database or service

    let nextPage: number = Number(localStorage.getItem('currentPage'))

    this.store.dispatch(getProducts({ page: nextPage + 1 }))


    setTimeout(() => {
      let products = document.querySelector('.products') as HTMLElement
      let masonry = new Masonry(products, {
        itemSelector: '.product-item'
      })
      event.target.complete();
    }, 2000);


  }

  async searchI() {
    const modal = await this.modalCtrl.create({
      component: SearchComponent,
      showBackdrop: true,
    });
    return await modal.present();
  }

  ngOnInit() {

    // this.presentLoginAlert()

    this.websocketservice.totalUnreadMessages
      .subscribe(
        res => {
          // console.log(res)
          this.totalUnreadMessages = res
        }
      )

    if (localStorage.getItem("access_token")) {
      this.isLoggedIn = true
    }
    else {
      this.isLoggedIn = false
    }

    this.store.select('register')
      .subscribe(
        registerState => {
          if (registerState.registered) {
            this.welcomeMessage = true
          }
        }
      )

    // this.store.select("getUserMessages")
    //   .subscribe(
    //     res => {
    //       if (res.success) {
    //         this.totalUnreadMessages = res.totalUnreadMesages
    //       }

    //       if (res.fail) {
    //         this.totalUnreadMessages = 0
    //       }

    //     }
    //   )

    this.store.dispatch(getProducts({ page: 1 }))

    // Getting the states of the products at each time
    this.productsStateSubscription = this.store.select('products').subscribe(res => {

      // if(!res.filter && !this.getProducts){
      //   this.store.dispatch(getProducts())
      //   this.getProducts = true
      // }

      if (res.process) {
        this.products.length < 1 && this.store.dispatch(startLoading())
      }

      if (res.success) {
        this.store.dispatch(endLoading())
        // console.log(res.products)

        this.products = this.products.length > 0 ? [...this.products, ...res.products] : res.products

        this.connected = true

        setTimeout(() => {
          let products = document.querySelector('.products') as HTMLElement
          let masonry = new Masonry(products, {
            itemSelector: '.product-item'
          })
        }, 2000);

      }

      if (res.failure) {

        this.store.dispatch(endLoading())

        this.connected = false

        this.toast = this.toastController.create({
          message: res.message ? res.message : "Sorry, we're unable to retrieve products at the moment. We're working to fix the issue. Please try again later.",
          color: 'danger',
          duration: 3000,
          position: 'bottom',
          cssClass: 'flex-contianer',
          buttons: [
            {
              text: 'Retry',
              handler: () => {
                this.store.dispatch(getProducts({ page: 1 }))
              }
            }
          ]
        }).then(toast => toast.present())


      }

    })

  }

  ngOnDestroy() {

    if (this.productsStateSubscription) {
      this.productsStateSubscription.unsubscribe();
    }

  }

  openfilter() {
    this.router.navigate(['/products'], { queryParams: { openFilter: true } });
  }


  ngAfterViewInit() {
    // window.addEventListener('load',()=>{

    //     setTimeout(() => {
    //         let products = document.querySelector('#newarrivals') as HTMLElement;
    //         let masonry = new Masonry(products,{
    //             itemSelector : '.product-item'
    //           })
    //       }, 2000);

    // })

  }

}
