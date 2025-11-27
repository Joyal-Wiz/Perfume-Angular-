import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-page',
templateUrl: './cart-page.component.html',
styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    console.log("Cart items:", this.cartItems);
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
buyNow() {
  if (this.cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  this.router.navigate(['/checkout']);
}

increase(item: any) {
  this.cartService.updateQuantity(item.id, +1);
  this.cartItems = this.cartService.getCart();
}

decrease(item: any) {
  this.cartService.updateQuantity(item.id, -1);
  this.cartItems = this.cartService.getCart();
}

remove(item: any) {
  this.cartService.removeItem(item.id);
  this.cartItems = this.cartService.getCart();
}




}
