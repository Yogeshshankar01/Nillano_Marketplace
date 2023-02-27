import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { SaveditemsService } from 'src/app/services/saveditems.service';
import { getUserProducts } from 'src/app/store/userProducts/userproducts.actions';
import { AppState } from 'src/app/types/AppState';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private menuController: MenuController, private store: Store<AppState>,private savedItemsService:SaveditemsService) { }

  user: any

  productsAvailable = 0
  userProductsAvailable = 0

  savedItems:any

  ngOnInit() {

    this.savedItems = this.savedItemsService.getAllSavedItems()

    this.store.dispatch(getUserProducts())

    this.store.select('products').subscribe(res => {

      if (res.success) {
        this.productsAvailable = res.products.length
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
