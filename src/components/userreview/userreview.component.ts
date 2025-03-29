import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-userreview',
  standalone: true,
  imports: [],
  templateUrl: './userreview.component.html',
  styleUrl: './userreview.component.css'
})
export class UserreviewComponent {

  @Input() username?: string = ''
  @Input() review: string = ''
  @Input() rating: number = 0

}
