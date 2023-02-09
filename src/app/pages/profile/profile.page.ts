import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BalanceComponent } from 'src/app/components/balance/balance.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  coverImageUrl = 'https://images.pexels.com/photos/3906110/pexels-photo-3906110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  profileImageUrl = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  username = 'John Doe';
  email = 'john.doe@example.com';
  followers = 42;
  following = 123;

  constructor(private modalCtrl : ModalController) { }

  async presentBalanceModal(){
    const modal = await this.modalCtrl.create({
      component: BalanceComponent,
      showBackdrop: true,
      initialBreakpoint : 0.4
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
