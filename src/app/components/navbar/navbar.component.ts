import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  user;
  avatar;
  isDropdownOpen = false;
  private isLoggedInSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.userService.isLoggedIn$.subscribe(
      (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      }
    );

    this.userSubscription = this.userService.user$.subscribe(
      (user) => {
        this.user = user;
        if (this.user) {
          this.avatar = this.user.avatar; // Check if user is not null before accessing avatar
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.userService.logoutUser().subscribe(() => {
      console.log('Logout successful');
      this.isDropdownOpen = false; // Close dropdown on logout
      this.router.navigate(['/login']);
    });
  }
}
