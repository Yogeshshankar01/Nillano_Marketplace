import { Component, OnDestroy, OnInit,AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/AppState';
import Masonry from 'masonry-layout';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy,OnInit {

  categories = [
    {
      "id": 1,
      "name": "Electronics and Accessories",
      "description": "Electronics and accessories include items such as smartphones, laptops, and other electronic devices and their accessories.",
      "image": "https://example.com/electronics.jpg",
      "createdAt": "2023-01-20T01:19:31.978Z",
      "updatedAt": "2023-01-20T01:19:31.978Z",
      "Subcategories": [
          {
              "id": 1,
              "name": "Smartphones",
              "description": "A smartphone is a handheld device that combines the functions of a computer with the ability to make telephone calls.",
              "parent_category": 1,
              "image": "https://example.com/smartphones.jpg",
              "createdAt": "2023-01-20T01:19:30.548Z",
              "updatedAt": "2023-01-20T01:19:30.548Z"
          },
          {
              "id": 2,
              "name": "Laptops",
              "description": "A laptop, also called a notebook computer or simply a notebook, is a small, portable personal computer.",
              "parent_category": 1,
              "image": "https://example.com/laptops.jpg",
              "createdAt": "2023-01-20T01:19:30.550Z",
              "updatedAt": "2023-01-20T01:19:30.550Z"
          },
          {
              "id": 3,
              "name": "Tablets",
              "description": "A tablet is a portable device with a touchscreen display, typically larger than a smartphone and smaller than a laptop.",
              "parent_category": 1,
              "image": "https://example.com/tablets.jpg",
              "createdAt": "2023-01-20T01:19:30.550Z",
              "updatedAt": "2023-01-20T01:19:30.550Z"
          },
          {
              "id": 4,
              "name": "Desktops",
              "description": "A desktop computer is a personal computer that is designed for regular use at a single location.",
              "parent_category": 1,
              "image": "https://example.com/desktops.jpg",
              "createdAt": "2023-01-20T01:19:30.551Z",
              "updatedAt": "2023-01-20T01:19:30.551Z"
          },
          {
              "id": 5,
              "name": "Televisions",
              "description": "A television is an electronic device that displays moving images and sound.",
              "parent_category": 1,
              "image": "https://example.com/televisions.jpg",
              "createdAt": "2023-01-20T01:19:30.551Z",
              "updatedAt": "2023-01-20T01:19:30.551Z"
          },
          {
              "id": 6,
              "name": "Cameras",
              "description": "A camera is an electronic device that captures still or moving images.",
              "parent_category": 1,
              "image": "https://example.com/cameras.jpg",
              "createdAt": "2023-01-20T01:19:30.552Z",
              "updatedAt": "2023-01-20T01:19:30.552Z"
          },
          {
              "id": 7,
              "name": "Home Appliances",
              "description": "Home appliances are electrical/mechanical machines which accomplish household functions, such as cooking, cleaning, and food preservation.",
              "parent_category": 1,
              "image": "https://example.com/home-appliances.jpg",
              "createdAt": "2023-01-20T01:19:30.552Z",
              "updatedAt": "2023-01-20T01:19:30.552Z"
          },
          {
              "id": 8,
              "name": "Gaming Consoles",
              "description": "A gaming console is an interactive entertainment computer or modified computer system that is capable of playing video games.",
              "parent_category": 1,
              "image": "https://example.com/gaming-consoles.jpg",
              "createdAt": "2023-01-20T01:19:30.553Z",
              "updatedAt": "2023-01-20T01:19:30.553Z"
          },
          {
              "id": 9,
              "name": "Audio Equipment",
              "description": "Audio equipment refers to electronic devices used to record, amplify, or play audio.",
              "parent_category": 1,
              "image": "https://example.com/audio-equipment.jpg",
              "createdAt": "2023-01-20T01:19:30.553Z",
              "updatedAt": "2023-01-20T01:19:30.553Z"
          },
          {
              "id": 10,
              "name": "Mobile Accessories",
              "description": "Mobile accessories are items that enhance the functionality of mobile devices such as smartphones, tablets, and laptops.",
              "parent_category": 1,
              "image": "https://example.com/mobile-accessories.jpg",
              "createdAt": "2023-01-20T01:19:30.553Z",
              "updatedAt": "2023-01-20T01:19:30.553Z"
          }
      ]
  },
  {
    "id": 2,
    "name": "Fashion",
    "description": "Fashion includes items such as clothing, shoes, and accessories.",
    "image": "https://example.com/fashion.jpg",
    "createdAt": "2023-01-20T01:19:31.978Z",
    "updatedAt": "2023-01-20T01:19:31.978Z",
    "Subcategories": [
        {
            "id": 11,
            "name": "Men's Clothing",
            "description": "Men's Clothing includes items such as shirts, pants, suits, and jackets that are designed for men to wear.",
            "parent_category": 2,
            "image": "https://example.com/mens-clothing.jpg",
            "createdAt": "2023-01-20T01:19:30.554Z",
            "updatedAt": "2023-01-20T01:19:30.554Z"
        },
        {
            "id": 12,
            "name": "Women's Clothing",
            "description": "Women's Clothing includes items such as dresses, skirts, blouses, and pants that are designed for women to wear.",
            "parent_category": 2,
            "image": "https://example.com/womens-clothing.jpg",
            "createdAt": "2023-01-20T01:19:30.554Z",
            "updatedAt": "2023-01-20T01:19:30.554Z"
        },
        {
            "id": 13,
            "name": "Children's Clothing",
            "description": "Children's Clothing includes items such as shirts, pants, dresses, and jackets that are designed for children to wear.",
            "parent_category": 2,
            "image": "https://example.com/childrens-clothing.jpg",
            "createdAt": "2023-01-20T01:19:30.555Z",
            "updatedAt": "2023-01-20T01:19:30.555Z"
        },
        {
            "id": 14,
            "name": "Shoes",
            "description": "Shoes are an item of footwear intended to protect and comfort the human foot while doing various activities.",
            "parent_category": 2,
            "image": "https://example.com/shoes.jpg",
            "createdAt": "2023-01-20T01:19:30.555Z",
            "updatedAt": "2023-01-20T01:19:30.555Z"
        },
        {
            "id": 15,
            "name": "Handbags",
            "description": "A handbag is a handled medium-to-large bag that is often used by women to carry personal items.",
            "parent_category": 2,
            "image": "https://example.com/handbags.jpg",
            "createdAt": "2023-01-20T01:19:30.555Z",
            "updatedAt": "2023-01-20T01:19:30.555Z"
        },
        {
            "id": 16,
            "name": "Jewelry",
            "description": "Jewelry is a decorative item worn for personal adornment, such as brooches, rings, necklaces, earrings, and bracelets.",
            "parent_category": 2,
            "image": "https://example.com/jewelry.jpg",
            "createdAt": "2023-01-20T01:19:30.555Z",
            "updatedAt": "2023-01-20T01:19:30.555Z"
        },
        {
            "id": 17,
            "name": "Watches",
            "description": "A watch is a timepiece intended to be carried or worn by a person.",
            "parent_category": 2,
            "image": "https://example.com/watches.jpg",
            "createdAt": "2023-01-20T01:19:30.556Z",
            "updatedAt": "2023-01-20T01:19:30.556Z"
        },
        {
            "id": 18,
            "name": "Sunglasses",
            "description": "Sunglasses are eyewear designed to protect the eyes from the sun's rays.",
            "parent_category": 2,
            "image": "https://example.com/sunglasses.jpg",
            "createdAt": "2023-01-20T01:19:30.556Z",
            "updatedAt": "2023-01-20T01:19:30.556Z"
        },
        {
            "id": 19,
            "name": "Hats",
            "description": "A hat is a head covering which is worn for various reasons, including protection against weather conditions, ceremonial reasons, religious reasons, safety, or as a fashion accessory.",
            "parent_category": 2,
            "image": "https://example.com/hats.jpg",
            "createdAt": "2023-01-20T01:19:30.556Z",
            "updatedAt": "2023-01-20T01:19:30.556Z"
        },
        {
            "id": 20,
            "name": "Scarves",
            "description": "A scarf is a piece of fabric worn around the neck, head or waist for warmth, sun protection, cleanliness, fashion or religious reasons.",
            "parent_category": 2,
            "image": "https://example.com/scarves.jpg",
            "createdAt": "2023-01-20T01:19:30.556Z",
            "updatedAt": "2023-01-20T01:19:30.556Z"
        }
    ]
},
{
  "id": 3,
  "name": "Health and Beauty",
  "description": "Health and beauty includes items such as makeup, skincare, and personal care products.",
  "image": "https://example.com/health-beauty.jpg",
  "createdAt": "2023-01-20T01:19:31.978Z",
  "updatedAt": "2023-01-20T01:19:31.978Z",
  "Subcategories": [
      {
          "id": 21,
          "name": "Skincare",
          "description": "Skincare includes products and practices that are intended to keep the skin healthy.",
          "parent_category": 3,
          "image": "https://example.com/skincare.jpg",
          "createdAt": "2023-01-20T01:19:30.557Z",
          "updatedAt": "2023-01-20T01:19:30.557Z"
      },
      {
          "id": 22,
          "name": "Makeup",
          "description": "Makeup includes products that are used to enhance or change the appearance of the face or other parts of the body.",
          "parent_category": 3,
          "image": "https://example.com/makeup.jpg",
          "createdAt": "2023-01-20T01:19:30.557Z",
          "updatedAt": "2023-01-20T01:19:30.557Z"
      },
      {
          "id": 23,
          "name": "Haircare",
          "description": "Haircare includes products and practices that are used to maintain the health and appearance of hair.",
          "parent_category": 3,
          "image": "https://example.com/haircare.jpg",
          "createdAt": "2023-01-20T01:19:30.557Z",
          "updatedAt": "2023-01-20T01:19:30.557Z"
      },
      {
          "id": 24,
          "name": "Fragrances",
          "description": "Fragrances are scents that are used to create a pleasant smell.",
          "parent_category": 3,
          "image": "https://example.com/fragrances.jpg",
          "createdAt": "2023-01-20T01:19:30.557Z",
          "updatedAt": "2023-01-20T01:19:30.557Z"
      },
      {
          "id": 25,
          "name": "Personal Care",
          "description": "Personal care includes products and practices that are used to maintain personal hygiene and cleanliness.",
          "parent_category": 3,
          "image": "https://example.com/personal-care.jpg",
          "createdAt": "2023-01-20T01:19:30.557Z",
          "updatedAt": "2023-01-20T01:19:30.557Z"
      },
      {
          "id": 26,
          "name": "Oral Care",
          "description": "Oral care includes products and practices that are used to maintain oral hygiene.",
          "parent_category": 3,
          "image": "https://example.com/oral-care.jpg",
          "createdAt": "2023-01-20T01:19:30.557Z",
          "updatedAt": "2023-01-20T01:19:30.557Z"
      },
      {
          "id": 27,
          "name": "Vitamins",
          "description": "Vitamins are essential micronutrients that are needed in small amounts to maintain good health.",
          "parent_category": 3,
          "image": "https://example.com/vitamins.jpg",
          "createdAt": "2023-01-20T01:19:30.557Z",
          "updatedAt": "2023-01-20T01:19:30.557Z"
      },
      {
          "id": 28,
          "name": "Supplements",
          "description": "Supplements are products that are taken to provide additional nutrients or other beneficial substances.",
          "parent_category": 3,
          "image": "https://example.com/supplements.jpg",
          "createdAt": "2023-01-20T01:19:30.558Z",
          "updatedAt": "2023-01-20T01:19:30.558Z"
      },
      {
          "id": 29,
          "name": "Baby Care",
          "description": "Baby care includes products and practices that are used to care for infants and young children.",
          "parent_category": 3,
          "image": "https://example.com/baby-care.jpg",
          "createdAt": "2023-01-20T01:19:30.558Z",
          "updatedAt": "2023-01-20T01:19:30.558Z"
      },
      {
          "id": 30,
          "name": "Sun Care",
          "description": "Sun care includes products and practices that are used to protect the skin from the sun's harmful rays.",
          "parent_category": 3,
          "image": "https://example.com/sun-care.jpg",
          "createdAt": "2023-01-20T01:19:30.558Z",
          "updatedAt": "2023-01-20T01:19:30.558Z"
      }
  ]
}
  ]

  newArrivals = [
    {name : 'Product one',image:"../../../assets/images/agric-food.jpg",price:50,location:'Accra,Ghana'},
    {name : 'Product two',image:"../../../assets/images/electronics.jpg",price:345,location:'Madina,Ghana'},
    {name : 'Product three',image:"../../../assets/images/health-beauty.jpg",price:21,location:'Legon,Ghana'},
    {name : 'Product four',image:"../../../assets/images/agric-food.jpg",price:200,location:'Kumasi,Ghana'},
    {name : 'Product five',image:"../../../assets/images/fashion.jpg",price:150,location:'Adenta,Ghana'},
    {name : 'Product six',image:"../../../assets/images/agric-food.jpg",price:550,location:'Accra,Ghana'}
  ]

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

  ngAfterViewInit(){
    setTimeout(() => {
        let products = document.querySelector('.products1') as HTMLElement;
        let masonry = new Masonry(products,{
            itemSelector : '.product-item1'
          })
      }, 2000);
  }

}
