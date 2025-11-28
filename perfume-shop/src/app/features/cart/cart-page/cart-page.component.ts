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

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    console.log("Cart items:", this.cartItems);
  }

  increase(item: any) {
    if (item.quantity < item.stock) {
      item.quantity++;
      this.cartService.saveCart(this.cartItems);
    }
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.saveCart(this.cartItems);
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
    this.cartService.saveCart(this.cartItems);
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

  buyNow() {

    if (this.cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    
    this.router.navigate(['/checkout']);
  }

}
