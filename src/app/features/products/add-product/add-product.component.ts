import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: any = {
    name: '',
    brand: '',
    category: '',
    price: null,
    discount: null,
    stock: null,
    image: ''   // Base64 image will be stored here
  };

  previewImage: string | ArrayBuffer | null = null;

  brands: string[] = [];
  categories = ["Men", "Women", "Unisex", "Fresh", "Luxury", "Oud"];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    const products = this.productService.getProducts();
    this.brands = [...new Set(products.map((p: any) => p.brand))] as string[];
  }

  // 📌 Handle File Upload + Preview
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage = reader.result;     // For UI preview
      this.product.image = reader.result;    // Save Base64 in product object
    };

    reader.readAsDataURL(file);  // Convert to Base64
  }

  saveProduct() {
    let products = this.productService.getProducts();

    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...this.product
    };

    products.push(newProduct);

    localStorage.setItem('products', JSON.stringify(products));

    this.toast.show("Product added successfully!", "success");

    this.router.navigate(['/products']);
  }
}
