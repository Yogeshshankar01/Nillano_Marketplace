import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth/auth.service';
import { checkLogin } from './store/checkLogin/checklogin.actions';
import { getUserMessages } from './store/getUserMessages/userMessages.action';
import { startLoading } from './store/loading/loading.action';
import { AppState } from './types/AppState';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  handleRefresh(event:any) {
    // do some work to refresh the content here
    // ...


    location.reload()
  
    // when the refresh is complete, call the complete() method
    setTimeout(() => {

      event.target.complete();
      
    }, 2000);
  }
  

  isLoggedIn:boolean

  constructor(private actionSheetController:ActionSheetController,private store:Store<AppState>,private authService:AuthService) {

    if(localStorage.getItem("access_token")){
      this.isLoggedIn = true
    }
    else{
      this.isLoggedIn = false
    }

  }

  ngOnInit() {
    this.store.dispatch(checkLogin())
    this.store.dispatch(getUserMessages())

    this.store.select('checkLogin')
    .subscribe(
      res=>{
        
          this.isLoggedIn = res.loggedIn

      }
    )

  }

  async logout(){
  

    const actionSheet = await this.actionSheetController.create({
      header: 'Confirm Log out',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          // do nothing
        }
      }, {
        text: 'Confirm',
        icon: 'log-out-outline',
        role: 'destructive',
        handler: () => {

          this.store.dispatch(startLoading())

          this.authService.logout()

        }
      }]
    });
    await actionSheet.present();

  }


}
