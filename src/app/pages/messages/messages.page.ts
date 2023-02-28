import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  chats: any

  back() {
    this.router.navigate(['messages'])
  }


  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  selectedUser = false
  selectedUserMessages: any

  formatTimestamp(isoString: string): string {
    const now = new Date();
    const timestamp = new Date(isoString).getTime();
    const elapsed = now.getTime() - timestamp;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;

    if (elapsed < minute) {
      return 'Just now';
    } else if (elapsed < hour) {
      const minutes = Math.floor(elapsed / minute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (elapsed < day) {
      const hours = Math.floor(elapsed / hour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (elapsed < 2 * day) {
      return 'Yesterday';
    } else if (elapsed < week) {
      const days = Math.floor(elapsed / day);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      const date = new Date(timestamp);
      return date.toLocaleString();
    }
  }

  content = ""

  addChat(userId: number) {
    
    this.chats.forEach((element: any) => {
      if(element.id === userId){

        element.messages.push({
          id: 4,
          content: this.content,
          from: 1,
          to: userId,
          createdAt: new Date().toISOString()
        })

        this.content = ""

      }
    });
 
  }


  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.chats = [
      {
        "id": 2,
        "username": "Smith_Stores",
        "first_name": "Jane",
        "user_profile": {
          "url": "https://ionicframework.com/docs/img/demos/avatar.svg",
          "public_id": "sjjd"
        },
        "messages": [
          {
            "id": 1,
            "content": "Hello good morning",
            "from": 1,
            "to": 2,
            "createdAt": "2023-02-27T19:10:28.044Z"
          },
          {
            "id": 3,
            "content": "Am Latif",
            "from": 1,
            "to": 2,
            "createdAt": "2023-02-27T19:10:28.044Z"
          },
          {
            "id": 4,
            "content": "Good morning, how are you",
            "from": 2,
            "to": 1,
            "createdAt": "2023-02-27T19:10:28.045Z"
          }
        ]
      },
      {
        "id": 3,
        "username": "Bobby1_Shop",
        "first_name": "Bob",
        "user_profile": {
          "url": "https://ionicframework.com/docs/img/demos/avatar.svg",
          "public_id": "sjjd"
        },
        "messages": [
          {
            "id": 5,
            "content": "hey",
            "from": 3,
            "to": 1,
            "createdAt": "2023-02-27T19:10:28.045Z"
          },
          {
            "id": 6,
            "content": "hi",
            "from": 1,
            "to": 3,
            "createdAt": "2023-02-27T19:10:28.045Z"
          }
        ]
      }
    ]

    this.activeRoute.queryParams.subscribe(params => {


      let chatslist = document.getElementById('chatslist') as HTMLElement
      let chats = document.getElementById('chats') as HTMLElement

      if (!params["chat"]) {
        this.selectedUser = false
        chatslist.classList.remove('d-none')
        chats.classList.add('d-none')
      }

      else {
        this.selectedUser = true
        let selectedUserId = params["chat"]
        this.selectedUserMessages = this.chats.find((chat: { id: any; }) => (chat.id == selectedUserId))

        if (window.innerWidth <= 767) {

          chatslist.classList.add('d-none')
          chats.classList.remove('d-none')

        }

        else {
          chatslist.classList.remove('d-none')
          chats.classList.add('d-none')
        }



      }

    })

  }

}
