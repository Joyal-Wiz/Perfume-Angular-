import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { PaymentConfirmedModalComponent } from './components/payment-confirmed-modal/payment-confirmed-modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ToastComponent } from './components/toast/toast.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ConfirmationModalComponent,
    PaymentConfirmedModalComponent,
    NotFoundComponent,
    DashboardComponent,
    HomePageComponent,
    AboutComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
  NavbarComponent,
  HomePageComponent,
  PaymentConfirmedModalComponent,
  ToastComponent,
  DashboardComponent,
  FooterComponent,
],

})
export class SharedModule { }
