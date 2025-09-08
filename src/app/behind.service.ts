// src/app/behind.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Behind {
  id: number;
  title: string;
  description?: string;
  video_url: string;
  type: 'imports' | 'craft';
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class BehindService {
  private base = 'http://localhost:5000/api/behind';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Behind[]> {
    return this.http.get<Behind[]>(this.base);
  }

  getByType(type: 'imports'|'craft'): Observable<Behind[]> {
    return this.http.get<Behind[]>(`${this.base}/type/${type}`);
  }

  getById(id: number): Observable<Behind> {
    return this.http.get<Behind>(`${this.base}/${id}`);
  }

  // add: accepts FormData (file upload) or a normal object (video_url string)
  addBehind(formData: FormData | any): Observable<Behind> {
    if (formData instanceof FormData) {
      return this.http.post<Behind>(this.base, formData);
    } else {
      return this.http.post<Behind>(this.base, formData);
    }
  }

  updateBehind(id: number, formData: FormData | any): Observable<Behind> {
    return this.http.put<Behind>(`${this.base}/${id}`, formData);
  }

  deleteBehind(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
