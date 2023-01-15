import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { login } from 'src/app/store/login/login.action';
import { register } from 'src/app/store/register/register.action';
import { AppState } from 'src/app/types/AppState';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:FormGroup

  register(){
    this.store.dispatch(register({registrationDetails:{email:this.registerForm.get('email')?.value,password:this.registerForm.get('password')?.value,first_name:this.registerForm.get('first_name')?.value}}))
    console.log(this.registerForm.value)
  }

  onSegmentChange(event:any) {
    if (event.detail.value === 'login') {
      this.router.navigate(['/login']);
    } else if (event.detail.value === 'register') {
      this.router.navigate(['/register']);
    }
  }

  constructor(private store:Store<AppState>,private toastController:ToastController,private router:Router) { 
  //  this.store.dispatch(register({registrationDetails:{email:'latifm8360@gmail.com',password:'12345',first_name:'Abdul-Latif'}})) 
  this.registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
});
  }

  ngOnInit() {
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
