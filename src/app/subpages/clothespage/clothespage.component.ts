import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { ProductcardComponent } from "../../../components/productcard/productcard.component";
import { DatabasecommsService } from '../../databasecomms.service';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-clothespage',
  standalone: true,
  imports: [NavbarComponent, ProductcardComponent, CommonModule, FooterComponent],
  templateUrl: './clothespage.component.html',
  styleUrl: './clothespage.component.css'
})
export class ClothespageComponent implements OnInit{

  public clothes: any[] = []

  constructor(private db: DatabasecommsService){
    
  }

  ngOnInit(): void {
    this.db.getProducts('clothes').then(data => {
      this.clothes = data;
      console.log(this.clothes)
    }).catch(error => {
      console.error('Error fetching cars:', error);
    })
  }
}
