import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

interface Order {
  id: number;
  title: string;
  quantity: number;
  price: number;
  created_at: string;
}

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule,FooterComponent],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  totalAmount: number = 0;
  userId: number | null = null; // get from auth service or token

  constructor(private http: HttpClient, private location: Location) {}
  

  ngOnInit(): void {
    // Replace this with your actual auth service or JWT decoding
    this.getCurrentUserId();

    if (this.userId) {
      this.loadOrders();

      // Optional: auto-refresh orders every 5 seconds
      setInterval(() => {
        this.loadOrders();
      }, 5000);
    }
  }

  /** Get the current user ID from auth system or token */
  private getCurrentUserId() {
    // Example: if using JWT in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // decode token to get userId, or use your auth service
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.id;
    } else {
      console.error('User not logged in or token missing');
    }
  }
goBack() {
    this.location.back();
  }
  /** Load all orders for the logged-in user */
  loadOrders() {
    if (!this.userId) return;

    this.http.get<Order[]>(`https://luxuria-backend-v5u9.onrender.com/api/order/orders/${this.userId}`).subscribe({
      next: (data) => {
        this.orders = data;
        this.calculateTotal();
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  /** Calculate total order amount */
  calculateTotal() {
    this.totalAmount = this.orders.reduce(
      (sum, order) => sum + order.quantity * order.price,
      0
    );
  }
}
