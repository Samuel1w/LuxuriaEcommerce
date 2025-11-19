import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  store: string;
  sold: number;
  thumbnail: CloudinaryImage;
  subimages: CloudinaryImage[];
}



export interface CloudinaryImage {
  secure_url: string;
  url: string;
  public_id?: string;
  asset_id?: string;
  width?: number;
  height?: number;
  format?: string;
}



@Injectable({
  providedIn: 'root'
})
export class ProService {
  private apiUrl = 'https://luxuria-backend-v5u9.onrender.com/api';

  constructor(private http: HttpClient) {}

  getProducts(query: string = '', category: string = ''): Observable<Product[]> {
    let params = new HttpParams();
    if (query) params = params.set('q', query);
    if (category && category !== 'All categories') params = params.set('category', category);
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/admin/add`, formData);
  }

  deleteProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/admin/delete/${id}`);
  }
}

