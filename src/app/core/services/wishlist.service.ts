import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistKey = 'wishlist';
  private wishlist: number[] = [];

  constructor() {
    const saved = localStorage.getItem(this.wishlistKey);
    if (saved) this.wishlist = JSON.parse(saved);
  }

  getWishlist() {
    return this.wishlist;
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.includes(productId);
  }

  toggleWishlist(productId: number) {
    if (this.isInWishlist(productId)) {
      this.wishlist = this.wishlist.filter(id => id !== productId);
    } else {
      this.wishlist.push(productId);
    }
    localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlist));
  }
}
