import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));   // get id from URL
    const allProducts = this.productService.getAllProducts();    // get all products

    this.product = allProducts.find(p => p.id === id);           // find matching product
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      alert("Please login first!");
      this.router.navigate(['/auth/signin']);
      return;
    }

    this.cartService.addToCart(this.product);
    alert("Product added to cart!");
  }
  buyNow() {
  this.router.navigate(['/checkout']);
}


}
