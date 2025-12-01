import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartChanged = new EventEmitter<void>(); 

  constructor() {}

  
  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }


  addToCart(product: any) {

    if (product.stock <= 0) {
      alert("This product is out of stock!");
      return;
    }

    let cart = this.getCart();
    let existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      if (existing.quantity < product.stock) {
        existing.quantity++;
      } else {
        alert("Reached maximum stock available!");
      }
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.saveCart(cart); // <-- USE saveCart so navbar updates
  }

  saveCart(cart: any[]) {
    localStorage.setItem("cart", JSON.stringify(cart));
    this.cartChanged.emit();       // <-- notify navbar
  }

  updateQuantity(id: number, change: number) {
    let cart = this.getCart();

    cart = cart.map((item: any) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    });

    this.saveCart(cart);   // <-- use saveCart
  }

  removeItem(id: number) {
    let cart = this.getCart();

    cart = cart.filter((item: any) => item.id !== id);

    this.saveCart(cart);   // <-- use saveCart
  }
}
