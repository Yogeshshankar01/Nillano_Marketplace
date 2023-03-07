import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  dismissModal(){
this.modalCtrl.dismiss()
  }

  segment:any = "all"

  onSegmentChange(){
    
  }

  searchResults:any = []

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();

    if(!query){
      this.searchResults = []
      return
    }

    this.http.get(`${environment.server}/search/searchItem/${query}`)
    .pipe(take(1))
    .subscribe(
      res=>{
        this.searchResults = JSON.parse(JSON.stringify(res))
      }
    )

    // console.log(this.searchResults)
  }

  // ionViewDidLeave(){
  //   this.dismissModal()
  // }

  constructor(private modalCtrl:ModalController,private http:HttpClient) { }

  ngOnInit() {}

}
