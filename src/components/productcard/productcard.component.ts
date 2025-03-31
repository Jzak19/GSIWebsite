import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.css'
})
export class ProductcardComponent {

  constructor(private router: Router){}

  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() reviewCount: number = 0;
  @Input() year: number = 0;
  @Input() ID: string = '';
  @Input() type: string = '';

  goToProductPage(event: Event, product: any) {
    event.preventDefault();
    this.router.navigate(['product'], { state: { product } });
    console.log('Product Info:', product);
  }
}
