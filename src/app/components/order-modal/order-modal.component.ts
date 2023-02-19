import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { take } from 'rxjs';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';


@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {

  first_name!: string;
  last_name!: string;
  email!: string;
  phone!: string;
  address!: string;
  terms!: boolean;

  paymentOption!:string

  amountPayable:any
  amount!: number;

  reference:any

  @Input() selectedItem: any
  

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submitOrder() {
    // Implement logic to submit the order details
    this.submitted = true

    if(!this.first_name || !this.last_name || !this.email || !this.phone || !this.address || !this.terms){

    this.toastController.create({
      message: "Please fill in the required fields before proceeding",
      duration: 3000,
      header: "Validation Error",
      color: 'danger',
      position: 'top'
    }).then((toast) => {
      toast.present()
    })

    return

  }

  let formData = {
    first_name:this.first_name,
    last_name:this.last_name,
    email:this.email,
    phone:this.phone,
    address:this.address,
    terms:this.terms,
    amountPayable:this.amountPayable,
    paymentMethod:this.paymentOption,
    productId : this.selectedItem.id
  }

  if(formData.paymentMethod == "Cash"){
    console.log("Cash logic")
  }

  if(formData.paymentMethod == "Mobile"){
    console.log("Mobile logic")
  }

  }

  submitted = false

  constructor(private modalCtrl: ModalController, private toastController : ToastController,private usersProfileService:UserprofileService) { }

  paymentDone(event:any){

    console.log(event)

  }

  paymentCancel(){
    console.log("Payment cancelled")
  }

  ngOnInit() {

    this.amountPayable = this.selectedItem.quantity * this.selectedItem.price

    this.amount = parseInt(this.amountPayable) * 100

    console.log(this.amount)

    this.reference = "alfredthis.selectedItem.name"

    this.usersProfileService.myProfile()
    .pipe(take(1))
    .subscribe(
      res=>{
        // console.log(res)
        this.first_name = res.profile.first_name
        this.last_name = res.profile.last_name
        this.email = res.profile.email
        this.phone = res.profile.phone_number
        this.address = res.profile.address

      }
    )
  
  }


  makePayment() {
    // code to make payment here
    // if (!this.selectedOption) {
    //   this.toastController.create({
    //     message:"Please select a payment option before placing the order",
    //     duration:3000,
    //     color:'secondary',
    //     position : 'top'
    //   }).then((toast)=>{
    //     toast.present()
    //   })
    //   return;
    // }
    // this.dismissModal();
  }

  ngAfterViewInit(){

  }

}
