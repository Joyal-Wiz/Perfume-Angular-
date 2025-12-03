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

  cartCount = 0;   // <-- FIX
  role: string = '';

  

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    public wishlistService: WishlistService,
    private toast:ToastService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.updateCartCount();
    this.role = localStorage.getItem('role') || '';
    window.addEventListener('storage', () => {
    this.role = localStorage.getItem('role') || '';
  });

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
  localStorage.removeItem('loggedUser');
  this.toast.show("Logged out successfully!", "success");
  this.router.navigate(['/home']);
}

    isShrunk = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.isShrunk = window.scrollY > 20;
  }

  isAdmin() {
  return this.role === 'admin';
}

}
