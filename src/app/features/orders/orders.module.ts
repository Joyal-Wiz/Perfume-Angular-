import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderManagementComponent } from './order-management/order-management.component';


@NgModule({
  declarations: [
    OrdersListComponent,
    OrderManagementComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
