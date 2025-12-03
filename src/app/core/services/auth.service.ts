import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {

  // Create admin only if it doesn't already exist
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
    user.role = 'user'; // ensure users always get user role
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true; 
  }

  // ⭐ SIGNIN for Admin + User
  signin(credentials: any): boolean {

    // 1️⃣ Check Admin Login
    const admin = JSON.parse(localStorage.getItem('adminAccount') || '{}');

    if (
      credentials.email === admin.email &&
      credentials.password === admin.password
    ) {
      localStorage.setItem('loggedUser', JSON.stringify(admin));
      localStorage.setItem('role', 'admin');
      return true;
    }

    // 2️⃣ Check User Login
    const users = this.getUsers();

    const foundUser = users.find((u: any) =>
      u.email === credentials.email &&
      u.password === credentials.password
    );

    if (foundUser) {
      localStorage.setItem('loggedUser', JSON.stringify(foundUser));
      localStorage.setItem('role', 'user');
      return true;
    }

    return false;
  }

  // ⭐ Check logged in status
  isLoggedIn(): boolean {
    const user = localStorage.getItem('loggedUser');
    return !!user;
  }

  // ⭐ Logout
  logout() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('role');
  }

  // ⭐ Fetch all users
  private getUsers() {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }
}
