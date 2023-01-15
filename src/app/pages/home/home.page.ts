import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/AppState';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy,OnInit {

  title = 'My Title'

  welcomeMessage = false

  selectedTab = 'buying';

  segmentChanged(event: any) {
    this.selectedTab = event.detail.value;
  }

  constructor(private store:Store<AppState>) {}

  ngOnInit() {
    this.store.select('register')
    .subscribe(
      registerState=>{
        if(registerState.registered){
          this.welcomeMessage = true
        }
      }
    )
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
