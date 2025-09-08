import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description:string;
  price: number;
  image_url: string;
  category: 'imports' | 'craft';
  type: 'preorder' | 'available';
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  /** Backend mode */
  getProducts(params: {
    category?: 'imports' | 'craft';
    type?: 'preorder' | 'available';
    page: number;
    pageSize: number;
  }): Observable<Paginated<Product>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('limit', params.pageSize);

    if (params.category) httpParams = httpParams.set('category', params.category);
    if (params.type) httpParams = httpParams.set('type', params.type);

    return this.http.get<Paginated<Product>>(this.base, { params: httpParams });
  }

  /** Example: details page */
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

/** ➕ Add new product with file upload */
addProduct(formData: FormData): Observable<any> {
  return this.http.post(this.base, formData); // remove <Product>
}

/** ✏ Update product with file upload */
updateProduct(id: string, formData: FormData): Observable<any> {
  return this.http.put(`${this.base}/${id}`, formData); // remove <Product>
}

  /** 🗑 Delete product */
  deleteProduct(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.base}/${id}`);
  }

 
}
