import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  }
openOrder(id: number) {
  this.router.navigate(['/orders', id]);
}


}
