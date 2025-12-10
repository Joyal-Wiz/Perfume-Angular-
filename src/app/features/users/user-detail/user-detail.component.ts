import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: any = null;
  userOrders: any[] = [];
  profileImageUrl: string = "assets/img/user1.jpg";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 1️⃣ Read ID from URL
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!id) return;

    // 2️⃣ Load all users
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // 3️⃣ Find user by ID
    this.user = allUsers.find((u: any) => u.id === id);

    if (!this.user) {
      alert("User not found!");
      this.router.navigate(['/users/manage']);
      return;
    }

    // 4️⃣ Load profile image (if exists)
    if (this.user.profileImage) {
      this.profileImageUrl = this.user.profileImage;
    }

    // 5️⃣ Load user's orders
    this.loadUserOrders();
  }

  loadUserOrders() {
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    this.userOrders = allOrders.filter(
      (o: any) => o.userEmail === this.user.email
    );
  }

goToProduct(id: number) {
  this.router.navigate(['/products/details', id]);
}



  deleteUser() {
    if (!confirm("Delete this user?")) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updated = users.filter((u: any) => u.id !== this.user.id);
    localStorage.setItem("users", JSON.stringify(updated));

    this.router.navigate(['/users/manage']);
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.profileImageUrl = reader.result as string;
      this.user.profileImage = this.profileImageUrl;

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: any) => u.id === this.user.id);

      if (index !== -1) {
        users[index] = this.user;
        localStorage.setItem('users', JSON.stringify(users));
      }
    };

    reader.readAsDataURL(file);
  }
  getActiveOrders(): number {
  return this.userOrders.filter(order => 
    order.status.toLowerCase() === 'pending' || 
    order.status.toLowerCase() === 'processing'
  ).length;
}

getCompletedOrders(): number {
  return this.userOrders.filter(order => 
    order.status.toLowerCase() === 'delivered'
  ).length;
}
}
