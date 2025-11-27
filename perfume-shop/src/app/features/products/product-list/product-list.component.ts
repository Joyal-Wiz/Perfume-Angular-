import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getAllProducts();
  }

  addProduct(p: any) {

    // Step 1: Check login
    if (!this.authService.isLoggedIn()) {
      alert("Please login first!");
      this.router.navigate(['/auth/signin']);
      return;
    }

    // Step 2: Add to cart
    this.cartService.addToCart(p);
    alert("Product added to cart!");
  }
}
