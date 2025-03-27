import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';  


@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',

})
export class LoginpageComponent {

  constructor(private authService: AuthserviceService) {}

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  submitData(type: string){
    switch (type){
      case 'login' :
        console.log('Attempting user login: ', this.userForm.value.email, this.userForm.value.password)
        this.authService.login(this.userForm.value.email!, this.userForm.value.password!)
        break
      case 'register' :
        console.log('Attempting registration of user: ', this.userForm.value.email, this.userForm.value.password)
        this.authService.register(this.userForm.value.email!, this.userForm.value.password!)
        break
      case 'guest' :
        console.log('Guest registration')
        break
    }
    
  }

}
