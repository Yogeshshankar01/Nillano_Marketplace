import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user = {
    "id": 1,
    "first_name": "Abdul-Latif",
    "last_name": "Mohammed",
    "username" : "Latif.Photo",
    "location": "Accra, Ghana",
    "bio": "I'm a freelance photographer specializing in portrait and wedding photography.",
    "profilePicUrl": "https://example.com/profiles/alice.jpg",
    "products": [{
      "id": 1,
      "name": "Portrait Session",
      "description": "1-hour portrait session with 10 edited digital photos.",
      "imageUrl": "https://example.com/products/portrait.jpg",
      "price": 100
    }, {
      "id": 2,
      "name": "Wedding Package",
      "description": "Full-day wedding coverage with 200 edited digital photos.",
      "imageUrl": "https://example.com/products/wedding.jpg",
      "price": 2000
    }]
  }

  /*
  {
                "id": 3,
                "name": "Arduino Starter Kit",
                "description": "A kit containing everything you need to get started with Arduino.",
                "imageUrl": "https://example.com/products/arduino.jpg",
                "price": 50
              },
              {
                "id": 4,
                "name": "Raspberry Pi 4",
                "description": "A powerful single-board computer for DIY projects.",
                "imageUrl": "https://example.com/products/raspberry-pi.jpg",
                "price": 100
              }

  */

  constructor() { }

  ngOnInit() {
  }

}
