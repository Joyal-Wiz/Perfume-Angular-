import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() {}

  pay(amount: number, onSuccess: Function, onFailure?: Function) {

    const options = {
      key: environment.razorpayKeyId,   // ✔ correct usage
      amount: amount * 100,             // convert ₹ to paise
      currency: 'INR',
      name: 'Dar Al Itr',
      description: 'Perfume Payment',
      image: '/assets/img/logo.png',

      handler: (response: any) => {
        console.log("Payment Success:", response);
        onSuccess(response);
      },

      prefill: {
        name: "Joyal Jose",
        email: "joyal@example.com",
        contact: "9999999999"
      },

      theme: {
        color: '#6c4eff'
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
