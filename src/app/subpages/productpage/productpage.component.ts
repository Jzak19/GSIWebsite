import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { Router } from '@angular/router';
import { HeropanelComponent } from '../../../components/heropanel/heropanel.component';
import { UserreviewComponent } from "../../../components/userreview/userreview.component";
import { DatabasecommsService } from '../../databasecomms.service';

@Component({
  selector: 'app-productpage',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HeropanelComponent, UserreviewComponent],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.css'
})
export class ProductpageComponent implements OnInit{

  product: any;
  reviews: any;

  constructor(private router: Router, private db: DatabasecommsService) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras?.state?.['product'];
    if (this.product) {
      console.log('Product received: ', this.product)
    }
  }

  ngOnInit(): void {
    if (this.product) {
      const productId = this.product.type; 
      const docId = this.product.ID; 
      this.db.getProductReviews(productId, docId).then((reviews) => {
        this.reviews = reviews;
        console.log('Reviews:', this.reviews);
      }).catch(error => {
        console.error('Error fetching reviews:', error);
      });
    }
  }
}


