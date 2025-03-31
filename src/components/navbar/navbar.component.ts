import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../app/authservice.service';
import { Router } from '@angular/router';
import { DatabasecommsService } from '../../app/databasecomms.service';
import { onAuthStateChanged, User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  imageURL: string = ''

  constructor(public auth: AuthserviceService, private router: Router, private db: DatabasecommsService) {}

  async ngOnInit(): Promise<void> {
    onAuthStateChanged(this.auth.getAuth(), async (user: User | null) => {
      this.imageURL = await this.db.getUserImageURL(this.auth.getAuth().currentUser?.uid || 'None')
    })
      
  }

  dropdownOpen = false;
  mobileMenuOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout() {

    const currentType = this.auth.getAuth().currentUser?.isAnonymous 

    if (currentType == true) {
      this.db.removeUser(this.auth.getAuth().currentUser?.uid || 'None')
      this.auth.removeUser()
      console.log("Deleting guest user")
    }

    this.auth.logout().then(() => {

      this.router.navigate([''])
      console.log("Logging out...")
    })
  }
}
