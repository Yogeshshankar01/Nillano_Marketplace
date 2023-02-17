import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  
login({email,password}:{email:string,password:string}):Observable<{message:string}>{
  return new Observable((observer)=>{
    this.http.post<{accessToken:string,message:string,success:boolean}>(`${environment.server}/users/login`,{email,password})
    .pipe(take(1))
    .subscribe(async(res)=>{
      localStorage.setItem("access_token",res.accessToken)
      observer.next({message:res.message})
      observer.complete()
    },(err)=>{
      observer.error({message:err.error.message})
      observer.complete()
    })

  })
}


  register({email,password,first_name}:{email:string,password:string,first_name:string}):Observable<{message:string}>{
    return new Observable((observer)=>{
      this.http.post<{accessToken:string,message:string,success:boolean}>(`${environment.server}/users/register`,{email,password,first_name})
      .pipe(take(1))
      .subscribe(async(res)=>{
        observer.next({message:res.message})
        observer.complete()
      },(err)=>{
        observer.error({message:err.error.message})
        observer.complete()
      })

    })
  }

  async logout(){
    // Remove any user data or tokens from storage
    localStorage.removeItem('access_token');

    if(this.router.url == '/home'){
      location.reload()
    }

    this.navController.navigateRoot('/home');

  }


  recoverPassword({email}:{email:string}){
    const mainDomain = window.location.origin;

    return this.http.post(`${environment.server}/users/requestresetpassword`,{email,mainDomain})
  }


  constructor(private http:HttpClient,private navController:NavController,private router:Router) {
    
   }
}
