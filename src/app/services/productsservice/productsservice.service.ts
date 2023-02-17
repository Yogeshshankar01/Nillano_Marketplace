import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, observable, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsserviceService {

  listProduct(formData:FormData):Observable<{message:string}>{
    return new Observable((observer)=>{
      this.http.post<{message:string}>(`${environment.server}/products/list-product`,formData)
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

  editProduct(formData:FormData):Observable<{message:string}>{
    return new Observable((observer)=>{
      this.http.post<{message:string}>(`${environment.server}/products/edit-product`,formData)
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

  getCategoriesAndSubCategoies():Observable<any>{
    return this.http.get(`${environment.server}/products/categories`)
  }

  getUserProducts():Observable<{message:string,products:[]}>{
    return new Observable(observer=>{

      this.http.get<{products:any}>(`${environment.server}/products/user-products`)
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
      observer.next({message:"Products Provided",products:res.products})
      observer.complete()
    },(err)=>{
      // observer.error({message:err.error.message})
      observer.complete()
    })

    })
  }


  removeProduct(productID:Number):Observable<{message:string}>{
    return new Observable(observer=>{

      this.http.get<{message:any}>(`${environment.server}/products/delete-product/${productID}`)
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

  constructor(private http:HttpClient) { 
    
  }
}
