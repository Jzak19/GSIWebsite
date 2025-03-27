import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';



export const routes: Routes = [
    {path: '', component: LoginpageComponent},
    {path:'main', component: MainpageComponent}
];
