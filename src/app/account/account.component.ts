import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [HeaderComponent,CommonModule,FooterComponent,RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get('https://luxuria-backend-v5u9.onrender.com/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => this.user = res,
      error: (err) => console.error('Failed to fetch user', err)
    });
  }
}
