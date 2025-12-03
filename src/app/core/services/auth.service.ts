import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ⭐ BehaviorSubject for LIVE UI updates
  role$ = new BehaviorSubject<string>(localStorage.getItem('role') || '');

  constructor() {

    // Create admin only if not present
    const adminExists = localStorage.getItem('adminAccount');

    if (!adminExists) {
      const admin = {
        id: 1,
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin'
      };

      localStorage.setItem('adminAccount', JSON.stringify(admin));
    }
  }

  // ⭐ USER SIGNUP
  signup(user: any) {
    const users = this.getUsers();
    user.role = 'user';
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  // ⭐ SIGNIN for Admin + Normal Users
  signin(credentials: any): boolean {

    // 1️⃣ Check Admin Login
    const admin = JSON.parse(localStorage.getItem('adminAccount') || '{}');

    if (
      credentials.email === admin.email &&
      credentials.password === admin.password
    ) {
      localStorage.setItem('loggedUser', JSON.stringify(admin));
      localStorage.setItem('role', 'admin');

      this.role$.next('admin'); // 🔥 Update UI instantly
      return true;
    }

    // 2️⃣ Check Normal User Login
    const users = this.getUsers();
    const foundUser = users.find((u: any) =>
      u.email === credentials.email &&
      u.password === credentials.password
    );

    if (foundUser) {
      localStorage.setItem('loggedUser', JSON.stringify(foundUser));
      localStorage.setItem('role', 'user');

      this.role$.next('user'); // 🔥 Update UI instantly
      return true;
    }

    return false;
  }

  // ⭐ Check logged in status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedUser');
  }

  // ⭐ Logout
  logout() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('role');

    this.role$.next('');
  }

  // ⭐ Fetch all users
  private getUsers() {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }
}
