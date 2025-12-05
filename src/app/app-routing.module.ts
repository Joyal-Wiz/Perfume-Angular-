import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { AboutComponent } from './shared/components/about/about.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
   {
    path: 'home',
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
}, {
  path: 'users',
  loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
},
{
  path: 'about',
  component: AboutComponent
},
{ path: 'dashboard', component: DashboardComponent },
{
  path: 'wishlist',
  loadChildren: () =>
    import('./features/wishlist/wishlist.module')
      .then(m => m.WishlistModule)
},

  { path: '**', component: NotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
