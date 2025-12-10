import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  role: string = '';
  showDeleteConfirm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {

    const user = localStorage.getItem('loggedUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.role = parsedUser.role || localStorage.getItem("role");
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const allProducts = this.productService.getProducts();

    this.product = allProducts.find((p: any) => p.id === id);
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.toast.show("Please login first!", "error");
      this.router.navigate(['/auth/signin']);
      return;
    }

    this.cartService.addToCart(this.product);
    this.toast.show("Added to cart!", "success");
  }

  buyNow() {
    this.router.navigate(['/checkout']);
  }

  editProduct() {
    this.router.navigate(['/products/edit', this.product.id]);
  }

  openDeleteConfirm() {
    this.showDeleteConfirm = true;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id);
    this.toast.show("Product deleted successfully!", "success");
    this.showDeleteConfirm = false;
    this.router.navigate(['/products']);
  }

  getProducts() {
    const data = localStorage.getItem('products');
    return data ? JSON.parse(data) : [];
  }

  isAdmin() {
    return this.role === 'admin';
  }

}
