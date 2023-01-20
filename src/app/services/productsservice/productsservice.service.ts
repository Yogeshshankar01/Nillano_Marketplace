import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsserviceService {

  getCategoriesAndSubCategoies():Observable<any>{
    return this.http.get(`${environment.server}/products/categories`)
    // .pipe(map((response: any) => response.data));
  }

  constructor(private http:HttpClient) { }
}
