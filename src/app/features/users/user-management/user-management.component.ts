import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];

  searchText: string = "";
  selectedRole: string = "All";
  sortType: string = "";

  // Pagination
  page = 1;
  pageSize = 6;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ⭐ Load users from localStorage
  loadUsers() {
    const data = localStorage.getItem('users');
    this.users = data ? JSON.parse(data) : [];

    // Remove ADMIN from user list
    this.users = this.users.filter(u => u.role !== 'admin');

    this.applyFilters();
  }

  // ⭐ Apply search + filter + sort
  applyFilters() {
    const search = this.searchText.toLowerCase().trim();

    this.filteredUsers = this.users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesRole =
        this.selectedRole === "All" || user.role === this.selectedRole;

      return matchesSearch && matchesRole;
    });

    // Sorting
    if (this.sortType === "az") {
      this.filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (this.sortType === "za") {
      this.filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Reset to first page after filtering
    this.page = 1;
  }

  // ⭐ Pagination result
  get paginatedUsers() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  // ⭐ View a user safely
viewUser(user: any) {
  if (!user?.id) return;

  localStorage.setItem("selectedUserId", user.id.toString());
  this.router.navigate(['/users', user.id]);
}


  // ⭐ Delete user
  deleteUser(id: number) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    this.users = this.users.filter(u => u.id !== id);
    localStorage.setItem("users", JSON.stringify(this.users));

    this.applyFilters(); // refresh view
  }
}
