import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user:any

  constructor(private route: ActivatedRoute, private http: HttpClient,private titleService:Title,private metaService:Meta) { }

  ngOnInit() {

    let username = this.route.snapshot.paramMap.get('username');

    this.http.get(`${environment.server}/users/public_profile/${username}`)
    .pipe(take(1))
    .subscribe(
      res=>{
        this.user = res

        this.titleService.setTitle(`${this.user.username} - ${this.user.first_name} ${this.user.last_name}`);

        this.metaService.updateTag({ property: 'og:title', content: `${this.user.username} - ${this.user.first_name} ${this.user.last_name}` });
        this.metaService.updateTag({ name: 'twitter:title', content: `${this.user.sername} - ${this.user.first_name} ${this.user.last_name}` });
        this.metaService.updateTag({ property: 'og:description', content: this.user.bio });
        this.metaService.updateTag({ name: 'twitter:description', content: this.user.bio });
        this.metaService.updateTag({ property: 'og:image', content: this.user.user_profile.url });
        this.metaService.updateTag({ name: 'twitter:image', content: this.user.user_profile.url });

      }
    )

  }

  handleRefresh(event:any) {
    // do some work to refresh the content here
    // ...

    //let refreshertext = document.querySelector(".refresher-refreshing-text") as HTMLElement

    //refreshertext.style.color = "#000"

    location.reload()
  
    // when the refresh is complete, call the complete() method
    setTimeout(() => {

      event.target.complete();
      
    }, 1500);
  }

}
