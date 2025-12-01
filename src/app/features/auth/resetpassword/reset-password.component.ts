import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  email: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.email = localStorage.getItem("reset_email") || "";
    if (!this.email) {
      this.toast.show("No reset request found!", "error");
      this.router.navigate(['/auth/forgot-password']);
    }
  }

  resetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.toast.show("Please fill all fields", "error");
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.toast.show("Passwords do not match!", "error");
      return;
    }

    // Load users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Update the user
    const updatedUsers = users.map((u: any) => {
      if (u.email === this.email) {
        return { ...u, password: this.newPassword };
      }
      return u;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Clear temporary reset email
    localStorage.removeItem("reset_email");

    this.toast.show("Password reset successfully!", "success");
    
    // Auto redirect after 2 seconds
    setTimeout(() => {
      this.router.navigate(['/auth/signin']);
    }, 1500);
  }
}
