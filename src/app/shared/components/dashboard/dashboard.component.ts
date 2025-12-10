import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

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

  // Admin Analytics Data
  totalProducts = 0;
  totalUsers = 0;
  totalOrders = 0;
  totalRevenue = 0;

  adminView: string = 'dashboard'; // ⭐ SWITCHING VIEW

  adminStats = {
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  };

  salesChart: any;
  statusChart: any;
  chartsReady = false;
dataLoaded = false;


  ngOnInit(): void {
      setTimeout(() => {
    this.loadAdminAnalytics();
    this.dataLoaded = true;    
  }, 800);

    /*LOGGED USER*/
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) this.user = JSON.parse(storedUser);

    this.role = localStorage.getItem('role');

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    /* ADMIN DASHBOARD */
    if (this.role === 'admin') {

      this.adminStats.total = allOrders.length;
      this.adminStats.approved = allOrders.filter((o: any) => o.status === "Approved").length;
      this.adminStats.pending = allOrders.filter((o: any) =>
        o.status === "Pending" || o.status === "Placed"
      ).length;
      this.adminStats.rejected = allOrders.filter((o: any) => o.status === "Rejected").length;

      this.pendingOrders = allOrders.filter((o: any) =>
        o.status === "Pending" || o.status === "Placed"
      );

      this.loadAdminAnalytics();

      // Initial chart load
setTimeout(() => {
  this.loadSalesChart();
  this.loadStatusChart();
  this.chartsReady = true;  
}, 300);


      return;
    }

    /*USER DASHBOARD LOGIC*/
    if (!this.user) return;

    this.orders = allOrders.filter((o: any) =>
      o.userEmail === this.user.email ||
      o.checkout?.email === this.user.email
    );

    this.userOrderedItems = this.orders.flatMap((order: any) => order.items);
  }

  /* ADMIN SUMMARY CALCULATIONS*/
  loadAdminAnalytics() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    this.totalProducts = products.length;
    this.totalUsers = users.filter((u: any) => u.role !== 'admin').length;
    this.totalOrders = orders.length;

    this.totalRevenue = orders.reduce(
      (sum: number, o: any) => sum + Number(o.total),
      0
    );
  }

  /*SALES CHART (BAR)*/
 loadSalesChart() {
  const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

  if (this.salesChart) this.salesChart.destroy();

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const monthlySales: any = {};

  orders.forEach((o: any) => {

    const datePart = o.date.split(',')[0];  // "4/12/2025"
    const [day, month, year] = datePart.split('/').map(Number);

    const correctDate = new Date(year, month - 1, day);

    const monthName = correctDate.toLocaleString('default', { month: 'short' });

    if (!monthlySales[monthName]) monthlySales[monthName] = 0;
    monthlySales[monthName] += Number(o.total);
  });

  this.salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(monthlySales),
      datasets: [{
        label: "Monthly Revenue (₹)",
        data: Object.values(monthlySales),
        backgroundColor: "#0d6efd90",
        borderColor: "#0d6efd",
        borderWidth: 1
      }]
    }
  });
}

  loadStatusChart() {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;

    // Destroy old chart
    if (this.statusChart) this.statusChart.destroy();

    this.statusChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Approved", "Pending", "Rejected"],
        datasets: [{
          data: [
            this.adminStats.approved,
            this.adminStats.pending,
            this.adminStats.rejected
          ],
          backgroundColor: ["#28a745", "#ffc107", "#dc3545"]
        }]
      }
    });
  }

  /* CHECK ROLE*/
  isAdmin() {
    return this.role === 'admin';
  }

  /* USER VIEW ORDER */
  viewOrder(item: any) {
    const order = this.orders.find((o: any) =>
      o.items.some((i: any) => i.id === item.id)
    );

    if (order) {
      localStorage.setItem("selectedOrder", JSON.stringify(order));
      this.router.navigate(['/orders', order.id]);
    }
  }

  /* ADMIN OPEN ORDER */
  openOrder(order: any) {
    localStorage.setItem("selectedOrder", JSON.stringify(order));
    this.router.navigate(['/orders', order.id]);
  }

  /* SWITCH ADMIN VIEW*/
  switchAdminView(view: string) {
    this.adminView = view;

    // When returning to dashboard → reload charts
    if (view === 'dashboard') {
      setTimeout(() => {
        this.loadSalesChart();
        this.loadStatusChart();
      }, 100);
    }
  }

}
