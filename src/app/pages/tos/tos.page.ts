import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.page.html',
  styleUrls: ['./tos.page.scss'],
})
export class TosPage implements OnInit {

  dropContent = 'ourmission'

  dropDown(content:string){
    this.dropContent = content ? content : ''
  }

  constructor() { }

  ngOnInit() {
  }

}
