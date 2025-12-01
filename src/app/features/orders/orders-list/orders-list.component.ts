import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders: any[] = [];
  page = 1;
  pageSize = 4;   
  totalPages = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]').reverse();
    this.totalPages = Math.ceil(this.orders.length / this.pageSize);
  }

  // ⭐ Orders to show on the current page
  get paginatedOrders() {
    const start = (this.page - 1) * this.pageSize;
    return this.orders.slice(start, start + this.pageSize);
  }

  // ⭐ Pagination actions
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;

    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
  
    }
  }

  goToPage(num: number) {
    this.page = num;
  
  }

  openOrder(id: number) {
    this.router.navigate(['/orders', id]);
  }
}
