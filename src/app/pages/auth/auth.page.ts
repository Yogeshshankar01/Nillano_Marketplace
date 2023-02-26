import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { checkLogin } from 'src/app/store/checkLogin/checklogin.actions';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { login } from 'src/app/store/login/login.action';
import { register } from 'src/app/store/register/register.action';
import { AppState } from 'src/app/types/AppState';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

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
      this.register()
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

    this.registerForm.get('bio')?.setValue(this.bio)
    this.registerForm.get('username')?.setValue(this.username)

    this.register()
  }

  loginSubscription: Subscription | undefined

  loginForm: FormGroup

  selectedTab: any = 'login'

  registerForm: FormGroup

  register() {
    this.store.dispatch(register({ registrationDetails:this.registerForm.value }))
    // console.log(this.registerForm.value)
  }


  login() {
    this.store.dispatch(login({ email: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value }))
  }

  onSegmentChange(event: any) {

    this.router.navigate(['/auth'], { queryParams: { page: event.detail.value } });

  }
  currentRoute: any

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  constructor(private store: Store<AppState>, private authService: AuthService, private toastController: ToastController, private router: Router, private menuController: MenuController, private route: ActivatedRoute,private modalController:ModalController,private http:HttpClient) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    this.registerForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      username: new FormControl(''),
      bio: new FormControl('')
    });

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
              position: 'bottom'
            }).then(toast => toast.present())

            localStorage.getItem('registered') && localStorage.removeItem('registered')

            this.store.dispatch(checkLogin())

            if (this.currentRoute.includes('?')) {
              location.assign(this.currentRoute)
            }
            else {
              this.router.navigate([this.currentRoute])
            }

            localStorage.removeItem('currentroute')

          }
          if (loginState.isLogingInFailure) {
            this.store.dispatch(endLoading())
            this.toastController.create({
              message: loginState.message,
              duration: 5000,
              header: "Login Failed",
              color: 'danger',
              position: 'bottom'
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
            this.registerForm.reset()
          }

        }
      )

  }


  ngOnDestroy() {
    // Unsubscribe from the route parameter subscription when the component is destroyed
    this.routeSub.unsubscribe();
  }

}
