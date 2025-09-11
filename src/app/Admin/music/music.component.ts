
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Booking {
  id: number;
  name: string;
  email: string;
  class_type: string;
  message: string;
  created_at: string;
}

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  bookings: Booking[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  editingBooking: Booking | null = null;

  newBooking: Booking = {
    id: 0,
    name: '',
    email: '',
    class_type: '',
    message: '',
    created_at: ''
  };

  baseUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
  this.http.get<Booking[]>(this.baseUrl)
    .subscribe({
      next: res => {
        this.bookings = res;  // backend returns an array directly
        this.currentPage = 1; // no pagination
        this.totalPages = 1;
      },
      error: err => console.error('Error fetching bookings:', err)
    });
}


  addBooking() {
    if (!this.newBooking.name || !this.newBooking.email || !this.newBooking.class_type) {
      alert('Name, email, and class type are required');
      return;
    }

    this.http.post<Booking>(this.baseUrl, this.newBooking)
      .subscribe({
        next: res => {
          alert('Booking added successfully!');
          this.resetNewBooking();
          this.fetchBookings();
        },
        error: err => console.error('Add booking error:', err)
      });
  }

  editBooking(booking: Booking) {
    this.editingBooking = { ...booking };
  }

  updateBooking() {
    if (!this.editingBooking) return;

    this.http.put<Booking>(`${this.baseUrl}/${this.editingBooking.id}`, this.editingBooking)
      .subscribe({
        next: res => {
          alert('Booking updated!');
          this.editingBooking = null;
          this.fetchBookings();
        },
        error: err => console.error('Update booking error:', err)
      });
  }

  deleteBooking(id: number) {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`)
      .subscribe({
        next: res => {
          alert(res.message);
          this.fetchBookings();
        },
        error: err => console.error('Delete booking error:', err)
      });
  }

 

  resetNewBooking() {
    this.newBooking = { id: 0, name: '', email: '', class_type: '', message: '', created_at: '' };
  }

  cancelEdit() {
    this.editingBooking = null;
  }

}
