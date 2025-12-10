import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { NgxImageCompressService } from 'ngx-image-compress';

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
    private toast: ToastService,
      private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit() {
    const products = this.productService.getProducts();
    this.brands = [...new Set(products.map((p: any) => p.brand))] as string[];
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e: any) => {

    const compressed = await this.imageCompress.compressFile(
      e.target.result,
      -1,
      50, 
      50 
    );

    this.previewImage = compressed;   
    this.product.image = compressed;  
  };

  reader.readAsDataURL(file);
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
