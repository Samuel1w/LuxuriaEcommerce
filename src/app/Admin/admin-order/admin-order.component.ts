import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Order {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-admin-order',
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
  standalone: true,
})
export class AdminOrderComponent implements OnInit {
  users: User[] = [];
  orders: Order[] = [];
  selectedUserId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<{ id: number; name: string; email: string }[]>('https://luxuria-backend-v5u9.onrender.com/api/order/users')
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
  }

 
  selectUser(userId: number | null) {
  if (!userId) return;  // handle null
  this.selectedUserId = userId;
  this.orders = [];
  this.http.get<Order[]>(`https://luxuria-backend-v5u9.onrender.com/api/order/orders/${userId}`)
    .subscribe({
      next: data => this.orders = data,
      error: err => console.error(err)
    });
}


  addOrder(productId: number, quantity: number) {
  if (!this.selectedUserId) return;

  this.http.post('https://luxuria-backend-v5u9.onrender.com/api/order/orders', {
    userId: this.selectedUserId,
    productId: Number(productId),
    quantity: Number(quantity)
  }).subscribe(() => this.selectUser(this.selectedUserId!),
    err => console.error('Error adding order:', err));
}
deleteOrder(orderId: number) {
  if (!this.selectedUserId) return;

  this.http.delete(`https://luxuria-backend-v5u9.onrender.com/api/order/orders/${orderId}`)
    .subscribe({
      next: () => this.selectUser(this.selectedUserId!), // refresh orders
      error: err => console.error('Error deleting order:', err)
    });
}

}
