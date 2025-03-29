import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { ProductcardComponent } from "../../../components/productcard/productcard.component";
import { DatabasecommsService } from '../../databasecomms.service';

@Component({
  selector: 'app-housepage',
  standalone: true,
  imports: [NavbarComponent, ProductcardComponent, CommonModule],
  templateUrl: './housepage.component.html',
  styleUrl: './housepage.component.css'
})
export class HousepageComponent {

  constructor(private db: DatabasecommsService) {
  }

  householdItems = [
    {
      name: 'Vacuum Cleaner',
      image: 'https://example.com/vacuum-cleaner.jpg',
      description: 'A powerful vacuum cleaner for deep cleaning, suitable for all types of flooring.',
      price: '$150',
      reviewCount: 1200
    },
    {
      name: 'Microwave Oven',
      image: 'https://example.com/microwave-oven.jpg',
      description: 'A compact microwave oven with multiple cooking settings and easy-to-use features.',
      price: '$80',
      reviewCount: 800
    },
    {
      name: 'Blender',
      image: 'https://example.com/blender.jpg',
      description: 'A high-powered blender perfect for smoothies, soups, and food prep.',
      price: '$60',
      reviewCount: 700
    },
    {
      name: 'Coffee Maker',
      image: 'https://example.com/coffee-maker.jpg',
      description: 'A modern coffee maker with multiple brewing options and a sleek design.',
      price: '$40',
      reviewCount: 950
    },
    {
      name: 'Air Purifier',
      image: 'https://example.com/air-purifier.jpg',
      description: 'An efficient air purifier to remove dust, allergens, and improve indoor air quality.',
      price: '$130',
      reviewCount: 400
    }
  ];
}
