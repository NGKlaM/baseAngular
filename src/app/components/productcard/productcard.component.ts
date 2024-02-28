import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.css'
})
export class ProductcardComponent {
  @Input() productChild: any;
}
