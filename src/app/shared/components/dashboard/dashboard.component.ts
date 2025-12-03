import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = null;
  role: string | null = null;

  orders: any[] = [];
  userOrderedItems: any[] = [];

  ngOnInit(): void {
    // Get logged user
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    // Get user/admin role
    this.role = localStorage.getItem('role');  // "admin" or "user"

    // If admin → dashboard should show admin menu only
    if (this.role === 'admin') {
      return; // skip user order loading
    }

    // USER order loading
    if (!this.user) return;

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

this.orders = allOrders.filter((o: any) =>
o.userEmail === this.user.email || o.userId === this.user.id
);

    this.userOrderedItems = this.orders.flatMap((order: any) => order.items);
  }
  
  
  // admin
    isAdmin() {
    return this.role === 'admin';
  }
  
}


