import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss'],
})
export class CommentModalComponent implements OnInit {

  rating:any
  comment:any
  submitComment(){
    console.log({r:this.rating,c:this.comment})
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

}
