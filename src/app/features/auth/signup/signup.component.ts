import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  formData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast:ToastService,
  ) {}

  onSignup() {
  const success = this.auth.signup(this.formData);

  if (success) {
    this.toast.show('Account created successfully!', 'success');
    this.router.navigate(['/auth/signin']);
  }
}
}
