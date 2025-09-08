import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryService } from '../../delivery.service';

@Component({
  selector: 'app-deliveries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  pendingDeliveries: any[] = [];
  completedDeliveries: any[] = [];
  selectedDelivery: any = null;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.fetchDeliveries();
  }

  // Fetch all pending and completed deliveries
  fetchDeliveries(): void {
    this.deliveryService.getPendingDeliveries().subscribe({
      next: (res: any) => this.pendingDeliveries = res,
      error: (err) => console.error('Error fetching pending deliveries', err)
    });

    this.deliveryService.getCompletedDeliveries().subscribe({
      next: (res: any) => this.completedDeliveries = res,
      error: (err) => console.error('Error fetching completed deliveries', err)
    });
  }

  // Mark a delivery as done
  markAsDone(delivery: any) {
    if(confirm(`Mark delivery ${delivery.trackingNumber} as done?`)) {
      this.deliveryService.markDeliveryDone(delivery.id).subscribe({
        next: () => this.fetchDeliveries(),
        error: (err) => console.error('Error marking delivery as done', err)
      });
      this.selectedDelivery = null;
    }
  }

  // View all items of a delivery
  viewItems(delivery: any) {
    this.deliveryService.getDeliveryItems(delivery.id).subscribe({
      next: (items: any) => this.selectedDelivery = { ...delivery, items },
      error: (err) => console.error('Error fetching delivery items', err)
    });
  }

  // Close the items view
  closeDetails() {
    this.selectedDelivery = null;
  }
}
