import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.css'
})
export class ProductcardComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() reviewCount: number = 0;
  @Input() year: number = 0
}
