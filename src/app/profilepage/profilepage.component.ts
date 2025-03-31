import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent implements OnInit{

  public username: string = ''
  public email: string = ''

  constructor(private auth: AuthserviceService, private router: Router){}

  profileUpdateForm = new FormGroup({
    imageURL: new FormControl(''),
    username: new FormControl(''),
  });

  productUploadForm = new FormGroup({
    imageURL: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl('')
  })



  ngOnInit(): void {
     onAuthStateChanged(this.auth.getAuth(), (user: User | null) => {
          if (!user) {
            console.log('User is not logged in, returning to login page...');
            this.router.navigate(['']);
          } else {
            console.log('User is logged in:', user);
            this.username = this.auth.getAuth().currentUser?.displayName ||  this.auth.getAuth().currentUser?.email?.split('@')[0] || 'Guest user'
            this.email = this.auth.getAuth().currentUser?.email || 'No email'

            this.profileUpdateForm.patchValue({
              username: this.username
            });
          
      
        }
      });
  }

  onUpdateInfo() {
    const updatedProfile = this.profileUpdateForm.value;
    console.log("updated Profile Info: ", updatedProfile)
  }

  onUploadProduct(){
    const newProduct = this.productUploadForm.value;
    console.log("new Product: ", newProduct)
  }

  onDeleteAccount(){
    console.log("Deleting account")
  }

}
