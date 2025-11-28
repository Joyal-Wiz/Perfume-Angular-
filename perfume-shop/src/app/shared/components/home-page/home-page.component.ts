import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  bestProducts = [
  { name: 'Royal Oud', price: 149, image: 'assets/img/a.jpg' },
  { name: 'Velvet Bloom', price: 129, image: 'assets/img/a.jpg' },
  { name: 'Noir Mystique', price: 139, image: 'assets/img/a.jpg' },
  { name: 'Amber Luxe', price: 159, image: 'assets/img/a.jpg' }
];

brands = ['ZARA', 'AURA', 'CARRE', 'DIVA', 'BAY', 'LUXE', 'ARKO'];


}
