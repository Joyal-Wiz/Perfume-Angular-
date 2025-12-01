import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/core/services/email.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email = '';
  otpSent = false;
  generatedOtp = '';
  enteredOtp = '';
  name = 'User';

  constructor(
    private emailService: EmailService,
    private toast: ToastService,
    private router:Router,
  ) {}

  sendOTP() {
    if (!this.email) {
      this.toast.show("Enter your email!", "error");
      return;
    }

    // Generate OTP
    this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email using EmailJS
    this.emailService.sendOTP(this.email, this.name, this.generatedOtp)
      .then(() => {
        this.toast.show("OTP sent to your email!", "success");
        this.otpSent = true;
      })
      .catch(() => {
        this.toast.show("Failed to send OTP. Try again!", "error");
      });
  }

verifyOTP() {
  if (this.enteredOtp === this.generatedOtp) {
    this.toast.show("OTP Verified!", "success");

    // Save email temporarily for reset
    localStorage.setItem("reset_email", this.email);

    setTimeout(() => {
      this.router.navigate(['/auth/reset-password']);
    }, 1000);

  } else {
    this.toast.show("Invalid OTP!", "error");
  }
}

}
