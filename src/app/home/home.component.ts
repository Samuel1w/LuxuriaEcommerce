import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Blog, BlogService } from '../blog.service';

interface Empire {
  id: number;
  title: string;
  image_url: string;
}
@Component({
  selector: 'app-home',
  imports: [HeaderComponent,RouterModule,CommonModule,FormsModule,FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
blogs: Blog[] = [];
    loading = true;
    error: string | null = null;
  
  isPaused = false;

  galleryImages = [
    'assets/instagram.png', 'assets/tiktok.png', 'assets/social.png',
    'assets/youtube.png', 'assets/linkedin.png', 'assets/facebook.png',
    
  ];


  testimonials = [
    { name: 'Jane Doe', message: 'Luxuria Empire is unmatched in excellence!' },
    { name: 'John Smith', message: 'Their dedication and vision are inspiring.' },
    { name: 'Mary Johnson', message: 'Truly a world-class experience.' }
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
    { icon: 'fas fa-users', count: 250, label: 'Happy Customers' },
    { icon: 'fas fa-gem', count: 3, label: 'Awards & Recognitions' },
    { icon: 'fas fa-music', count: 4, label: 'Music Lessons Completed' }
  ];
  subscriberEmail: string = '';

  hoveredEvent: any = null;

  visibleImages: string[] = [];
  currentIndex: number = 0;
  imagesPerView: number = 4;

 

  // Scroll to section
  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

 empireItems: Empire[] = [];
  baseUrl = 'http://localhost:5000/api/empire';



  constructor(private http: HttpClient,private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.fetchEmpire();
       this.updateVisibleImages();
       this.blogService.getBlogs().subscribe({
        next: (res: Blog[]) => {
          this.blogs = res;
          this.loading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.error = 'Failed to load blogs';
          this.loading = false;
        }
      });
  }

  fetchEmpire() {
    this.http.get<Empire[]>(this.baseUrl).subscribe({
      next: res => this.empireItems = res,
      error: err => console.error(err)
    });
  }

  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
  }

  
 
  
   
   
     goToBlog(id:number | undefined){
      if(id === undefined) return;
      console.log('Navigating to blog id:', id);
      this.router.navigate(['/blogdet', id]);
  
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
