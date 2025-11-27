import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  // get cart items
  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // add item to cart
  addToCart(product: any) {
    let cart = this.getCart();

    // check if product already exists
    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // save back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  updateQuantity(id: number, change: number) {
  let cart = this.getCart();

  cart = cart.map((item: any) => {
    if (item.id === id) {
      return { ...item, quantity: Math.max(1, item.quantity + change) };
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
}

removeItem(id: number) {
  let cart = this.getCart();

  cart = cart.filter((item: any) => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
}

}
