import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderManagementComponent } from './order-management/order-management.component';


const routes: Routes = [
  { path: '', component: OrdersListComponent },
  { path: ':id', component: OrderManagementComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
