import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { BalanceComponent } from 'src/app/components/balance/balance.component';
import { DisplayImageModalComponent } from 'src/app/components/display-image-modal/display-image-modal.component';
import { EditProfileComponent } from 'src/app/components/editprofile/editprofile.component';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  coverImageUrl = 'https://images.pexels.com/photos/3906110/pexels-photo-3906110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  profileImageUrl: any = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor(private modalCtrl: ModalController, private userProfileService: UserprofileService, private actionSheetCtrl: ActionSheetController,private router : Router,private http:HttpClient,private store:Store,private toastController:ToastController) { }

  viewImage: any

  removedImages: any

  removeProfileImage = false

  newProfileImage: any

  onChangeProfileImage(event: any) {

    const file = event.target.files[0];;
    if (file.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {

      if (!this.removeProfileImage) {
        this.removedImages = this.user.user_profile
        this.removeProfileImage = true
      }

      this.newProfileImage = file

      this.profileImageUrl = reader.result;

      this.viewImage = { image: "New Image", url: this.profileImageUrl }
      let openmodal = document.querySelector("span#open-view-changed-profile-image-modal") as HTMLElement
      openmodal.click()

      // const modal = await this.modalCtrl.create({
      //   component: DisplayImageModalComponent,
      //   showBackdrop: true,
      //   componentProps : {imageUrl:this.profileImageUrl}
      // });
      // return await modal.present();

    };

  }

  onSaveNewProfileImage() {

    this.modalCtrl.dismiss()

    this.store.dispatch(startLoading())

    let formData = new FormData()

    formData.append('image',this.newProfileImage)

    formData.append("removedImage",JSON.stringify(this.removedImages))

    this.http.post<{message:string}>(`${environment.server}/users/change-profileimage`,formData)
    .pipe(take(1))
    .subscribe(
      res=>{
        this.store.dispatch(endLoading())

        this.toastController.create({
          message: res.message,
          duration: 3500,
          header: "Success",
          color: 'primary',
          position: 'top'
        }).then((toast) => {
          toast.present()
        })

        this.getUser()

      },
      err=>{
        this.store.dispatch(endLoading())

        err.error.message && this.toastController.create({
          message: err.error.message,
          duration: 3500,
          header: "Error",
          color: 'danger',
          position: 'top'
        }).then((toast) => {
          toast.present()
        })

      }
    )

    this.removeProfileImage = false
    this.removedImages = ""

  }

  async onProfileImageClick() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Profile Image',
      buttons: [
        {
          text: 'Change Image',
          role: 'default',
          icon: 'camera',
          handler: () => {
            // do nothing
            let changeProfileImage = document.querySelector("input#changeProfileImage") as HTMLElement
            changeProfileImage.click()
          }
        },
        {
          text: 'View Image',
          role: 'default',
          icon: 'image',
          handler: async () => {

            const modal = await this.modalCtrl.create({
              component: DisplayImageModalComponent,
              showBackdrop: true,
              componentProps : {imageUrl:this.user.user_profile.url}
            });
            return await modal.present();

          }
        },
        {
          text: 'Remove Image',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // do something

            this.store.dispatch(startLoading())

            this.http.post<{message:string}>(`${environment.server}/users/remove-profileimage`,{image:this.user.user_profile})
            .pipe(take(1))
            .subscribe(
              res=>{

                this.store.dispatch(endLoading())

                this.toastController.create({
                  message: res.message,
                  duration: 3500,
                  header: "Success",
                  color: 'primary',
                  position: 'top'
                }).then((toast) => {
                  toast.present()
                })
        
                this.getUser()

              },
              err=>{

                this.store.dispatch(endLoading())
                
                err.error.message && this.toastController.create({
                  message: err.error.message,
                  duration: 3500,
                  header: "Error",
                  color: 'danger',
                  position: 'top'
                }).then((toast) => {
                  toast.present()
                })

              }
            )

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

  }

  async presentBalanceModal() {
    const modal = await this.modalCtrl.create({
      component: BalanceComponent,
      showBackdrop: true,
      initialBreakpoint: 0.4
    });
    return await modal.present();
  }

  isVerified = false;

  verifyAccount() {
    // Implement account verification logic here
  }

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfileComponent,
      showBackdrop: true,
      initialBreakpoint: 0.48,
      componentProps: { "user": this.user }
    });
    await modal.present();
    await modal.onDidDismiss().then(
      ()=>{
        this.getUser()
      }
    )
  }

  user: any

  getUser() {
    this.userProfileService.myProfile()
      .pipe(take(1))
      .subscribe(
        res => {
          this.user = res.profile
        },
        err => {
          console.log(err)
        }
      )
  }


  redirect(redirect: any) {
    // navigate to the products page
    const navigationExtras: NavigationExtras = { replaceUrl: true };
    this.router.navigate([redirect], navigationExtras);
  }


  ngOnInit() {

    this.getUser()

  }

}
