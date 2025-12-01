import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cartCount = 0;   // <-- FIX
  

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    public wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    this.updateCartCount();

    // Listen for changes in cart
    this.cartService.cartChanged.subscribe(() => {
      this.updateCartCount();
    });
  }

  updateCartCount() {
    const cart = this.cartService.getCart();
    this.cartCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }
    isShrunk = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.isShrunk = window.scrollY > 20;
  }
}
