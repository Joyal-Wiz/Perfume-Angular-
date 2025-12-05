import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ⭐ Role BehaviorSubject for instant UI updates
  role$ = new BehaviorSubject<string>(localStorage.getItem('role') || '');

  constructor() {

    // Auto-create admin account
    if (!localStorage.getItem('adminAccount')) {
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

  /* ─────────────────────────────────────────────
      USER SIGNUP
  ─────────────────────────────────────────────── */
  signup(user: any) {
    const users = this.getUsers();

    user.role = 'user';
    user.id = Date.now();

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  /* ─────────────────────────────────────────────
      SIGNIN (Admin + User)
  ─────────────────────────────────────────────── */
  signin(credentials: any): boolean {

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    /* --- ADMIN LOGIN --- */
    const admin = JSON.parse(localStorage.getItem('adminAccount') || '{}');

    if (
      admin.email?.toLowerCase() === email &&
      admin.password === password
    ) {
      const safeAdmin = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'admin'
      };

      localStorage.setItem('loggedUser', JSON.stringify(safeAdmin));
      localStorage.setItem('role', 'admin');

      this.role$.next('admin');
      return true;
    }

    /* --- USER LOGIN --- */
    const users = this.getUsers();
    const foundUser = users.find((u: any) =>
      u.email.toLowerCase() === email &&
      u.password === password
    );

    if (foundUser) {

      // 🔥 store only essential user data (fixes quota exceeded)
      const safeUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: 'user'
      };

      localStorage.setItem('loggedUser', JSON.stringify(safeUser));
      localStorage.setItem('role', 'user');

      this.role$.next('user');
      return true;
    }

    return false;
  }

  /* ─────────────────────────────────────────────
      LOGIN STATE
  ─────────────────────────────────────────────── */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedUser');
  }

  /* ─────────────────────────────────────────────
      LOGOUT
  ─────────────────────────────────────────────── */
  logout() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('role');

    this.role$.next('');
  }

  /* ─────────────────────────────────────────────
      GET USERS FROM STORAGE
  ─────────────────────────────────────────────── */
  private getUsers() {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }
}
