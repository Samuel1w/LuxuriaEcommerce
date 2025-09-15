import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
export class LuxMusicComponent implements AfterViewInit, OnDestroy {
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

  currentSlide = 0;
  intervalId: any;

  ngAfterViewInit() {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    const slides = Array.from(track.children) as HTMLElement[];
    const prevButton = document.querySelector('.carousel-btn.prev') as HTMLElement;
    const nextButton = document.querySelector('.carousel-btn.next') as HTMLElement;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    };

    const nextSlide = () => {
      this.currentSlide = (this.currentSlide + 1) % slides.length;
      updateCarousel();
    };

    const prevSlide = () => {
      this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    };

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-play every 3000ms
    this.intervalId = setInterval(nextSlide, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


}


