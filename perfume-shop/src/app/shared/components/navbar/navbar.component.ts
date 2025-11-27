import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

isLoggedIn() {
  return this.authService.isLoggedIn();
}


logout() {
  this.authService.logout();
  this.router.navigate(['/auth/signin']);
}



}
