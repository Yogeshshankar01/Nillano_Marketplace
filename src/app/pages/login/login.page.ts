import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { login } from 'src/app/store/login/login.action';
import { AppState } from 'src/app/types/AppState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginSubscription : Subscription | undefined

  loginForm:FormGroup


  login(){
    this.store.dispatch(login({email:this.loginForm.get('email')?.value,password:this.loginForm.get('password')?.value}))
  }

  onSegmentChange(event:any) {
    if (event.detail.value === 'login') {
      this.router.navigate(['/login']);
    } else if (event.detail.value === 'register') {
      this.router.navigate(['/register']);
    }
  }
  

  constructor(private store : Store<AppState>,private authService:AuthService, private toastController:ToastController,private router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
    // this.store.dispatch(login({email:'latifm8360@gmail.com',password:'lson3jkos898982j389j9snd90snn90'}))
   }

  ngOnInit() {
    this.store.select('login')
    .subscribe(
      async loginState =>{
        if(loginState.isLogingIn){
          this.store.dispatch(startLoading())
        }
        if(loginState.isLogedIn){
          this.store.dispatch(endLoading())

          this.toastController.create({
            message:loginState.message,
            duration:5000,
            header:"Login Successful",
            color:'primary',
            position : 'bottom'
          }).then(toast=>toast.present())

          this.router.navigate(['home'])

        }
        if(loginState.isLogingInFailure){
          this.store.dispatch(endLoading())
          this.toastController.create({
            message: loginState.message,
            duration:5000,
            header:"Login Failed",
            color:'danger',
            position : 'bottom'
          }).then(toast=>toast.present())
        }

      },
      err =>{
        console.log(err)
        
      }
    )
    // this.authService.login({password:'123456',email:'error@email.com'}).subscribe(
    //   res=>console.log(res),
    //   err=>console.log(err)
    // )
  }

}
