import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  
   private baseUrl = `${environment.apiUrl}/api/refunds`;

  constructor(private http: HttpClient) {}

  getRefunds(status?: string): Observable<any> {
    return this.http.get(this.baseUrl, { params: status ? { status } : {} });
  }

  addRefund(refund: any): Observable<any> {
    return this.http.post(this.baseUrl, refund);
  }

  updateRefund(id: string, refund: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, refund);
  }

  deleteRefund(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
