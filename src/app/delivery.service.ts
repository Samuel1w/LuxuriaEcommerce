import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl = 'http://localhost:5000/api/deliveries';

  constructor(private http: HttpClient) {}
  getPendingDeliveries(): Observable<any> { return this.http.get('/api/deliveries/pending'); }
getCompletedDeliveries(): Observable<any> { return this.http.get('/api/deliveries/completed'); }
markDeliveryDone(id: string): Observable<any> { return this.http.put(`/api/deliveries/${id}/done`, {}); }
getDeliveryItems(id: string): Observable<any> { return this.http.get(`/api/deliveries/${id}/items`); }


  getDeliveries(status?: string): Observable<any> {
    return this.http.get(this.baseUrl, { params: status ? { status } : {} });
  }

  addDelivery(delivery: any): Observable<any> {
    return this.http.post(this.baseUrl, delivery);
  }

  updateDelivery(id: string, delivery: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, delivery);
  }

  deleteDelivery(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
