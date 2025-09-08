import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  orders: any[] = [];
  
  newOrder: any = { 
    name: '', 
    phone: '', 
    amount: null, 
    numItems: null, 
    category: '', 
    type: '', 
    status: 'Pending' 
  };
  
  editingOrder: any = null;
  statuses = ['Pending', 'Shipped', 'Arrived', 'Delivered'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch all orders
  fetchOrders(): void {
    this.orderService.getOrders().subscribe((res: any) => {
      this.orders = res;
    });
  }

  // Add a new order
  addOrder(): void {
    // Auto-generate tracking number
    this.newOrder.trackingNumber = 'LUX-' + Math.floor(1000 + Math.random() * 9000);

    this.orderService.addOrder(this.newOrder).subscribe((addedOrder: any) => {
      this.orders.unshift(addedOrder);  // Add to top of the list
      // Reset form
      this.newOrder = { name: '', phone: '', amount: null, numItems: null, category: '', type: '', status: 'Pending' };
    });
  }

  // Begin editing
  editOrder(order: any) {
    this.editingOrder = { ...order };
  }

  // Update order
  updateOrder() {
    this.orderService.updateOrder(this.editingOrder.id, this.editingOrder).subscribe((updatedOrder: any) => {
      const index = this.orders.findIndex(o => o.id === updatedOrder.id);
      if (index > -1) this.orders[index] = updatedOrder;
      this.editingOrder = null;
    });
  }

  // Delete order
  deleteOrder(id: string) {
    if(confirm('Delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.orders = this.orders.filter(o => o.id !== id);
      });
    }
  }

  // Change status
  changeStatus(order: any, status: string) {
    order.status = status;
    this.updateOrder();
  }

  // Format date
  formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString();  // e.g., "8/31/2025, 5:00:00 PM"
  }
}
