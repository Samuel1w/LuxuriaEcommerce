// admin-dm.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Marketer {
  id: number;
  name: string;
  email: string;
  referral_code: string;
  approved: boolean;
  created_at: string;
}

interface DMOrder {
  dm_order_id: number;
  marketer_name: string;
  referral_code: string;
  order_id: number;
  user_name: string;
  product_title: string;
  product_price: number;
  commission: number;
  verified: boolean;
  created_at: string;
}

@Component({
  selector: 'app-payments',
  imports: [CommonModule,FormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  marketers: Marketer[] = [];
  dmOrders: DMOrder[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMarketers();
    this.loadDMOrders();
  }

  loadMarketers() {
    this.http.get<Marketer[]>('http://localhost:5000/api/adm/digital-marketers').subscribe(data => this.marketers = data);
  }

  approveMarketer(marketerId: number, approved: boolean) {
    this.http.patch(`/api/admin/digital-marketers/${marketerId}`, { approved })
      .subscribe(() => this.loadMarketers());
  }

  loadDMOrders() {
    this.http.get<DMOrder[]>('http://localhost:5000/api/adm/dm-orders').subscribe(data => this.dmOrders = data);
  }

  verifyOrder(dmOrderId: number, verified: boolean) {
    this.http.patch(`http://localhost:5000/api/adm/dm-orders/${dmOrderId}`, { verified })
      .subscribe(() => this.loadDMOrders());
  }
}
