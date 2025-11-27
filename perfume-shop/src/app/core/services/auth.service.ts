import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  signup(user: any) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true; 
  }
  signin(credentials: any) {
    const users = this.getUsers();

    const foundUser = users.find((u: any) =>
      u.email === credentials.email &&
      u.password === credentials.password
    );

    if (foundUser) {
      localStorage.setItem('loggedUser', JSON.stringify(foundUser));
      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('loggedUser');
    return !!user;
  }
  logout() {
  localStorage.removeItem('loggedUser');
}


  private getUsers() {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }
}
