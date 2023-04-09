import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { AppState } from 'src/app/types/AppState';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {

  resetPasswordForm!:any

  changePasswordForm!: FormGroup;

  displayResetForm!: boolean;
  resetToken!: string;

  constructor(private modalController:ModalController,private formBuilder: FormBuilder,private alertController:AlertController,private http:HttpClient,private navParams: NavParams,private router:Router,private store: Store<AppState>,) { }

  async reCreateModal(){
    const modal = await this.modalController.create({
      component: ForgetPasswordComponent
    });
    await modal.present();
  }

  submitResetPasswordForm() {
    const email = this.resetPasswordForm.get('email').value;

    this.store.dispatch(startLoading())

    this.dismiss()

    const mainDomain = `${location.protocol}//${location.hostname}`;

    const data = {
      email : email,
      mainDomain : mainDomain
    }

    // Send reset password request to server using email
    this.http.post<{message:string}>(`${environment.server}/users/requestresetpassword`,data)
    .pipe(take(1))
    .subscribe(res=>{
      res.message ? this.presentAlert(res.message,'') : ''
      this.store.dispatch(endLoading())
    },err=>{

      err.error.message ? this.presentAlert(err.error.message,'') : this.presentAlert("Unable to connect",'')
      this.store.dispatch(endLoading())
      
      this.reCreateModal()
      
    })
    // Display success/failure message to user
  }

  dismiss() {
    if(this.displayResetForm){
      this.router.navigate(['/auth'], { queryParams: { page: 'login' } });
    }
    this.modalController.dismiss();
  }

  resetLinkError!: string;

  httpOptions!: {headers:HttpHeaders};

  ngOnInit() {

    this.displayResetForm = this.navParams.get('displayResetForm');
    this.resetToken = this.navParams.get('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.resetToken}`,
        'Content-Type': 'application/json'
      })
    };

    if(this.displayResetForm){
      
      this.http.get(`${environment.server}/users/resetpassword/decodejwt`,this.httpOptions)
      .pipe(take(1))
      .subscribe(
        res=>{
          // console.log(res)
        },
        err=>{
          this.resetLinkError = err.error.message ? err.error.message : "Unable to connect"
        }
      )
    }

    // console.log(this.displayResetForm)

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      retypePassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });

  }

  onSubmit() {
    if (this.changePasswordForm.valid) {

      this.dismiss()
      
      this.store.dispatch(startLoading())

      const data = {
        newPassword : this.changePasswordForm.get('newPassword')?.value
      }
     
      this.http.post<{message:string}>(`${environment.server}/users/resetpassword`,data,this.httpOptions)
      .pipe(take(1))
      .subscribe(res=>{
        this.presentAlert(res.message,'')
        this.store.dispatch(endLoading())
      },err=>{
        err.error.message ? this.presentAlert(err.error.message,'') : this.presentAlert("Unable to connect",'')
        this.store.dispatch(endLoading())
        this.reCreateModal()
      })
      
    }
  }

  private checkPasswords(group: FormGroup) {
    const password = group.controls['newPassword'].value;
    const confirmPassword = group.controls['retypePassword'].value;

    return password === confirmPassword ? null : { notSame: true };
  }

  async presentAlert(message: string, icon: string) {
    const alert = await this.alertController.create({
      header: 'Password Reset',
      message: message,
      mode: 'ios',
      backdropDismiss: true,
      buttons: [{
        text: 'OK',
        handler: () => {
          // console.log('OK clicked');
        }
      }],
      animated: true,
      translucent: true
    });
  
    await alert.present();
  }
  

}
