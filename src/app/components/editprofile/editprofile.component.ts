import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { AppState } from 'src/app/types/AppState';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditProfileComponent implements OnInit {


  user: any;

  dismissModal() {
    // code to dismiss the modal
    this.modalCtrl.dismiss()
  }

  save() {

    this.store.dispatch(startLoading())

    // code to save the changes to the user object

    let user = {
      username:this.user.username,
      first_name: this.user.first_name,
      last_name : this.user.last_name,
      phone_number : this.user.phone_number
    }

    this.http.post<{message:string}>(`${environment.server}/users/edit-profile`,user)
    .pipe(take(1))
    .subscribe(
      res=>{

        this.store.dispatch(endLoading())

        this.dismissModal()

        res.message && this.toastController.create({
          message: res.message,
          duration: 5000,
          header: "Profile Updated",
          color: 'primary',
          position: 'top'
        }).then((toast) => {
          toast.present()
      })

      },
      err=>{

        this.store.dispatch(endLoading())

        this.dismissModal()

        err.error.message && this.toastController.create({
          message: err.error.message,
          duration: 5000,
          header: "Profile not updated",
          color: 'danger',
          position: 'top'
        }).then((toast) => {
          toast.present()
      })

    }
    )

  }

  constructor(private modalCtrl:ModalController,private navParams  : NavParams,private http:HttpClient,private toastController:ToastController,private store:Store<AppState>) { }

  ngOnInit() {
    this.user = this.navParams.get('user')
  }

}
