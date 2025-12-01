import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

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
    private router: Router,
    private toast:ToastService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));   // get id from URL
    const allProducts = this.productService.getAllProducts();    // get all products

    this.product = allProducts.find(p => p.id === id);           // find matching product
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
     this.toast.show("Please login first!", "error");
      this.router.navigate(['/auth/signin']);
      return;
    }

    this.cartService.addToCart(this.product);
    this.toast.show("Please login first!", "success");

  }
  buyNow() {
  this.router.navigate(['/checkout']);
}


}
