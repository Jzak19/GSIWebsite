import { Component } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatabasecommsService } from '../databasecomms.service';


@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',

})
export class LoginpageComponent {

  constructor(private authService: AuthserviceService, private router: Router, private db: DatabasecommsService) {}

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  errorMessage: string = ''

  async submitData(type: string){
    switch (type){
      case 'login' :
        console.log('Attempting user login: ', this.userForm.value.email, this.userForm.value.password)
        this.authService.login(this.userForm.value.email!, this.userForm.value.password!).then(() => {
          console.log("Login Success!")
          this.router.navigate(['/main'])
        }).catch((error) => {
          this.errorMessage = "Login Failed, check your details, or create an account!"
        })
        break
      case 'register' :
        console.log('Attempting registration of user: ', this.userForm.value.email, this.userForm.value.password)
        this.authService.register(this.userForm.value.email!, this.userForm.value.password!).then( async () => {
          await this.db.createUserStorage(this.authService.getAuth().currentUser?.uid || 'None', 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=826')
          console.log("Login Success!")
          this.router.navigate(['/main'])
        }).catch((error) => {
          this.errorMessage = "Register failed, user must already exist!"
        })

        
        break
      case 'guest' :
        console.log('Guest registration')
        console.log('Attempting registration of user: ', this.userForm.value.email, this.userForm.value.password)
        this.authService.signInAsGuest().then(async () => {
          await this.db.createUserStorage(this.authService.getAuth().currentUser?.uid || 'None', 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=826')
          console.log("Login Success!")
          this.router.navigate(['/main'])
        }).catch((error) => {
          this.errorMessage = "Error signing in as guest"
        })
        break
    }
    
  }

}
