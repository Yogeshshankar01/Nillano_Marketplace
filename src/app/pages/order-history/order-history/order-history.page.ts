import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {

  orders = [
    {
      id: 1,
      date: new Date('2022-01-01T08:00:00.000Z'),
      total: 50.00,
      status: 'Delivered',
      item: {
          name: 'Product 1',
          quantity: 1,
          price: 10.00
        },
    },
    {
      id: 2,
      date: new Date('2022-01-02T10:00:00.000Z'),
      total: 100.00,
      status: 'In Transit',
      item: {
          name: 'Product 3',
          quantity: 1,
          price: 50.00
        }
    },
    {
      id: 3,
      date: new Date('2022-01-01T08:00:00.000Z'),
      total: 50.00,
      status: 'Cancelled',
      item: {
          name: 'Product 1',
          quantity: 1,
          price: 10.00
        },
    },
    {
      id: 4,
      date: new Date('2022-01-01T08:00:00.000Z'),
      total: 50.00,
      status: 'Completed',
      item: {
          name: 'Product 1',
          quantity: 1,
          price: 10.00
        },
    },
    {
      id: 5,
      date: new Date('2022-01-01T08:00:00.000Z'),
      total: 50.00,
      status: 'Pending',
      item: {
          name: 'Product 1',
          quantity: 1,
          price: 10.00
        },
    },
  ];

  showDetails:number | undefined

  toggleOrderDetails(orderID:number) {
    this.showDetails = this.showDetails!=orderID ? orderID : 0
  }

  deleteItem(item:any) {
    // implement item deletion logic here
  }
  constructor() { }

  ngOnInit() {
  }

}
