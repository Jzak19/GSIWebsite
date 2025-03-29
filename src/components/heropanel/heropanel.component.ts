import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heropanel',
  standalone: true,
  imports: [],
  templateUrl: './heropanel.component.html',
  styleUrl: './heropanel.component.css'
})
export class HeropanelComponent {

    @Input() userName?: string=''
    @Input() title?: string=''
    @Input() message: string=''
}
