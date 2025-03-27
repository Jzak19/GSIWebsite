import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ClothespageComponent } from './subpages/clothespage/clothespage.component';
import { CarspageComponent } from './subpages/carspage/carspage.component';
import { HousepageComponent } from './subpages/housepage/housepage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';



export const routes: Routes = [
    {path: '', component: LoginpageComponent},
    {path: 'main', component: MainpageComponent},
    {path: 'clothes', component: ClothespageComponent},
    {path: 'cars', component: CarspageComponent},
    {path: 'household', component: HousepageComponent},
    {path: 'profile', component: ProfilepageComponent}
];
