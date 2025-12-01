import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    WishlistPageComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    SharedModule
  ]
})
export class WishlistModule { }
