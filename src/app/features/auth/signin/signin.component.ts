import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

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
    private router: Router,
    private toast:ToastService,
  ) {}
onSignin() {
  if (!this.formData.email || !this.formData.password) {
    alert("Please enter email and password.");
    return;
  }

  const isValid = this.authService.signin(this.formData);

  if (isValid) {
this.toast.show("Login successful!", "success");

    // ⭐ Redirect to home page
    this.router.navigate(['/home']);
  } 
  else {
    this.toast.show("Invalid email or password", "error");
  }
}


}
