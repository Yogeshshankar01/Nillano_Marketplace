import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/AppState';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy,OnInit {

  categories = [
    { name: 'Electronics', imageUrl: '.././../../assets/images/electronics.jpg' },
    { name: 'Fashion', imageUrl: '.././../../assets/images/fashion.jpg' },
    { name: 'Vehicles', imageUrl: '.././../../assets/images/vehicles.jpg' },
    { name: 'Home & Garden', imageUrl: '.././../../assets/images/home-garden.jpg' },
    { name: 'Sports & Outdoors', imageUrl: '.././../../assets/images/sports-outdoors.jpg' },
    { name: 'Health & Beauty', imageUrl: '.././../../assets/images/health-beauty.jpg' },
    { name: 'Toys & Games', imageUrl: '.././../../assets/images/toys-games.jpg' },
    { name: 'Agriculure & Food', imageUrl: '.././../../assets/images/agric-food.jpg' },
  ];

  title = 'My Title'

  welcomeMessage = false

  selectedTab = 'buying';

  segmentChanged(event: any) {
    this.selectedTab = event.detail.value;
  }

  constructor(private store:Store<AppState>) {}

  ngOnInit() {
    this.store.select('register')
    .subscribe(
      registerState=>{
        if(registerState.registered){
          this.welcomeMessage = true
        }
      }
    )
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
