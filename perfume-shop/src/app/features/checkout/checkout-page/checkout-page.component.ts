import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  checkoutData = {
    name: '',
    address: '',
    card: '',
    email:''
  };

  order: any = null;
  showModal = false;

  constructor(private router: Router) {}

  placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart || cart.length === 0) {
      alert('Cart is empty. Add products first.');
      return;
    }

    // basic validation
    if (!this.checkoutData.name || !this.checkoutData.address || !this.checkoutData.card) {
      alert('Please fill all fields.');
      return;
    }

const newOrder = {
  id: Date.now(),
  date: new Date().toLocaleString(),
  items: cart,
  total: cart.reduce((s: any, it: any) => s + it.price * it.quantity, 0),
  status: 'Placed',
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
