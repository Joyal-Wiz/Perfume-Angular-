import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  async sendOTP(email: string, name: string, otp: string) {
    const templateParams = {
      to_email: email,
      to_name: name,
      otp: otp
    };

    return emailjs.send(
      'service_en50u7k',     
      'template_tbsuq64',     
      templateParams,
      'hHiAKcuHbDKzvpz46'    
    );
  }
}
