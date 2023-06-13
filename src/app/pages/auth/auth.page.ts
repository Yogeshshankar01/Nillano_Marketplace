import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { ForgetPasswordComponent } from 'src/app/components/forget-password/forget-password.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { checkLogin } from 'src/app/store/checkLogin/checklogin.actions';
import { getUserMessages } from 'src/app/store/getUserMessages/userMessages.action';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { login } from 'src/app/store/login/login.action';
import { register } from 'src/app/store/register/register.action';
import { getUserProducts } from 'src/app/store/userProducts/userproducts.actions';
import { AppState } from 'src/app/types/AppState';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  handleRefresh(event:any) {
    // do some work to refresh the content here
    // ...

    // let refreshertext = document.querySelector(".refresher-refreshing-text") as HTMLElement

    // refreshertext.style.color = "#000"

    location.reload()
  
    // when the refresh is complete, call the complete() method
    setTimeout(() => {

      event.target.complete();
      
    }, 1500);
  }

  trimEmail() {
    const emailFormControl = this.registerForm.get('email');
    emailFormControl?.setValue(emailFormControl.value.trim());
  }

  trimLoginEmail() {
    const emailFormControl = this.loginForm.get('email');
    emailFormControl?.setValue(emailFormControl.value.trim());
  }
  

  interest = 'shop'

  bio = ""

  username = ""

  knowInterest() {

    if (!this.interest) {

      this.toastController.create({
        message: "Please select one option...",
        duration: 1500,
        color: 'danger',
        position: 'bottom'
      }).then(toast => toast.present())

      return

    }

    let selectOption = document.getElementById('selectOption') as HTMLElement
    let sellerUserName = document.getElementById('sellerUserName') as HTMLElement

    if (this.interest == "seller") {
      selectOption.classList.remove('d-flex')
      selectOption.classList.add('d-none')
      sellerUserName.classList.remove('d-none')
      sellerUserName.classList.add('d-flex')
      return
    }

    else {
      this.isModalOpen = false

      setTimeout(() => {

        this.router.navigate(['/home'])
        
      }, 100);

      return
    }

  }

  userNameExists:any

  checkUserNameExists(){

    this.http.get<{message:string}>(`${environment.server}/users/checkusername/${this.username}`)
    .pipe(take(1))
    .subscribe(
      res=>{
        this.userNameExists = {
          exists:true,
          message:res.message
        }
      },
      err=>{
        if(err.error.message){
          this.userNameExists = {
            exists:false,
            message:err.error.message
          }
        }
      }
    )

  }

  sellerRegistration(){

    if(!this.username){

      this.toastController.create({
        message: "Please provide a user name for your shop",
        duration: 1500,
        color: 'danger',
        position: 'top'
      }).then(toast => toast.present())

      return

    }

    if(!this.userNameExists || !this.userNameExists.exists){
      return
    }

    this.isModalOpen = false

    // this.registerForm.get('bio')?.setValue(this.bio)
    // this.registerForm.get('username')?.setValue(this.username)

    let sellerInfo = {
      email : this.registeredUserEmail,
      username : this.username,
      bio : this.bio
    }

    this.http.post<{message : string}>(`${environment.server}/users/updateSellerInfo`,sellerInfo)
    .subscribe(
      res=>{
        // console.log(res.message)

        this.toastController.create({
          message: res.message,
          duration: 1500,
          header: "Success",
          color: 'primary',
          position: 'bottom'
        }).then(toast => toast.present())

        setTimeout(() => {

          this.router.navigate(['home'])
          
        }, 200);

      },
      err=>{
        console.log(err)
      }
    )

    // this.presentTermsAndConditionsAlert()
    
  }

  registeredUserEmail! : string
  registeredFirstName! : string

  async presentTermsAndConditionsAlert() {

    this.registerForm.markAllAsTouched()

    if(this.registerForm.invalid){
      return
    }

    this.registeredUserEmail = this.registerForm.get('email')?.value
    this.registeredFirstName = this.registerForm.get('first_name')?.value

    const alert = await this.alertController.create({
      header: 'Terms of Service',
      message: 'By registering you agree to our <a id="termsLink" class="terms-link" >terms of service</a>.',
      buttons: [
        {
          text: 'Decline',
          role: 'cancel'
        },
        {
          text: 'Agree',
          handler: () => {
            // Perform register action here
            this.register()
          }
        }
      ]
    });
  
    await alert.present();

    // Add onclick event listener to the terms of service link
    let termsLink = document.getElementById('termsLink') as HTMLElement
    
    termsLink.onclick = () => {
      alert.dismiss()
    this.router.navigate(['tos'])
  }

  }
  

  loginSubscription: Subscription | undefined

  loginForm: FormGroup

  selectedTab: any = 'login'

  registerForm: FormGroup

  register() {
    
    this.store.dispatch(register({ registrationDetails:this.registerForm.value }))
    // console.log(this.registerForm.value)
  }

   showPassword = false;

   loginSubmitted = false

  login() {
    
    this.loginForm.markAllAsTouched()

    if(this.loginForm.invalid){
      return
    }

    this.store.dispatch(login({ email: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value }))
  }

  authPageChange(page: string) {

    this.router.navigate(['/auth'], { queryParams: { page: page } });

  }
  currentRoute: any

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  matchPasswords(control: AbstractControl): { [key: string]: any } | null {
    const password = control.root.get('password');
    const confirmPassword = control.value;
    
    if (password && confirmPassword !== password.value) {
      return { passwordMismatch: true };
    }

    return null;
  }


  constructor(private store: Store<AppState>, private authService: AuthService, private toastController: ToastController, private router: Router, private menuController: MenuController, private route: ActivatedRoute,private modalController:ModalController,private http:HttpClient,private alertController:AlertController) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.registerForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile : new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required, this.matchPasswords.bind(this)]),
      // username: new FormControl(''),
      // bio: new FormControl('')
    });

  }

  async presentForgetPasswordModal(display:boolean,token?:string){
    const modal = await this.modalController.create({
      component : ForgetPasswordComponent,
      componentProps: {
        displayResetForm : display,
        token : token ? token : ''
      },
      showBackdrop : true
    });
    return await modal.present();
  }

  private routeSub!: Subscription;

  ngOnInit() {

    if (localStorage.getItem('currentroute')) {
      this.currentRoute = localStorage.getItem('currentroute')
    }
    else {
      this.currentRoute = 'home'
    }

    this.menuController.close()

    this.routeSub = this.route.queryParams.subscribe(params => {

      if(params['page'] == 'resetpassword' && params['token']){
        this.presentForgetPasswordModal(true,params['token'])
      }

      this.selectedTab = params['page'];
      // Update the view with the new "id" value
    });

    this.store.select('login')
      .subscribe(
        async loginState => {
          if (loginState.isLogingIn) {
            this.store.dispatch(startLoading())
          }
          if (loginState.isLogedIn) {
            this.store.dispatch(endLoading())

            !localStorage.getItem('registered') && this.toastController.create({
              message: loginState.message,
              duration: 1500,
              header: "Login Successful",
              color: 'primary',
              position: 'top'
            }).then(toast => toast.present())

            this.store.dispatch(getUserMessages())

            this.store.dispatch(checkLogin())

            this.store.dispatch(getUserProducts())

            if(!localStorage.getItem('registered')){

              if (this.currentRoute.includes('?')) {
                location.assign(this.currentRoute)
              }
              else {
                this.router.navigate([this.currentRoute])
              }

              localStorage.removeItem('currentroute')

            }

            localStorage.getItem('registered') && localStorage.removeItem('registered')

          }
          if (loginState.isLogingInFailure) {
            this.store.dispatch(endLoading())
            this.toastController.create({
              message: loginState.message,
              duration: 5000,
              header: "Login Failed",
              color: 'danger',
              position: 'top',
              mode: 'ios'
            }).then(toast => toast.present())
          }

        },
        err => {
          console.log(err)

        }
      )


    this.store.select('register')
      .subscribe(
        registerState => {

          if (registerState.registering) {
            this.store.dispatch(startLoading())
          }

          if (registerState.registered) {

            this.store.dispatch(endLoading())

            localStorage.setItem('registered','true')

            this.setOpen(true)

            this.store.dispatch(login({ email: this.registerForm.get('email')?.value, password: this.registerForm.get('password')?.value }))

            this.toastController.create({
              message: registerState.message,
              duration: 1500,
              header: "Registration Successful",
              color: 'primary',
              position: 'bottom'
            }).then(toast => toast.present())

            this.registerForm.reset()

          }

          if (registerState.registrationFail) {
            this.store.dispatch(endLoading())
            this.toastController.create({
              message: registerState.message,
              duration: 5000,
              header: "Registration Failed",
              color: 'danger',
              position: 'bottom'
            }).then(toast => toast.present())
            // this.registerForm.reset()
          }

        }
      )

  }


  ngOnDestroy() {
    // Unsubscribe from the route parameter subscription when the component is destroyed
    this.routeSub.unsubscribe();
  }

}
