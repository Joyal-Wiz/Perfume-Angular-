import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-orders-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  order: any;

  constructor(private route: ActivatedRoute,
    private toast:ToastService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    this.order = allOrders.find((o: any) => o.id === id);
  }
cancelOrder() {
  if (!confirm("Are you sure you want to cancel this order?")) return;

  this.order.status = 'Cancelled';  // use standard spelling

  const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

  const updated = allOrders.map((o: any) =>
    o.id === this.order.id ? this.order : o
  );

  localStorage.setItem('orders', JSON.stringify(updated));

  this.toast.show("Order cancelled!", "error");

}


  
}
