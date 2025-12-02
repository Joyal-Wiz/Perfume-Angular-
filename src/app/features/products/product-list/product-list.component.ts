import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

  // Filters
  selectedCategory = "All";
  selectedBrand = "All";
  searchText = "";
  priceSort: string = "none";  

  // Pagination
  page = 1;
  pageSize = 9;
  totalProducts = 0;

  // Brand List
  brands: string[] = [];

  constructor(
    public cartService: CartService,
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    public wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getAllProducts();

    // Extract unique brands
    this.brands = [...new Set(this.products.map(p => p.brand))];

    this.filteredProducts = [...this.products];
    this.totalProducts = this.filteredProducts.length;
  
  }


  // ⭐ MASTER FILTER FUNCTION
applyFilters() {
  // 1️⃣ Filtering
  this.filteredProducts = this.products.filter(p => {

    // category filter
    if (this.selectedCategory !== "All" && p.category !== this.selectedCategory)
      return false;

    // brand filter
    if (this.selectedBrand !== "All" && p.brand !== this.selectedBrand)
      return false;

    // search filter
    if (this.searchText && !p.name.toLowerCase().includes(this.searchText.toLowerCase()))
      return false;

    return true;
  });

  // 2️⃣ Sorting (Low → High, High → Low)
  if (this.priceSort === "low") {
    this.filteredProducts = this.filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (this.priceSort === "high") {
    this.filteredProducts = this.filteredProducts.sort((a, b) => b.price - a.price);
  }

  // 3️⃣ Update pagination
  this.totalProducts = this.filteredProducts.length;
  this.page = 1;
}

  // Pagination
  get paginatedProducts() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

addProduct(p: any) {
  if (!this.authService.isLoggedIn()) {
    this.toast.show("Please login first!", "error");
    this.router.navigate(['/auth/signin']);
    return;
  }

  this.cartService.addToCart(p);
  this.toast.show("Added to cart!", "success");
}
toggleWishlist(id: number) {
  this.wishlistService.toggleWishlist(id);
}


}
