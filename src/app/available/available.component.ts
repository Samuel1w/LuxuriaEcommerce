import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available',
  imports: [CommonModule],
  templateUrl: './available.component.html',
  styleUrl: './available.component.css'
})
export class AvailableComponent  implements OnInit {

  offers = [
    {
      title: 'Handcrafted Royal Crochet',
      description: 'Elegant handmade pieces at 30% off.',
      image: 'assets/Dana B.jpg',
      type: 'Crafted',
      endDate: new Date().getTime() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
      remainingTime: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    },
    {
      title: 'Imported Luxury Handbag',
      description: 'Exclusive deal on royal imported goods.',
      image: 'assets/bag.JPG',
      type: 'Imported',
      endDate: new Date().getTime() + 5 * 60 * 60 * 1000, // 5 hrs from now
      remainingTime: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    },
    {
      title: 'Tech Masterclass Discount',
      description: 'Get 40% off on coding and tech training.',
      image: 'assets/kids.jpeg',
      type: 'Tech',
      endDate: new Date().getTime() + 1 * 24 * 60 * 60 * 1000, // 1 day
      remainingTime: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    },
    {
      title: 'Music Lessons Promo',
      description: 'Enroll today & enjoy 25% discount on classes.',
      image: 'assets/mus4.jpeg',
      type: 'Music',
      endDate: new Date().getTime() + 12 * 60 * 60 * 1000, // 12 hrs
      remainingTime: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.updateCountdowns();
    }, 1000);
  }

  updateCountdowns() {
    const now = new Date().getTime();
    this.offers.forEach(offer => {
      const distance = offer.endDate - now;

      if (distance > 0) {
        offer.remainingTime.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        offer.remainingTime.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        offer.remainingTime.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        offer.remainingTime.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      } else {
        offer.remainingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    });
  }
}



