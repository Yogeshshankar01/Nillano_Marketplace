import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { getProduct } from 'src/app/store/product/product.actions';
import { AppState } from 'src/app/types/AppState';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { CommentModalComponent } from 'src/app/components/comment-modal/comment-modal.component';
import { OrderModalComponent } from 'src/app/components/order-modal/order-modal.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

product:any = {}

selectedMainImage: string | undefined

isLiked = false

likes:Number | undefined

toggleLike() {
  this.isLiked = !this.isLiked;
  this.likes = (this.likes === 20) ? 21 : 20;
}

quantityCount:number = 1

increaseQuantity(){
  if(this.quantityCount >= this.product.quantity){
    this.quantityCount = this.quantityCount

    this.toastController.create({
      message:"You have reached the maximum quantity of this product.",
      duration:3000,
      color:'dark',
      position : 'bottom'
    }).then((toast)=>{
      toast.present()
    })

    return
  }
  this.quantityCount++
}

decreaseQuantity(){

  if(this.quantityCount >=2){

    this.quantityCount--

  }

  else{

    this.quantityCount = 1

  this.toastController.create({
    message:"You have reached the minimum order of this product.",
    duration:3000,
    color:'dark',
    position : 'bottom'
  }).then((toast)=>{
    toast.present()
  })

}

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

relatedProducts:any
productId : number | undefined


  constructor(private store:Store<AppState>,private activeRoute:ActivatedRoute, private router : Router , private toastController:ToastController,private socialSharing: SocialSharing,private modalCtrl: ModalController) { }

  async presentCommentModal() {
    const modal = await this.modalCtrl.create({
      component: CommentModalComponent,
      showBackdrop: true,
      initialBreakpoint : 0.4
    });
    return await modal.present();
  }

  selectedItem:any

  async presentOrderModal() {
    this.selectedItem = [{
      name : this.product.name,
      price : this.product.discount_price ? this.product.discount_price : this.product.price,
      quantity: this.quantityCount
    }]
    const modal = await this.modalCtrl.create({
      component: OrderModalComponent,
      showBackdrop: true,
      initialBreakpoint : 1,
      componentProps: {
        selectedItem: this.selectedItem
      }
    });
    return await modal.present();
  }
  

  ngOnInit() {

    console.log(this.product)

    this.activeRoute.queryParams.subscribe(params => {

      if(!params['product']) {
        this.toastController.create({
        message:"Your product does not have an id",
        duration:3000,
        header:"Product Error",
        color:'danger',
        position : 'bottom'
      }).then((toast)=>{
        toast.present()
        toast.onDidDismiss().then(() => {
          this.router.navigate(['products'])
        });
      })
    }
    else{
      this.productId = params['product'];
      this.store.dispatch(getProduct({productID:Number(this.productId)}))
    }

    });

    this.store.select('product')
    .subscribe(
      prod=>{
        if(prod.process){
          this.store.dispatch(startLoading())
        }
        if(prod.success){
          this.store.dispatch(endLoading())

          this.product = JSON.parse(JSON.stringify(prod.product))
          this.selectedMainImage = this.product.image
          this.product.images = JSON.parse(this.product.images);

          this.likes = this.product.Likes.length

          this.relatedProducts = this.product.user.products

          console.log(this.product)

        }
        if(prod.failure){
          this.store.dispatch(endLoading())
          console.log(prod.message)

          this.toastController.create({
            message: prod.message,
            duration:3000,
            header:"Product Error",
            color:'danger',
            position : 'bottom'
          }).then((toast)=>{
            toast.present()
            toast.onDidDismiss().then(() => {
              this.router.navigate(['products'])
            });
          })

        }
      }
    )

    console.log(this.productId)

  }

}
