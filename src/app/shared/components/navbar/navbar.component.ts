import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cartCount = 0;
  role: string = '';   // Updated via BehaviorSubject
  isShrunk = false;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    public wishlistService: WishlistService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    /** ⭐ 1. CART COUNT LIVE UPDATE */
    this.updateCartCount();
    this.cartService.cartChanged.subscribe(() => {
      this.updateCartCount();
    });

    /** ⭐ 2. SUBSCRIBE TO ROLE CHANGES (NO REFRESH NEEDED) */
    this.auth.role$.subscribe(role => {
      this.role = role;
    });
  }

  /** ⭐ Update cart count */
  updateCartCount() {
    const cart = this.cartService.getCart();
    this.cartCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);
  }

  /** ⭐ Logged-in check */
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  /** ⭐ Logout */
  logout() {
    this.auth.logout();   // uses auth service
    this.toast.show("Logged out successfully!", "success");
    this.router.navigate(['/home']);
  }

  /** ⭐ Navbar shrink on scroll */
  @HostListener('window:scroll', [])
  onScroll() {
    this.isShrunk = window.scrollY > 20;
  }

  /** ⭐ Admin check */
  isAdmin() {
    return this.role === 'admin';
  }
}
