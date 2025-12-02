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

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const userIndex = users.findIndex((u: any) => u.email === this.email);

  if (userIndex === -1) {
    this.toast.show("User does not exist!", "error");
    return;
  }

  users[userIndex].password = this.newPassword;

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.removeItem("reset_email");

  this.toast.show("Password reset successfully!", "success");

  setTimeout(() => {
    this.router.navigate(['/auth/signin']);
  }, 1200);
}

}
