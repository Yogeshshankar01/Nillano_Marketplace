import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, observable, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsserviceService {

  getCategoriesAndSubCategoies():Observable<any>{
    return this.http.get(`${environment.server}/products/categories`)
  }

  getProducts():Observable<{message:string,products:[]}>{
    return new Observable(observer=>{

      this.http.get<{products:any}>(`${environment.server}/products/products`)
    .pipe(take(1))
    .subscribe(async(res)=>{
      observer.next({message:"Products Provided",products:res.products})
      observer.complete()
    },(err)=>{
      observer.error({message:err.error.message})
      observer.complete()
    })

    })
  }

  getProduct(productID:Number):Observable<{message:string,product:[]}>{
    return new Observable(observer=>{

      this.http.get<{product:any}>(`${environment.server}/products/product/${productID}`)
    .pipe(take(1))
    .subscribe(async(res)=>{
      observer.next({message:"Products Provided",product:res.product})
      observer.complete()
    },(err)=>{
      observer.error({message:err.error.message})
      observer.complete()
    })

    })
  }

  filterProducts(filters:any):Observable<{message:string,products:[]}>{
    return new Observable(observer=>{

      this.http.get<{products:any}>(`${environment.server}/products/filter`,{ params: filters})
    .pipe(take(1))
    .subscribe(async(res)=>{
      console.log(res)
      observer.next({message:"Products Provided",products:res.products})
      observer.complete()
    },(err)=>{
      console.log(err)
      // observer.error({message:err.error.message})
      observer.complete()
    })

    })
  }

  constructor(private http:HttpClient) { 
    // this.getProduct(10).subscribe(res=>{
    //   console.log(res)
    // },err=>{
    //   console.log(err)
    // })
  }
}
