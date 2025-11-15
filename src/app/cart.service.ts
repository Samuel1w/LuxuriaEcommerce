import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private base = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders() {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  addToCart(productId: number, quantity: number, selectedImage: string): Observable<any> {
    return this.http.post(this.base, {
      product_id: productId,
      quantity,
      selected_image: selectedImage
    }, this.authHeaders());
  }
}
