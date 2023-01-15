import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      console.log(res)
      localStorage.setItem("access_token",res.accessToken)
      observer.next({message:res.message})
      observer.complete()
    },(err)=>{
      console.log(err)
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
        console.log(res)
        observer.next({message:res.message})
        observer.complete()
      },(err)=>{
        console.log(err)
        observer.error({message:err.error.message})
        observer.complete()
      })

    })
  }


  recoverPassword({email}:{email:string}){
    const mainDomain = window.location.origin;

    return this.http.post(`${environment.server}/users/requestresetpassword`,{email,mainDomain})
  }


  constructor(private http:HttpClient) {
    // this.recoverPassword({email:'latifm8360@gmail.com'}).subscribe(
    //   res=>console.log(res),
    //   err=>console.log(err)
    // )
    // this.register({email:'latifm8360@gmail.com',password:'123456',first_name:'Abdul-Latif'}).subscribe(
    //   res=>console.log(res),
    //   err=>console.log(err)
    // )
   }
}
