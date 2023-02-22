import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { checkLogin } from 'src/app/store/checkLogin/checklogin.actions';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { login } from 'src/app/store/login/login.action';
import { register } from 'src/app/store/register/register.action';
import { AppState } from 'src/app/types/AppState';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  loginSubscription : Subscription | undefined

  loginForm:FormGroup

  selectedTab = 'login'

  registerForm:FormGroup

  register(){
    this.store.dispatch(register({registrationDetails:{email:this.registerForm.get('email')?.value,password:this.registerForm.get('password')?.value,first_name:this.registerForm.get('first_name')?.value}}))
    console.log(this.registerForm.value)
  }


  login(){
    this.store.dispatch(login({email:this.loginForm.get('email')?.value,password:this.loginForm.get('password')?.value}))
  }

  onSegmentChange(event:any) {
    
    this.selectedTab = event.detail.value;
    
  }
  

  constructor(private store : Store<AppState>,private authService:AuthService, private toastController:ToastController,private router:Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  
  this.registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
});

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
            duration:1500,
            header:"Login Successful",
            color:'primary',
            position : 'bottom'
          }).then(toast=>toast.present())

          this.store.dispatch(checkLogin())

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
    

    this.store.select('register')
    .subscribe(
      registerState=>{

        if(registerState.registering){
          this.store.dispatch(startLoading())
        }

        if(registerState.registered){

          this.store.dispatch(endLoading())

          this.store.dispatch(login({email:this.registerForm.get('email')?.value,password:this.registerForm.get('password')?.value}))

          this.toastController.create({
            message:registerState.message,
            duration:5000,
            header:"Registration Successful",
            color:'primary',
            position : 'bottom'
          }).then(toast=>toast.present())

        }

        if(registerState.registrationFail){
          this.store.dispatch(endLoading())
          this.toastController.create({
            message: registerState.message,
            duration:5000,
            header:"Registration Failed",
            color:'danger',
            position : 'bottom'
          }).then(toast=>toast.present())
        }

      }
    )
    
  }

}
