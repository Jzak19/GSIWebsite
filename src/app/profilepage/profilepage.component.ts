import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DatabasecommsService } from '../databasecomms.service';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent implements OnInit{

  public username: string = ''
  public imageURL: string = ''
  public email: string = ''

  constructor(private auth: AuthserviceService, private router: Router, private db: DatabasecommsService){

    this.profileUpdateForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });

  }

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

  formChanged = false

  async ngOnInit(): Promise<void> {
     onAuthStateChanged(this.auth.getAuth(), async (user: User | null) => {
          if (!user) {
            console.log('User is not logged in, returning to login page...');
            this.router.navigate(['']);
          } else {
            console.log('User is logged in:', user);
            this.username = this.auth.getAuth().currentUser?.displayName ||  this.auth.getAuth().currentUser?.email?.split('@')[0] || 'Guest user'
            this.email = this.auth.getAuth().currentUser?.email || 'No email'
            this.imageURL = await this.db.getUserImageURL(this.auth.getCurrentUser()?.uid || 'failed')
            
            console.log('imageURL:', this.imageURL)

            this.profileUpdateForm.patchValue({
              username: this.username,
              imageURL: this.imageURL
            });
            this.formChanged = false
            console.log(this.formChanged)
        }
      });

      
  }

  async onUpdateInfo() {
    const updatedProfile = this.profileUpdateForm.value;

    if (updatedProfile.username != this.username) {
      await this.auth.updateUserDisplayName(updatedProfile.username || this.username).then(() => window.location.reload())
      console.log("updated Profile Info: ", updatedProfile)
    }

    this.formChanged = false
  }

  onUploadProduct(){
    const newProduct = this.productUploadForm.value;
    console.log("New Product: ", newProduct)
  }

  async onDeleteAccount(){
    await this.db.removeUser(this.auth.getAuth().currentUser?.uid || 'None')
    await this.auth.removeUser()
    await this.auth.logout()
    console.log("Deleting account")
  }

}
