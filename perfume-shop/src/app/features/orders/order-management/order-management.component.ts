import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  order: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    this.order = allOrders.find((o: any) => o.id === id);
  }
  cancelOrder() {
  if (!confirm("Are you sure you want to cancel this order?")) return;

  // Change status to Canceled
  this.order.status = 'Canceled';

  // Update localStorage
  const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

  const updated = allOrders.map((o: any) => {
    if (o.id === this.order.id) {
      return this.order;
    }
    return o;
  });

  localStorage.setItem('orders', JSON.stringify(updated));

  alert("Order canceled successfully!");
}

  
}
