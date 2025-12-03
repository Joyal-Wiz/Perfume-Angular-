import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent {
  products: any[] = [];
constructor(
  public wishlistService: WishlistService,
  private productsService: ProductsService,
  private cartService: CartService,
) {}

ngOnInit() {
  const ids = this.wishlistService.getWishlist(); // array of numbers

  this.products = this.productsService.getProducts()
  .filter((p: any) => ids.includes(p.id));
}


toggleWishlist(id: number) {
  this.wishlistService.toggleWishlist(id);
  this.ngOnInit(); // refresh list
}

addProduct(p: any) {
  this.cartService.addToCart(p);
}

}
