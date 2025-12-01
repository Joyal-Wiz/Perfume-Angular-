import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  onSignup() {
  const success = this.auth.signup(this.formData);

  if (success) {
    alert("Account created successfully!");
    this.router.navigate(['/auth/signin']);
  }
}
}
