import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListProductComponent } from 'src/app/components/list-product/list-product.component';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  async presentListProductModal(){
    const modal = await this.modalCtrl.create({
      component: ListProductComponent,
      showBackdrop: true,
    });
    return await modal.present();
  }

  products = [
    {
      "id": 1,
      "name": "Apple iPhone 11",
      "description": "The iPhone 11 is a powerful smartphone with a dual-camera system and an A13 Bionic chip.",
      "price": 749.99,
      "discount_percent": 10,
      "discount_price": 674.991,
      "quantity": 2,
      "image": "../../../assets/images/electronics.jpg",
      "images": "[\"https://example.com/iphone11-1.jpg\",\"https://example.com/iphone11-2.jpg\"]",
      "category_id": 1,
      "subcategory_id": 5,
      "location": "Ikeja",
      "Campus": "Yaba",
      "user_id": 1,
      "createdAt": "2023-02-09T01:42:51.159Z",
      "updatedAt": "2023-02-09T01:42:51.159Z"
  },
  {
    "id": 2,
    "name": "Skin care Product",
    "description": "The Samsung Galaxy S20 is a powerful smartphone with a triple-camera system and a Snapdragon 865 chip.",
    "price": 200.99,
    "discount_percent": 20,
    "discount_price": 160.792,
    "quantity": 2,
    "image": "../../../assets/images/health-beauty.jpg",
    "images": "[\"https://example.com/galaxys20-1.jpg\",\"../../../assets/images/agric-food.jpg\"]",
    "category_id": 3,
    "subcategory_id": 21,
    "location": "Ikeja",
    "Campus": "Yaba",
    "user_id": 2,
    "createdAt": "2023-02-09T01:42:51.159Z",
    "updatedAt": "2023-02-09T01:42:51.159Z"
}
  ]

  editProduct(product:any){}

  ngOnInit() {
  }

}
