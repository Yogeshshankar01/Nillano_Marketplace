import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  chats = [
    {
      id: 1, name: "Lawson Shoes",
      sent: [
        {
          from: 1,
          to: 2,
          content: "Hello"
        }
      ],
      receive: [
        {
          from: 2,
          to: 1,
          content: "Hi"
        }
      ]
    },
    { id: 2, name: "ShoeShopper" },
    { id: 3, name: "MarketMaverick" },
    { id: 4, name: "Seller456" },
    { id: 5, name: "TradeMaster" },
    { id: 6, name: "Shopaholic789" },
    { id: 7, name: "LawsonLuxe" },
    { id: 8, name: "StepUpStyle" },
    { id: 9, name: "Lawson Shoes" },
    { id: 10, name: "ShoeShopper" },
    { id: 11, name: "MarketMaverick" },
    { id: 12, name: "Seller456" },
    { id: 13, name: "TradeMaster" },
    { id: 14, name: "Shopaholic789" },
    { id: 15, name: "LawsonLuxe" },
    { id: 16, name: "StepUpStyle" }
  ]

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  selectedUser = false
  selectedUserMessages:any

  constructor(private activeRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.activeRoute.queryParams.subscribe(params => {

      if (!params["chat"]) {
        this.selectedUser = false
      }
      else {
        this.selectedUser = true
        let selectedUserId = params["chat"]
        this.selectedUserMessages = this.chats.find(chat=>(chat.id == selectedUserId))

        let chatslist = document.getElementById('chatslist') as HTMLElement
        let chats = document.getElementById('chats') as HTMLElement
        
        if(window.innerWidth <= 767){

        chatslist.classList.add('d-none')
        chats.classList.remove('d-none')

        }

        else{
          chatslist.classList.remove('d-none')
          chats.classList.add('d-none')
        }

        // let backButton = document.getElementById('backButton') as HTMLElement
        // backButton.addEventListener('click',()=>{
        //   this.router.navigate(['messages'])
        // })

        // // this.router.createUrlTree()
        // window.history.pushState()

      }

    })

  }

}
