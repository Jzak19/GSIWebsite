import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ProductcardComponent } from "../../../components/productcard/productcard.component";
import { DatabasecommsService } from '../../databasecomms.service';

@Component({
  selector: 'app-carspage',
  standalone: true,
  imports: [NavbarComponent, ProductcardComponent, CommonModule],
  templateUrl: './carspage.component.html',
  styleUrl: './carspage.component.css'
})
export class CarspageComponent {

  constructor(private db: DatabasecommsService){

    
  }

  cars = [
    {
      name: 'Tesla Model S',
      image: 'https://example.com/tesla-model-s.jpg',
      description: 'A luxury electric sedan with incredible performance and technology.',
      price: '$80,000',
      reviewCount: 2300
    },
    {
      name: 'Ford Mustang',
      image: 'https://example.com/ford-mustang.jpg',
      description: 'An iconic muscle car with a powerful engine and sleek design.',
      price: '$45,000',
      reviewCount: 1500
    },
    {
      name: 'Chevrolet Corvette',
      image: 'https://example.com/chevrolet-corvette.jpg',
      description: 'A high-performance sports car with cutting-edge engineering.',
      price: '$60,000',
      reviewCount: 1200
    },
    {
      name: 'BMW M3',
      image: 'https://example.com/bmw-m3.jpg',
      description: 'A compact executive sports car with thrilling performance and handling.',
      price: '$70,000',
      reviewCount: 800
    },
    {
      name: 'Audi R8',
      image: 'https://example.com/audi-r8.jpg',
      description: 'A supercar with stunning design and exceptional driving dynamics.',
      price: '$140,000',
      reviewCount: 3000
    }
  ];

  

  

}
