import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-confirmed-modal',
  templateUrl: './payment-confirmed-modal.component.html',
  styleUrls: ['./payment-confirmed-modal.component.scss']
})
export class PaymentConfirmedModalComponent {

  @Input() order: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
