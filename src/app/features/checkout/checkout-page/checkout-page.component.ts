import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  checkoutData = {
    name: '',
    address: '',
    card: '',
    email: ''
  };

  cartItems: any[] = [];
  totalAmount: number = 0;

  order: any = null;
  showModal = false;

  constructor(
    private router: Router,
    private toast: ToastService,
    private paymentService: PaymentService,
     private ngZone: NgZone,
      private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.totalAmount = this.getTotal();
  }


  getSubtotal() {
    return this.cartItems.reduce(
      (sum, i) => sum + (i.price * i.quantity),
      0
    );
  }

  getTotalDiscount() {
    return this.cartItems.reduce(
      (sum, i) => sum + ((i.price * i.discount / 100) * i.quantity),
      0
    );
  }

  getTotal() {
    return this.getSubtotal() - this.getTotalDiscount();
  }

startPayment() {

  // 1️⃣ Clean the rupee amount up to 2 decimals
  const cleanRupees = Number(this.totalAmount.toFixed(2));

  // 2️⃣ Convert to paise (INTEGER)
  const amountInPaise = Math.round(cleanRupees * 100);

  console.log("Paying amount in paise:", amountInPaise);

  this.paymentService.pay(
    amountInPaise,   // NOTE: sending paise, not rupees anymore

    // SUCCESS
    () => {
      this.ngZone.run(() => {
        this.createOrder();
        this.showModal = true;
        this.cd.detectChanges();
        console.log("Modal triggered");
      });
    },

    // FAILURE
    () => {
      this.ngZone.run(() => {
        this.toast.show("Payment Failed!", "error");
        this.cd.detectChanges();
      });
    }
  );
}





createOrder() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleString(),

    userEmail: loggedUser.email,
    userId: loggedUser.id,

    items: this.cartItems.map(i => ({
      ...i,
      finalPrice: ((i.price - (i.price * i.discount / 100)) * i.quantity).toFixed(2)
    })),

    total: this.totalAmount,
    status: 'Pending',

    checkout: {
      name: this.checkoutData.name,
      address: this.checkoutData.address,
      card: this.checkoutData.card,
      email: this.checkoutData.email
    }
  };

  const existing = JSON.parse(localStorage.getItem('orders') || '[]');
  existing.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(existing));

  localStorage.removeItem('cart');
  this.order = newOrder;
  this.showModal = true;
}

  onModalClose() {
    this.showModal = false;
    this.router.navigate(['/orders']);
  }


}
