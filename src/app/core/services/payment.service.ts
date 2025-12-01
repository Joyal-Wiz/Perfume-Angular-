import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() {}

  pay(amountInPaise: number, onSuccess: Function, onFailure?: Function) {

  const options = {
    key: environment.razorpayKeyId,
    amount: amountInPaise,   // paise, not rupees
    currency: 'INR',
    name: 'Dar Al Itr',
    description: 'Perfume Payment',
    image: '/assets/img/logo.png',

    handler: (response: any) => {
      console.log("Payment Success:", response);
      onSuccess(response);
    }
  };

  const razorpay = new Razorpay(options);

  razorpay.on('payment.failed', (err: any) => {
    console.log("Payment Failed:", err);
    if (onFailure) onFailure(err);
  });

  razorpay.open();
}

}
