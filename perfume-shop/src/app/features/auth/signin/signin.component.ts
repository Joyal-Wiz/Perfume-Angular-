import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  formData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
onSignin() {
  if (!this.formData.email || !this.formData.password) {
    alert("Please enter email and password.");
    return;
  }

  const isValid = this.authService.signin(this.formData);

  if (isValid) {
    alert("Login successful!");

    // ⭐ Redirect to home page
    this.router.navigate(['/home']);
  } 
  else {
    alert("Invalid email or password");
  }
}


}
