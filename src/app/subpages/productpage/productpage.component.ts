import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { Router } from '@angular/router';
import { HeropanelComponent } from '../../../components/heropanel/heropanel.component';
import { UserreviewComponent } from "../../../components/userreview/userreview.component";

@Component({
  selector: 'app-productpage',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HeropanelComponent, UserreviewComponent],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.css'
})
export class ProductpageComponent {

  product: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras?.state?.['product'];
    if (this.product) {
      console.log('Product received: ', this.product)
    }
  }
}
