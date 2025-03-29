import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { ProductcardComponent } from "../../../components/productcard/productcard.component";
import { DatabasecommsService } from '../../databasecomms.service';

@Component({
  selector: 'app-clothespage',
  standalone: true,
  imports: [NavbarComponent, ProductcardComponent, CommonModule],
  templateUrl: './clothespage.component.html',
  styleUrl: './clothespage.component.css'
})
export class ClothespageComponent {

  constructor(private db: DatabasecommsService){
    
  }

  clothes = [
    {
      name: 'Leather Jacket',
      image: 'https://example.com/leather-jacket.jpg',
      description: 'A stylish black leather jacket for all occasions, perfect for cool weather.',
      price: '$120',
      reviewCount: 450
    },
    {
      name: 'Blue Jeans',
      image: 'https://example.com/blue-jeans.jpg',
      description: 'Comfortable and durable blue jeans, a must-have staple for your wardrobe.',
      price: '$50',
      reviewCount: 350
    },
    {
      name: 'Red T-shirt',
      image: 'https://example.com/red-tshirt.jpg',
      description: 'A vibrant red T-shirt made from soft cotton, perfect for casual wear.',
      price: '$25',
      reviewCount: 200
    },
    {
      name: 'Wool Sweater',
      image: 'https://example.com/wool-sweater.jpg',
      description: 'A warm and cozy wool sweater, ideal for winter season and cold weather.',
      price: '$80',
      reviewCount: 300
    },
    {
      name: 'Sneakers',
      image: 'https://example.com/sneakers.jpg',
      description: 'Comfortable sneakers for everyday wear, with a modern design and excellent support.',
      price: '$90',
      reviewCount: 550
    }
  ];
}
