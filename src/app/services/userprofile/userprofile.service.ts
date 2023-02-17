import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  myProfile():Observable<{message:string,profile:any}>{
    return new Observable(observer=>{

      this.http.get<{profile:any}>(`${environment.server}/users/user-profile`)
    .pipe(take(1))
    .subscribe(async(res)=>{
      observer.next({message:"Profile Provided",profile:res.profile})
      observer.complete()
    },(err)=>{
      observer.error({message:err.error.message})
      observer.complete()
    })

    })
  }

  constructor(private http:HttpClient) {
  
   }
}
