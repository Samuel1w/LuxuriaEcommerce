import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-lux-music',
  imports: [HeaderComponent,FooterComponent, FormsModule],
  templateUrl: './lux-music.component.html',
  styleUrls: ['./lux-music.component.css']

})
export class LuxMusicComponent {
  booking = {
    name: '',
    email: '',
    classType: '',
    message: ''
  };
  constructor(private http: HttpClient) {}
 submitBooking() {
    if (!this.booking.name || !this.booking.email || !this.booking.classType) {
      alert("Name, email, and class type are required");
      return;
    }

    this.http.post('http://localhost:5000/api/bookings', this.booking)
      .subscribe({
        next: res => alert("Booking successful!"),
        error: err => console.error("Booking error:", err)
      });
  }


}
