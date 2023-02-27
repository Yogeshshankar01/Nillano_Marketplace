import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveditemsService } from 'src/app/services/saveditems.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  redirect(path:string){

    this.router.navigate([path])

  }

  savedItems:any

  constructor(private router:Router,private savedItemsService:SaveditemsService) { }

  ngOnInit() {
    this.savedItems = this.savedItemsService.getAllSavedItems()
  }

}
