import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent {

  constructor(private auth: AuthserviceService, private router: Router) {
    if (!auth.isAuthenticated()){
      router.navigate([''])
      console.log("User is not logged in, returning to login page...")
    }
  }

}
