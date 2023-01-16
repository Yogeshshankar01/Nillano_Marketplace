import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {}

}
