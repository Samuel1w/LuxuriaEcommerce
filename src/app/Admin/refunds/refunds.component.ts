
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refunds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.css']
})
export class RefundsComponent implements OnInit {

  pendingRefunds: any[] = [];
  completedRefunds: any[] = [];

  ngOnInit(): void {
    // Dummy data for demo; replace with backend call
    this.pendingRefunds = [
      {
        trackingNumber: 'LUX-1001',
        customerName: 'Alice',
        number: '673123456',
        reason: 'Wrong item delivered',
        amount: 15000,
        dateRequested: new Date('2025-06-18')
      },
      {
        trackingNumber: 'LUX-1002',
        customerName: 'Bob',
        number: '673654321',
        reason: 'Damaged item',
        amount: 8000,
        dateRequested: new Date('2025-06-20')
      }
    ];

    this.completedRefunds = [];
  }

  markRefundDone(refund: any) {
    this.pendingRefunds = this.pendingRefunds.filter(r => r.trackingNumber !== refund.trackingNumber);
    this.completedRefunds.push({ ...refund, status: 'Completed' });
  }

  openWhatsApp(number: string) {
    window.open(`https://wa.me/${number}`, '_blank');
  }

}
