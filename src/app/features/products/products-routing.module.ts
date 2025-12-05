import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    {
  path: 'details/:id',
  component: ProductDetailsComponent
},

{ path: 'add', component: AddProductComponent },
{
  path: 'edit/:id',
  component: EditProductComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ProductsRoutingModule {
  
}
