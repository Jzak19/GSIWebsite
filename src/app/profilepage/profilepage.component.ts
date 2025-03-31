import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
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
  currentYear = new Date().getFullYear()

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
    year: new FormControl<any>(this.currentYear),
    description: new FormControl(''),
    size: new FormControl(''),
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
      console.log("updated Profile displayName: ", updatedProfile)
    }

    if (updatedProfile.imageURL != this.imageURL) {
      await this.db.updateUserProfileImage(this.auth.getAuth().currentUser?.uid || 'None', updatedProfile.imageURL || this.imageURL).then((url) => {
        this.imageURL = updatedProfile.imageURL || 'None'
        window.location.reload()
      })
      console.log("updated Profile Image: ", updatedProfile)
    }

    this.formChanged = false
  }

  async onUploadProduct(){

    if (!this.productUploadForm.value.year && this.productUploadForm.value.type !== 'household' || isNaN(this.productUploadForm.value.year) || this.productUploadForm.value.year < 1900 || this.productUploadForm.value.year > this.currentYear) {
      console.error('Invalid Year! Please enter a number between 1900 and ' + this.currentYear);
      alert(`Invalid Year: Please use a range between 1900 and ${this.currentYear}`);
      return;
    }
    
    if (!this.productUploadForm.value.model) {
      console.error('Invalid Title! Title cannot be empty.');
      alert('Invalid Title: Please enter a valid title.');
      return;
    }
    
    if (!this.productUploadForm.value.type) {
      console.error('Invalid Type! Type cannot be empty.');
      alert('Invalid Type: Please select a valid type.');
      return;
    }

    if (!this.productUploadForm.value.imageURL) {
      this.productUploadForm.patchValue({
        imageURL: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
      })
    }

    if (!this.productUploadForm.value.description) {
      this.productUploadForm.patchValue({
        description: 'No description was provided, but whatever the product is, we are sure its awesome!'
      })
    }

    this.productUploadForm.patchValue({
      year: String(this.productUploadForm.value.year)
    })

    const newProduct = this.productUploadForm.value;
    
    console.log('New Product: ', newProduct);

    await this.db.uploadProduct(newProduct.type || 'None', newProduct.model || 'None', newProduct.description || 'None', newProduct.year || 'None', [], newProduct.size || 'None', newProduct.imageURL || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png')
    //window.location.reload()
  }

  async onDeleteAccount(){
    await this.db.removeUser(this.auth.getAuth().currentUser?.uid || 'None')
    await this.auth.removeUser()
    await this.auth.logout()
    console.log("Deleting account")
  }

  onLogoutClick(){
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

