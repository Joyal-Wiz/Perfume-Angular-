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
  filteredProducts: any[] = [];

  // Filters
  selectedCategory = "All";
  selectedBrand = "All";
  searchText = "";
  maxPrice = 300;

  // Pagination
  page = 1;
  pageSize = 8;
  totalProducts = 0;

  // Brand List
  brands: string[] = [];

  constructor(
    public cartService: CartService,
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router
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

      // price filter
      if (p.price > this.maxPrice)
        return false;

      return true;
    });

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
      alert("Please login first!");
      this.router.navigate(['/auth/signin']);
      return;
    }

    this.cartService.addToCart(p);
    alert("Product added to cart!");
  }
}
