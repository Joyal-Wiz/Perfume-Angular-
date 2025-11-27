import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then((m) => m.CartModule)
  },
  {
  path: 'orders',
  loadChildren: () =>
    import('./features/orders/orders.module').then(m => m.OrdersModule)
},
{
  path: 'checkout',
  loadChildren: () =>
    import('./features/checkout/checkout.module').then(m => m.CheckoutModule)
},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
