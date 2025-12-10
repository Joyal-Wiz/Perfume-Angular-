import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: any = {};
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));  // Convert to number
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.product = this.productService.getProductById(id);
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.product.image = 'assets/img/' + file.name;
}


saveChanges() {
  this.productService.updateProduct(this.product);
  this.router.navigate(['/products/details', this.product.id]);
}


  cancel() {
    this.router.navigate(['/products/details', this.product.id]);
  }

}
