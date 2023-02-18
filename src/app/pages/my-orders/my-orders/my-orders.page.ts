import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { AppState } from 'src/app/types/AppState';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  orders:any

  getOrders(){

    this.store.dispatch(startLoading())

    this.http.get<{message:string,orders:[]}>(`${environment.server}/orders/myorders`)
    .pipe(take(1))
    .subscribe(
      res=>{
        this.store.dispatch(endLoading())
        this.orders = res.orders
        // console.log(this.orders)
      },
      err=>{
        err.error.message && console.log(err.error.message)
      }
    )

  }

  showDetails:number | undefined

  toggleOrderDetails(orderID:number) {
    this.showDetails = this.showDetails!=orderID ? orderID : 0
  }

  deleteItem(item:any) {
    // implement item deletion logic here
  }

  constructor(private http:HttpClient,private store:Store<AppState>) { }

  ngOnInit() {

    this.getOrders()
  }

}
