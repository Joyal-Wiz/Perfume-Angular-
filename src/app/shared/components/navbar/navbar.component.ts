import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cartCount = 0;
  role: string = '';
  isShrunk = false;

  notifications: any[] = [];
  unreadCount = 0;
  dropdownOpen = false;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    public wishlistService: WishlistService,
    private toast: ToastService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    // Cart live update
    this.updateCartCount();
    this.cartService.cartChanged.subscribe(() => this.updateCartCount());

    // Role live update
    this.auth.role$.subscribe(role => {
      this.role = role;
    });

    // Notifications live update
    this.notificationService.notifications$.subscribe(list => {
      this.notifications = list;
      this.unreadCount = list.filter(n => !n.read).length;
    });
  }

  updateCartCount() {
    const cart = this.cartService.getCart();
this.cartCount = cart.reduce(
  (total: number, item: any) => total + item.quantity,
  0
);
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.toast.show("Logged out successfully!", "success");
    this.router.navigate(['/home']);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isShrunk = window.scrollY > 20;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  // 🔔 Dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

 markAsRead(id: number) {
  this.notificationService.markAsRead(id);
}

markAll() {
  this.notificationService.markAllAsRead();
}

clearAll() {
  this.notificationService.clearAll();
}

}
