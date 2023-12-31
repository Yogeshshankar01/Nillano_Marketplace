import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { SaveditemsService } from 'src/app/services/saveditems.service';
import { getUserProducts } from 'src/app/store/userProducts/userproducts.actions';
import { AppState } from 'src/app/types/AppState';
import { SupportComponent } from '../support/support.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  isIOS:boolean

  constructor(private modalCtrl: ModalController,private router: Router, private menuController: MenuController, private store: Store<AppState>,private savedItemsService:SaveditemsService,private platform: Platform) { 
    this.isIOS = this.platform.is('ios');
  }

  async openSupportModal(){

    this.menuController.close()
    
    const modal = await this.modalCtrl.create({
      component: SupportComponent,
      showBackdrop: true,
    });
    return await modal.present();
  }

  user: any

  productsAvailable = 0
  userProductsAvailable = 0

  savedItems:any

  totalUnreadMessages = 0

  ngOnInit() {

    this.store.select("getUserMessages")
      .subscribe(
        res => {
          if (res.success) {
            this.totalUnreadMessages = res.totalUnreadMesages
          }

          if (res.fail) {
            this.totalUnreadMessages = 0
          }

        }
      )

    this.savedItems = this.savedItemsService.getAllSavedItems()

    this.store.dispatch(getUserProducts())

    this.store.select('products').subscribe(res => {

      if (res.success) {
        this.productsAvailable = res.productsAvailable
      }

    })

    this.store.select('userProducts')
      .subscribe(
        products => {

          if (products.success) {
            this.userProductsAvailable = products.products.length
          }

        }
      )

    this.store.select('checkLogin')
      .subscribe(
        res => {

          if (res.loggedIn) {
            this.user = res.profile
          }

          if (!res.loggedIn) {
            this.user = false
          }

        }
      )

  }

  redirect(redirect: any) {
    // navigate to the products page
    this.menuController.close()
    this.router.navigate([redirect]);
  }

  redirectAuth(redirect:string){

    if(this.router.url!='/home'){
    localStorage.setItem('currentroute',this.router.url)
    }

    this.menuController.close()
    this.router.navigate(['auth'],{queryParams :{page:redirect}});
  }


}
