// src/app/services/finance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FinanceService {
  private baseUrl = 'http://localhost:5000/api/finance';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> { return this.http.get(this.baseUrl); }
  getByType(type: string): Observable<any> { return this.http.get(`${this.baseUrl}/type/${type}`); }
  add(record: any): Observable<any> { return this.http.post(this.baseUrl, record); }
  update(id: number, record: any): Observable<any> { return this.http.put(`${this.baseUrl}/${id}`, record); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.baseUrl}/${id}`); }
}
