import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { PaymentConfirmedModalComponent } from './components/payment-confirmed-modal/payment-confirmed-modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ConfirmationModalComponent,
    PaymentConfirmedModalComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
