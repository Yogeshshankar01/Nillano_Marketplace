import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product = {
    "id": 1,
    "name": "Apple iPhone 11",
    "description": "The iPhone 11 is a powerful smartphone with a dual-camera system and an A13 Bionic chip.",
    "price": 749.99,
    "discount": 0,
    "image": "../../../assets/images/electronics.jpg",
    "images": "[\"../../../assets/images/electronics.jpg\",\"../../../assets/images/agric-food.jpg\",\"../../../assets/images/fashion.jpg\",\"../../../assets/images/electronics.jpg\",\"../../../assets/images/agric-food.jpg\",\"../../../assets/images/fashion.jpg\"]",
    "category_id": 1,
    "subcategory_id": 5,
    "location": "Ikeja",
    "Campus": "Yaba",
    "user_id": 1,
    "createdAt": "2023-01-25T03:32:17.833Z",
    "updatedAt": "2023-01-25T03:32:17.833Z"
}

selectedMainImage: string = this.product.image

isLiked = false

likes = 20

toggleLike() {
  this.isLiked = !this.isLiked;
  this.likes = (this.likes === 20) ? 21 : 20;
}

quantityCount:number = 1

increaseQuantity(){
  this.quantityCount++
}

decreaseQuantity(){
  this.quantityCount = this.quantityCount >=2 ? this.quantityCount - 1 : 1
}

changeMainImage(image: string) {
  this.selectedMainImage = image;
}

scrollUp() {
  let imagesCol = document.querySelector(".products-thumb") as HTMLElement;
  imagesCol.scrollBy({
    top: -20,
    left: 0,
    behavior: 'smooth'
  });
}

scrollDown() {
  let imagesCol = document.querySelector(".products-thumb") as HTMLElement;
  imagesCol.scrollBy({
    top: 20,
    left: 0,
    behavior: 'smooth'
  });
}

comments = [
  {
    user: {
      name: 'John Doe',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149071.svg'
    },
    text: 'This product is amazing! It exceeded my expectations.',
    rating: 5
  },
  {
    user: {
      name: 'Jane Smith',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149076.svg'
    },
    text: 'I bought this product as a gift and my friend loved it!',
    rating: 4
  },
  {
    user: {
      name: 'Michael Johnson',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149072.svg'
    },
    text: 'I was a bit hesitant to buy this product but I am glad I did. It works great.',
    rating: 4
  },
  {
    user: {
      name: 'Emily Davis',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149074.svg'
    },
    text: 'The product was damaged when I received it. I do not recommend this product.',
    rating: 2
  },
  {
    user: {
      name: 'William Anderson',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149073.svg'
    },
    text: 'I am so happy with my purchase! This product is exactly what I was looking for.',
    rating: 5
  },
  {
    user: {
      name: 'Ashley Thompson',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149077.svg'
    },
    text: 'I was disappointed with this product. It did not perform as I expected it to.',
    rating: 2
  },
  {
    user: {
      name: 'Daniel Robinson',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149078.svg'
    },
    text: 'This product is great for the price. I would definitely recommend it.',
    rating: 4
  },
  {
    user: {
      name: 'Sarah Johnson',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149080.svg'
    },
    text: 'I was very impressed with the quality of this product.',
    rating: 5
  },
  {
    user: {
      name: 'Jessica Wilson',
      profileImage: 'https://image.flaticon.com/icons/svg/149/149079.svg'
    },
    text: 'The product arrived very late and I did not have time to use it.',
    rating: 2
  },
  {
    user: {
      name: 'Jane Doe',
      profileImage: 'https://example.com/jane-doe.jpg'
    },
    text: 'This product is amazing! I love how it works.',
    rating: 5
  }

]


  constructor() { }

  ngOnInit() {
    this.product.images = JSON.parse(this.product.images);
    console.log(this.product)
  }

}
