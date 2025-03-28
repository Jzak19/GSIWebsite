import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-mainpagecard',
  standalone: true,
  imports: [],
  templateUrl: './mainpagecard.component.html',
  styleUrl: './mainpagecard.component.css'
})
export class MainpagecardComponent {
  @Input() imageSrc: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() link: string = '';
}
