import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  date_published?: string; // optional because DB may auto-generate it
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:5000/api/blogs'; // adjust if backend runs elsewhere

  constructor(private http: HttpClient) {}

  // ✅ Get all blogs
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  // ✅ Get blog by ID
  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

 addBlog(blogData: FormData): Observable<Blog> {
  return this.http.post<Blog>(this.apiUrl, blogData);
}

updateBlog(id: number, blogData: FormData): Observable<Blog> {
  return this.http.put<Blog>(`${this.apiUrl}/${id}`, blogData);
}


  // ✅ Delete a blog
  deleteBlog(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
