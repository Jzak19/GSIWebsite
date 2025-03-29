import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { ProductcardComponent } from "../../../components/productcard/productcard.component";
import { DatabasecommsService } from '../../databasecomms.service';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-housepage',
  standalone: true,
  imports: [NavbarComponent, ProductcardComponent, CommonModule, FooterComponent],
  templateUrl: './housepage.component.html',
  styleUrl: './housepage.component.css'
})
export class HousepageComponent implements OnInit{

  public householdItems: any[] = []

  constructor(private db: DatabasecommsService) {
  }

  ngOnInit(): void {
    this.db.getProducts('household').then(data => {
      this.householdItems = data;
      console.log(this.householdItems)
    }).catch(error => {
      console.error('Error fetching cars:', error);
    })
  }
  
}
