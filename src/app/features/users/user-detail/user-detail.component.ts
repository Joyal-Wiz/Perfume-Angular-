import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: any = null;
  userOrders: any[] = [];
  profileImageUrl: string = "assets/img/user1.jpg";  

  constructor(private router: Router) {}

  ngOnInit(): void {

    const data = localStorage.getItem("selectedUser");
    if (data) {
      this.user = JSON.parse(data);

      // Load profile image if user has saved one
      // if (this.user.profileImage) {
      //   this.profileImageUrl = this.user.profileImage;
      // }
    }

    this.loadUserOrders();
  }

  loadUserOrders() {
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    this.userOrders = allOrders.filter(
      (o: any) => o.userEmail === this.user.email
    );
  }

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  deleteUser() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updated = users.filter((u:any) => u.id !== this.user.id);
    localStorage.setItem('users', JSON.stringify(updated));
    this.router.navigate(['/users/manage']);
  }

  // ⭐ Upload user profile image
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {

      this.profileImageUrl = reader.result as string;
      this.user.profileImage = this.profileImageUrl;

      // Save in localStorage
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: any) => u.id === this.user.id);
      if (index !== -1) {
        users[index] = this.user;
        localStorage.setItem('users', JSON.stringify(users));
      }
    };

    reader.readAsDataURL(file);
  }
}
