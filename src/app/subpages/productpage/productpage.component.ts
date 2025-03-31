import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { Router } from '@angular/router';
import { HeropanelComponent } from '../../../components/heropanel/heropanel.component';
import { UserreviewComponent } from "../../../components/userreview/userreview.component";
import { DatabasecommsService } from '../../databasecomms.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthserviceService } from '../../authservice.service';
import { onAuthStateChanged, User } from 'firebase/auth';

@Component({
  selector: 'app-productpage',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HeropanelComponent, UserreviewComponent, ReactiveFormsModule],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.css'
})
export class ProductpageComponent implements OnInit{

  product: any;
  reviews: any;
  username: string = ''

  formChanged = false

  

  constructor(private router: Router, private db: DatabasecommsService, private auth: AuthserviceService) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras?.state?.['product'];
    if (this.product) {
      console.log('Product received: ', this.product)
      console.log("Image received", this.product.image)
    }

    this.reviewForm.valueChanges.subscribe(() => {
      this.formChanged = true
    })
  }

  reviewForm = new FormGroup({
    rating: new FormControl<number>(1),
    comment: new FormControl(''),
    username: new FormControl('')
  });

  ngOnInit(): void {

    onAuthStateChanged(this.auth.getAuth(), (user: User | null) => {
          if (user) {
            console.log('User is logged in:', user);
            this.username = user.displayName || user.email?.split('@')[0] || 'Guest User';
          }
        })

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

    this.username = this.auth.getAuth().currentUser?.email?.split('@')[0] || 'Guest user'
  }

  

  onSubmit() {
    if (this.reviewForm.valid) {
      this.reviewForm.patchValue({ username: this.username })
      const newReview = this.reviewForm.value;
      this.db.postReview(this.product.type, this.product.ID, newReview).then(() => window.location.reload())
      
    }
  }

  toNum(num: any){
    return Number(num)
  }
}


