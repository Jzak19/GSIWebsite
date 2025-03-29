import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ProductcardComponent } from "../../../components/productcard/productcard.component";
import { DatabasecommsService } from '../../databasecomms.service';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-carspage',
  standalone: true,
  imports: [NavbarComponent, ProductcardComponent, CommonModule, FooterComponent],
  templateUrl: './carspage.component.html',
  styleUrl: './carspage.component.css'
})
export class CarspageComponent implements OnInit{

  public cars: any[] = []

  constructor(private db: DatabasecommsService){}

  ngOnInit(): void {
    this.db.getProducts('cars').then(data => {
      this.cars = data;
      console.log(this.cars)
    }).catch(error => {
      console.error('Error fetching cars:', error);
    })
  }
}
