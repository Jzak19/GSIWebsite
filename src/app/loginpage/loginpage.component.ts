import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',

})
export class LoginpageComponent {

  constructor(private authService: AuthserviceService, private router: Router) {}

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  errorMessage: string = ''

  submitData(type: string){
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
        this.authService.register(this.userForm.value.email!, this.userForm.value.password!).then(() => {
          console.log("Login Success!")
          this.router.navigate(['/main'])
        }).catch((error) => {
          this.errorMessage = "Register failed, user must already exist!"
        })
        break
      case 'guest' :
        console.log('Guest registration')
        console.log('Attempting registration of user: ', this.userForm.value.email, this.userForm.value.password)
        this.authService.signInAsGuest().then(() => {
          console.log("Login Success!")
          this.router.navigate(['/main'])
        }).catch((error) => {
          this.errorMessage = "Error signing in as guest"
        })
        break
    }
    
  }

}
