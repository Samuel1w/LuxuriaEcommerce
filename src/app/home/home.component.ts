import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,RouterModule,CommonModule,FormsModule,FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isPaused = false;

  galleryImages = [
    'assets/prod20.jpg', 'assets/prod13.jpg', 'assets/prod18.jpg',
    'assets/prod17.jpg', 'assets/prod26.jpg', 'assets/prod33.jpg',
    'assets/prod51.jpg', 'assets/prod40.jpg', 'assets/prod36.jpg',
    'assets/prod43.jpg', 'assets/prod56.jpg', 'assets/prod49.jpg'
  ];

  
  blogs = [
  {
    title: 'The Rise of Luxuria Empire',
    excerpt: 'A look into how Luxuria started...',
    description: 'This article goes deeper into the foundation and vision of Luxuria Empire.',
    date: '2025-09-09',
    image: 'assets/importsLogo.jpeg',
    link: '/blog/1'
  },
  {
    title: 'Our Craft Journey',
    excerpt: 'How Luxuria Craft is shaping creativity...',
    description: 'Luxuria Craft is redefining artisan excellence through innovation.',
    date: '2025-08-25',
    image: 'assets/importsLogo.jpeg',
    link: '/blog/2'
  }
];


  socials = [
    { name: 'Facebook', image: 'assets/prod1.jpg', icon: 'fab fa-facebook-f' },
    { name: 'Instagram', image: 'assets/prod3.jpg', icon: 'fab fa-instagram' },
    { name: 'YouTube', image: 'assets/prod6.jpg', icon: 'fab fa-youtube' },
    { name: 'TikTok', image: 'assets/prod8.jpg', icon: 'fab fa-tiktok' },
    { name: 'WhatsApp', image: 'assets/prod10.jpg', icon: 'fab fa-whatsapp' }
  ];

  testimonials = [
    { name: 'Jane Doe', message: 'Luxuria Empire is unmatched in excellence!' },
    { name: 'John Smith', message: 'Their dedication and vision are inspiring.' },
    { name: 'Mary Johnson', message: 'Truly a world-class experience.' }
  ];

  featuredProducts = [
    { name: 'Lux Bag', description: 'Handcrafted elegance', image: 'assets/prod28.jpg' },
    { name: 'Tech Widget', description: 'Future ready', image: 'assets/prod29.jpg' },
    { name: 'Craft Jewelry', description: 'Luxury woven', image: 'assets/prod30.jpg' }
  ];

 upcomingEvents = [
  {
    title: 'Luxury Gala Night',
    date: new Date('2025-09-15'),
    image: 'assets/importsLogo.jpeg',
    description: 'An exclusive evening of glamour, networking, and entertainment.'
  },
  {
    title: 'Vendors Exhibition',
    date: new Date('2025-10-02'),
    image: 'assets/importsLogo.jpeg',
    description: 'Celebrating creativity and heritage with artists across the globe.'
  },
  {
    title: 'Business Leaders Summit',
    date: new Date('2025-11-10'),
    image: 'assets/importsLogo.jpeg',
    description: 'A gathering of top minds to discuss the future of luxury trade.'
  }
];

 milestones = [
    { icon: 'fas fa-box-open', count: 1200, label: 'Products Delivered' },
    { icon: 'fas fa-users', count: 850, label: 'Happy Customers' },
    { icon: 'fas fa-gem', count: 25, label: 'Awards & Recognitions' },
    { icon: 'fas fa-music', count: 500, label: 'Music Lessons Completed' }
  ];


 behindScenes = [
  {
    title: 'Tech Innovation Lab',
    description: 'Sneak peek into Luxuria’s cutting-edge technology projects.',
    type: 'image',
    image: 'assets/bts/tech-lab.jpg'
  },
  {
    title: 'Crochet Workshop',
    description: 'Behind the scenes of crafting elegant crochet designs.',
    type: 'video',
    video: 'assets/bts/crochet-workshop.mp4',
    image: '' // optional fallback
  },
  {
    title: 'Imports Showcase',
    description: 'A look into our premium import collections.',
    type: 'image',
    image: 'assets/bts/imports.jpg'
  },
  {
    title: 'Music Lessons',
    description: 'Experience the vibes of our musical instrument classes.',
    type: 'video',
    video: 'assets/bts/music-lesson.mp4',
    image: ''
  }
];


  subscriberEmail: string = '';

  hoveredEvent: any = null;

  visibleImages: string[] = [];
  currentIndex: number = 0;
  imagesPerView: number = 4;

  ngOnInit() {
    this.updateVisibleImages();
  }

  // Scroll to section
  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  // Pause/Resume gallery scroll
  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
  }

  // Open blog link
  goToBlog(link: string) {
    window.open(link, '_blank');
  }

  // Newsletter subscription
  subscribeNewsletter() {
    if(this.subscriberEmail) {
      alert(`Thank you for subscribing: ${this.subscriberEmail}`);
      this.subscriberEmail = '';
    }
  }

  // Event hover logic
  hoverEvent(event: any) {
    this.hoveredEvent = event;
    console.log(`Hovering over: ${event.title}`);
  }

  leaveEvent(event: any) {
    if (this.hoveredEvent === event) {
      this.hoveredEvent = null;
    }
    console.log(`Stopped hovering: ${event.title}`);
  }

  // Event details
  viewEventDetails(event: any) {
    alert(`Viewing details for: ${event.title}`);
  }

  // Gallery slideshow logic
  updateVisibleImages() {
    this.visibleImages = this.galleryImages.slice(this.currentIndex, this.currentIndex + this.imagesPerView);
  }

  nextSlide() {
    if (this.currentIndex + this.imagesPerView < this.galleryImages.length) {
      this.currentIndex++;
      this.updateVisibleImages();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleImages();
    }
  }

}
