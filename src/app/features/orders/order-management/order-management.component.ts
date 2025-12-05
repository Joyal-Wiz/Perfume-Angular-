import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  order: any = null;
  role:string=''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    this.order = allOrders.find((o:any) => o.id === id);

    if (!this.order) {
      this.toast.show("Order not found!", "error");
      this.router.navigate(['/dashboard']);
    }
  }

  saveUpdatedOrder() {
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const index = allOrders.findIndex((o:any) => o.id === this.order.id);

    if (index !== -1) {
      allOrders[index] = this.order;
      localStorage.setItem("orders", JSON.stringify(allOrders));
    }
  }

  approveOrder() {
    this.order.status = "Approved";
    this.saveUpdatedOrder();
    this.toast.show("Order Approved!", "success");
  }

  rejectOrder() {
    this.order.status = "Rejected";
    this.saveUpdatedOrder();
    this.toast.show("Order Rejected!", "error");
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
  cancelOrder() {
  this.order.status = "Cancelled";
  this.saveUpdatedOrder();
}
isAdmin() {
  return localStorage.getItem("role") === "admin";
}



}
