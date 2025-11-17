import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface cart {
  id: number;
  title: string;
  price: number;
  category: string;
  store: string;
  sold: number;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartyService {
 
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getProducts(query: string = '', category: string = ''): Observable<cart[]> {
    let params = new HttpParams();
    if (query) params = params.set('q', query);
    if (category && category !== 'All categories') params = params.set('category', category);
    return this.http.get<cart[]>(`${this.apiUrl}/cart`, { params });
  }

  addProduct(formData: FormData): Observable<cart> {
    return this.http.post<cart>(`${this.apiUrl}/adminCart/add`, formData);
  }

  deleteProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/adminCart/delete/${id}`);
  }
}
