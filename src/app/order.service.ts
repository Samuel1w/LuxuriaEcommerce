import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // adjust if needed

  private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  // Get all orders (optional, for admin page)
  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // **New method:** Get orders by tracking number
  getOrdersByTracking(trackingNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/track/${trackingNumber}`);
  }

  addOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  updateOrder(id: string, order: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Optional: submit delivery
  submitDelivery(delivery: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/delivery`, delivery);
  }

  // Optional: submit refund
  submitRefund(refund: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/refund`, refund);
  }
}
