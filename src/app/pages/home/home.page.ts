import { Component, OnDestroy, OnInit,AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/AppState';
import Masonry from 'masonry-layout';
import { Router } from '@angular/router';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { getProducts } from 'src/app/store/products/products.action';
import { ProductsserviceService } from 'src/app/services/productsservice/productsservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy,OnInit {

  isLoggedIn = false

  products:any = []
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  chats = [
    {name : "Lawson Shoes"},
    {name : "ShoeShopper"},
    {name : "MarketMaverick"},
    {name : "Seller456"},
    {name : "TradeMaster"},
    {name : "Shopaholic789"},
    {name : "LawsonLuxe"},
    {name : "StepUpStyle"},
    {name : "Lawson Shoes"},
    {name : "ShoeShopper"},
    {name : "MarketMaverick"},
    {name : "Seller456"},
    {name : "TradeMaster"},
    {name : "Shopaholic789"},
    {name : "LawsonLuxe"},
    {name : "StepUpStyle"}
  ]

  title = 'Home Page'

  welcomeMessage = false

  selectedTab = 'buying';

  segmentChanged(event: any) {

    this.selectedTab = event.detail.value;

  }

  constructor(private store:Store<AppState>,private router:Router,private toastController : ToastController,private productsService:ProductsserviceService,private authService:AuthService,private actionSheetController:ActionSheetController) {
  
  }


  productsStateSubscription: Subscription | undefined;

  toast:any

  ngOnInit() {

    if(localStorage.getItem("access_token")){
      this.isLoggedIn = true
    }
    else{
      this.isLoggedIn = false
    }

    this.store.select('register')
    .subscribe(
      registerState=>{
        if(registerState.registered){
          this.welcomeMessage = true
        }
      }
    )

    this.store.dispatch(getProducts())

      // Getting the states of the products at each time
      this.productsStateSubscription = this.store.select('products').subscribe(res => {

        // if(!res.filter && !this.getProducts){
        //   this.store.dispatch(getProducts())
        //   this.getProducts = true
        // }
  
        if (res.process) {
          this.store.dispatch(startLoading())
        }
  
        if (res.success) {
          this.store.dispatch(endLoading())
          // console.log(res.products)
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
  
          this.toast = this.toastController.create({
            message: res.message ? res.message : "Sorry, we're unable to retrieve products at the moment. We're working to fix the issue. Please try again later.",
            color: 'danger',
            position: 'bottom',
            cssClass: 'flex-contianer',
            buttons: [
              {
                text: 'Retry',
                handler: () => {
                  this.store.dispatch(getProducts())
                }
              }
            ]
          }).then(toast => toast.present())
  
  
        }
  
      })

  }

  ngOnDestroy(){

    if (this.productsStateSubscription) {
      this.productsStateSubscription.unsubscribe();
    }

  }

  openfilter() {
    this.router.navigate(['/products'], { queryParams: { openFilter: true } });
  }
  

  ngAfterViewInit(){
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
