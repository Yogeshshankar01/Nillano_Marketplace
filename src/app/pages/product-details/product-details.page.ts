import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { endLoading, startLoading } from 'src/app/store/loading/loading.action';
import { getProduct } from 'src/app/store/product/product.actions';
import { AppState } from 'src/app/types/AppState';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { CommentModalComponent } from 'src/app/components/comment-modal/comment-modal.component';
import { OrderModalComponent } from 'src/app/components/order-modal/order-modal.component';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SaveditemsService, SaveItem } from 'src/app/services/saveditems.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  isLoggedIn = false

  product: any = {}

  selectedMainImage: string | undefined

  otherImages: any = []

  isLiked = false

  isFollowing = false

  likes: Number | undefined

  currentUserId!: number;

  toggleLike() {

    this.store.dispatch(startLoading())

    this.http.put<{ status: number, message: string }>(`${environment.server}/products/like/${this.productId}`, null)
      .pipe(take(1))
      .subscribe(
        res => {

          this.store.dispatch(endLoading())

          if (res.status == 1) {

            let likeEffect = document.getElementById('likeEffect') as HTMLElement

            likeEffect.classList.remove('d-none')
            likeEffect.classList.add('d-flex')

            setTimeout(() => {

              likeEffect.classList.remove('d-flex')
              likeEffect.classList.add('d-none')

              this.toastController.create({
                message: res.message,
                duration: 1000,
                color: 'primary',
                position: 'top'
              }).then((toast) => {
                toast.present()
              })

            }, 1000);

          } else {
            this.toastController.create({
              message: res.message,
              duration: 1000,
              color: 'primary',
              position: 'top'
            }).then((toast) => {
              toast.present()
            })
          }

          this.store.dispatch(getProduct({ productID: Number(this.productId) }))

        },
        err => {

          this.store.dispatch(endLoading())

          err.error.message && this.toastController.create({
            message: err.error.message == "No authorization header" ? "Please log in to like product" : err.error.message,
            duration: 1000,
            color: 'danger',
            position: 'top'
          }).then((toast) => {
            toast.present()
          })

          !err.error.message && this.toastController.create({
            message: "Sorry! unable to like product. Try again.",
            duration: 1000,
            color: 'danger',
            position: 'top'
          }).then((toast) => {
            toast.present()
          })

        }
      )

  }


  quantityCount: number = 1

  increaseQuantity() {
    if (this.quantityCount >= this.product.quantity) {
      this.quantityCount = this.quantityCount

      this.toastController.create({
        message: "You have reached the maximum quantity of this product.",
        duration: 1500,
        color: 'dark',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return
    }
    this.quantityCount++
  }

  decreaseQuantity() {

    if (this.quantityCount >= 2) {

      this.quantityCount--

    }

    else {

      this.quantityCount = 1

      this.toastController.create({
        message: "You have reached the minimum order of this product.",
        duration: 1500,
        color: 'dark',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

    }

  }

  changeMainImage(image: any) {
    this.selectedMainImage = image.url;
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

  relatedProducts: any
  productId: number | undefined


  constructor(private store: Store<AppState>, private activeRoute: ActivatedRoute, private router: Router, private toastController: ToastController, private socialSharing: SocialSharing, private modalCtrl: ModalController, private userProfile: UserprofileService, private http: HttpClient, private actionSheetController: ActionSheetController, private authService: AuthService, private saveItemService: SaveditemsService, private titleService: Title, private metaService: Meta) { }


  saveItemForLater() {

    let selectedItem: SaveItem = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.discount_price ? this.product.discount_price : this.product.price,
      quantity: this.quantityCount,
      sellerId: this.product.user.id,
      seller: this.product.user.username,
      image: this.product.image.url
    }

    this.saveItemService.addSavedItem(selectedItem)

  }


  async presentCommentModal() {

    if (!this.isLoggedIn) {

      this.toastController.create({
        message: "Please Login to continue...",
        duration: 2000,
        color: 'danger',
        position: 'top'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    const modal = await this.modalCtrl.create({
      component: CommentModalComponent,
      showBackdrop: true,
      initialBreakpoint: 0.45,
      componentProps: { productId: this.productId }
    });
    return await modal.present();
  }



  selectedItem: any

  async presentOrderModal() {

    if (!this.isLoggedIn) {

      this.toastController.create({
        message: "Please Login to continue...",
        duration: 3000,
        color: 'danger',
        position: 'top'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    this.selectedItem = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.discount_price ? this.product.discount_price : this.product.price,
      quantity: this.quantityCount,
      sellerId: this.product.user.id
    }

    const modal = await this.modalCtrl.create({
      component: OrderModalComponent,
      showBackdrop: true,
      initialBreakpoint: 1,
      componentProps: {
        selectedItem: this.selectedItem
      }
    });
    return await modal.present();
  }

  chatSellerMessageContent: string = ""

  chatSeller() {

    if (!this.chatSellerMessageContent) {

      this.toastController.create({
        message: "Please type a message to send to seller...",
        duration: 1500,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    if (!this.currentUserId) {

      this.toastController.create({
        message: "Please login to chat seller...",
        duration: 1500,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    if (this.currentUserId === this.product.user_id) {

      this.toastController.create({
        message: "Sorry you can not have a coversation with yourself...",
        duration: 1500,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    localStorage.setItem("chatSellerMessageContent", this.chatSellerMessageContent)

    this.router.navigate([`messages/${this.product.user.id}`])

  }

  ionViewDidLeave() {
    this.chatSellerMessageContent = ""
  }

  ngOnInit() {

    this.store.select('checkLogin')
      .subscribe(
        res => {

          this.isLoggedIn = res.loggedIn

        }
      )

    this.activeRoute.queryParams.subscribe(params => {

      if (!params['product']) {

        this.toastController.create({
          message: "Your product does not have an id",
          duration: 3000,
          header: "Product Error",
          color: 'danger',
          position: 'bottom'
        }).then((toast) => {
          toast.present()
          toast.onDidDismiss().then(() => {
            this.router.navigate(['products'])
          });
        })

      }
      else {
        this.productId = params['product'];
        this.store.dispatch(getProduct({ productID: Number(this.productId) }))
      }

    });

    this.store.select('product')
      .subscribe(
        async prod => {
          if (prod.process) {
            this.store.dispatch(startLoading())
          }
          if (prod.success) {
            this.store.dispatch(endLoading())

            this.product = JSON.parse(JSON.stringify(prod.product))

            // Filter following and followers arrays to remove objects with status = 'inactive'
            this.product.user.following = this.product.user.following.filter((obj:any) => obj.status !== 'inactive');
            this.product.user.followers = this.product.user.followers.filter((obj:any) => obj.status !== 'inactive');

            this.selectedMainImage = this.product.image.url

            this.otherImages = [this.product.image, ...this.product.images]

            this.likes = this.product.Likes.length

            this.relatedProducts = this.product.user.products

            // console.log(this.product)

            this.titleService.setTitle(`${this.product.name} - GH₵${this.product.price}`);

            this.metaService.updateTag({ property: 'og:title', content: `${this.product.name} - GH₵${this.product.price}` });
            this.metaService.updateTag({ name: 'twitter:title', content: `${this.product.name} - GH₵${this.product.price}` });
            this.metaService.updateTag({ property: 'og:description', content: this.product.description });
            this.metaService.updateTag({ name: 'twitter:description', content: this.product.description });
            this.metaService.updateTag({ property: 'og:image', content: this.product.image.url });
            this.metaService.updateTag({ name: 'twitter:image', content: this.product.image.url });

            this.userProfile.myProfile().subscribe(
              async res => {
                this.currentUserId = await res.profile.id
                // console.log(this.currentUserId)
                this.isLiked = this.product.Likes.some((like: { user_id: number; }) => like.user_id === this.currentUserId);
                this.isFollowing = this.product.user.followers.some((follower: { followerId: number; status:string; }) => follower.followerId === this.currentUserId && follower.status === 'active');
                // console.log(this.isFollowing)
              },
              err => {
                console.log(err)
              }
            )


          }
          if (prod.failure) {
            this.store.dispatch(endLoading())
            console.log(prod.message)

            this.toastController.create({
              message: prod.message,
              duration: 3000,
              header: "Product Error",
              color: 'danger',
              position: 'bottom'
            }).then((toast) => {
              toast.present()
              toast.onDidDismiss().then(() => {
                this.router.navigate(['products'])
              });
            })

          }
        }
      )

    // console.log(this.productId)

  }

  async followUser() {

    if(!this.currentUserId){

      const toast = await this.toastController.create({
        message: "Please login to follow this user",
        duration: 1500,
        color: 'danger',
        position: 'bottom',
        mode: 'ios'
      });

      await toast.present();

      return

    }

    this.userProfile.follow(this.product.user.id)
      .pipe(take(1))
      .subscribe(
        async res => {

          this.store.dispatch(getProduct({ productID: Number(this.productId) }))

          const toast = await this.toastController.create({
            message: res.msg,
            duration: 1500,
            color: 'dark',
            position: 'bottom',
            mode: 'ios'
          });

          await toast.present();
        },
        async err => {
          console.log(err)

          const toast = await this.toastController.create({
            message: "An error occured",
            duration: 1500,
            color: 'danger',
            position: 'bottom',
            mode: 'ios'
          });

          await toast.present();
        }
      )

  }


  async share(platform: string) {
    // Logic to share content on selected platform

    const link = `${window.location.href}`

    let shareUrl: any;

    const message = `Hey, check out this product:%0A%0A${this.product.name}%0A%0A*Description:* ${this.product.description}%0A%0A*Price:* ${this.product.discount_percent ? '~GH₵' + this.product.price+'~' : ''} GH₵${!this.product.discount_percent ? this.product.price : this.product.discount_price}${this.product.discount_percent ? '%0A%0A*Discount:* ' + this.product.discount_percent+'%' : ''}%0A%0A%0A*Visit this link to order now:*%0A${link}`; 

    // ${this.product.discount_percent ? 'GH₵' + this.product.price : ''}

    const messageTweet = `%0A${link}%0A%0ACheck out this product:%0A${this.product.name}%0APrice: GH₵${this.product.price }${this.product.discount_percent ? '%0ADiscount Price: GH₵' + this.product.discount_price : ''}${this.product.discount_percent ? '%0ADiscount: ' + this.product.discount_percent+'%25' : ''}%0ADescription: ${this.product.description}`;

    switch (platform) {
      case 'copy':

        // copy the link to the clipboard using the browser API
        try {

          await navigator.clipboard.writeText(link);

          const toast = await this.toastController.create({
            message: 'Link copied!',
            duration: 2000,
            color: 'dark'
          });

          await toast.present();

        } catch (err) {
          console.error('Failed to copy text: ', err);

          const toast = await this.toastController.create({
            color: 'danger',
            message: 'Failed to copy text!',
            duration: 2000
          });
        }

        break;

      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
        break;

      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${messageTweet}`;
        break;

      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${message}`;
        break;

      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }

    // await this.popoverController.dismiss();

  }


  handleRefresh(event: any) {
    // do some work to refresh the content here
    // ...

    //let refreshertext = document.querySelector(".refresher-refreshing-text") as HTMLElement

    //refreshertext.style.color = "#000"

    location.reload()

    // when the refresh is complete, call the complete() method
    setTimeout(() => {

      event.target.complete();

    }, 1500);
  }

}
