import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  user: any = null;
  role: string | null = null;

  orders: any[] = [];
  userOrderedItems: any[] = [];

  pendingOrders: any[] = [];

  adminStats = {
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  };

  ngOnInit(): void {

    // Load logged user
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.role = localStorage.getItem('role');

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    // ===================== ADMIN =======================
    if (this.role === 'admin') {
      
      this.adminStats.total = allOrders.length;
      this.adminStats.approved = allOrders.filter((o:any) => o.status === "Approved").length;
      this.adminStats.pending = allOrders.filter((o:any) => o.status === "Pending" || o.status === "Placed").length;
      this.adminStats.rejected = allOrders.filter((o:any) => o.status === "Rejected").length;

      // Load ONLY pending orders
      this.pendingOrders = allOrders.filter((o:any) =>
        o.status === "Pending" || o.status === "Placed"
      );

      return;
    }

    // ===================== USER =======================
    if (!this.user) return;

this.orders = allOrders.filter((o: any) =>
  o.userEmail === this.user.email || o.checkout.email === this.user.email
);


    this.userOrderedItems = this.orders.flatMap((order:any) => order.items);
  }

  isAdmin() {
    return this.role === 'admin';
  }

  // When user clicks “View Order”
  viewOrder(item: any) {
    const order = this.orders.find((o:any) =>
      o.items.some((i: any) => i.id === item.id)
    );

    if (order) {
      localStorage.setItem("selectedOrder", JSON.stringify(order));
      this.router.navigate(['/orders', order.id]);
    }
  }

  // When admin clicks "View Request"
  openOrder(order: any) {
    localStorage.setItem("selectedOrder", JSON.stringify(order));
    this.router.navigate(['/orders', order.id]);
  }

}
