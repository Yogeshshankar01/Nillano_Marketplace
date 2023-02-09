import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {

  constructor(private modalCTRL : ModalController) { }

  dismissModal(){
    this.modalCTRL.dismiss()
  }

  availableBalance = 300
  pendingMoney = 200

  withdrawMoney(){
    
  }

  ngOnInit() {}

}
