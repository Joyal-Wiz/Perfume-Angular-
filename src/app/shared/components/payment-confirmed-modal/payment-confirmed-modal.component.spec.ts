import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfirmedModalComponent } from './payment-confirmed-modal.component';

describe('PaymentConfirmedModalComponent', () => {
  let component: PaymentConfirmedModalComponent;
  let fixture: ComponentFixture<PaymentConfirmedModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentConfirmedModalComponent]
    });
    fixture = TestBed.createComponent(PaymentConfirmedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
