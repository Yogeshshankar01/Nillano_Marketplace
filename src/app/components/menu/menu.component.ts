import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private userProfileService: UserprofileService) { }

  user: any

  getUser() {
    this.userProfileService.myProfile()
      .pipe(take(1))
      .subscribe(
        res => {
          this.user = res.profile
        },
        err => {
          console.log(err)
        }
      )
  }

  ngOnInit() {
    this.getUser()
  }

  redirect(redirect: any) {
    // navigate to the products page
    const navigationExtras: NavigationExtras = { replaceUrl: true };
    this.router.navigate([redirect], navigationExtras);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
