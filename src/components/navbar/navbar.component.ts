import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthserviceService } from '../../app/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private auth: AuthserviceService, private router: Router) {}

  dropdownOpen = false;
  mobileMenuOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate([''])
      console.log("Logging out...")
    })
  }
}
