import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
