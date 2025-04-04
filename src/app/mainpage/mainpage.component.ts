import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { HeropanelComponent } from "../../components/heropanel/heropanel.component";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { MainpagecardComponent } from "../../components/mainpagecard/mainpagecard.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { InfinitescrollComponent } from "../../components/infinitescroll/infinitescroll.component";

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [NavbarComponent, HeropanelComponent, MainpagecardComponent, FooterComponent, InfinitescrollComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent implements OnInit {

  currentUserName: string = ''
  message: string = ''

  constructor(private router: Router, private auth: AuthserviceService) {}

  ngOnInit(): void {
    // Listen for changes in authentication state
    onAuthStateChanged(this.auth.getAuth(), (user: User | null) => {
      if (!user) {
        console.log('User is not logged in, returning to login page...');
        this.router.navigate(['']);
      } else {
        console.log('User is logged in:', user);

        this.currentUserName = user.displayName || user.email?.split('@')[0] || 'Guest User';

        if (this.currentUserName !== 'Guest User') {
          this.message = 'Welcome to the site! Here you can browse through various categories of items, read or leave reviews, and modify your profile. Happy browsing!';
        } else {
          this.message = 'Welcome to the site! A guest account allows you to browse products and reviews, but you will need an account to leave a review yourself!';
        }
      }
    });
  }

  
}
