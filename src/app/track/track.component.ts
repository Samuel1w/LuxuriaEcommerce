
import { OrderService } from '../order.service';// adjust path


  import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {

  constructor(private orderService: OrderService) {}
  trackingNumber: string = '';
  userOrders: any[] | null = null;

  showRefundForm = false;
  showDeliveryForm = false;
  showConfirmation = false;

  deliveryForm = {
    name: '',
    number: '',
    trackingNumber: '',
    locationType: '',
    exactLocation: '',
    town: '',
    agency: '',
    agreeToPay: false
  };

  refundForm = {
    name: '',
    number: '',
    trackingNumber: '',
    reason: ''
  };

  statusSummary: any[] = [];


  

trackOrder() {
  if (!this.trackingNumber) return;

  this.orderService.getOrdersByTracking(this.trackingNumber).subscribe({
    next: (orders) => {
      if (!orders || orders.length === 0) {
        alert('No orders found for this tracking number.');
        this.userOrders = null;
        this.statusSummary = [];
      } else {
        this.userOrders = orders;
        const statuses = ['Pending', 'Shipped', 'Arrived', 'Delivered'];
        this.statusSummary = statuses.map(label => ({
          label,
          count: this.userOrders!.filter(o => o.status === label).length
        }));
      }
    },
    error: (err) => console.error(err)
  });
}


  openDeliveryForm(order: any) {
    this.deliveryForm = { ...order, locationType: '', exactLocation: '', town: '', agency: '', agreeToPay: false };
    this.showDeliveryForm = true;
    this.showRefundForm = false;
  }

  openRefundForm(order: any) {
    this.refundForm = { ...order, reason: '' };
    this.showRefundForm = true;
    this.showDeliveryForm = false;
  }

 submitDeliveryForm() {
  this.orderService.submitDelivery(this.deliveryForm).subscribe({
    next: (res) => {
      alert('Delivery submitted successfully!');
      this.showDeliveryForm = false;
      this.showConfirmation = true;
      this.trackOrder(); // refresh orders from backend
    },
    error: (err) => console.error(err)
  });
}

submitRefundForm() {
  this.orderService.submitRefund(this.refundForm).subscribe({
    next: (res) => {
      alert('Refund request submitted successfully!');
      this.showRefundForm = false;
      this.showConfirmation = true;
      this.trackOrder(); // refresh orders from backend
    },
    error: (err) => console.error(err)
  });
}


  closeConfirmation() {
    this.showConfirmation = false;
  }
}
