import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = null;
  orders: any[] = [];
  userOrderedItems: any[] = [];

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    if (!this.user) return;

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    this.orders = allOrders.filter((o: any) =>
      o.checkout?.email === this.user.email
    );

    this.userOrderedItems = this.orders.flatMap((order: any) => order.items);
  }
}
