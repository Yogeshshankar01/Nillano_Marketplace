import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {

  @Input()
  name!: string;
  @Input()
  email!: string;
  @Input()
  phone!: string;
  @Input()
  address!: string;

  subtotal = 0;
  delivery = 0;
  total = 0;

  @Input() selectedItem: any
  

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submitOrder() {
    // Implement logic to submit the order details
  }

  constructor(private modalCtrl: ModalController, private toastController : ToastController) { }

  ngOnInit() {

    this.subtotal = this.selectedItem.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0);
    this.delivery = 5;
    this.total = this.subtotal + this.delivery;
  }

  selectedOption:any

  selectOption(option: string) {

    document.querySelectorAll('.option').forEach((e)=>{
      e.hasAttribute("color") ? e.removeAttribute("color") : ''
    })

    var opt = document.getElementById(option) as HTMLElement
    opt.setAttribute("color","warning")
    this.selectedOption = option;
  }

  makePayment() {
    // code to make payment here
    if (!this.selectedOption) {
      this.toastController.create({
        message:"Please select a payment option before placing the order",
        duration:3000,
        color:'secondary',
        position : 'top'
      }).then((toast)=>{
        toast.present()
      })
      return;
    }
    this.dismissModal();
  }

}
