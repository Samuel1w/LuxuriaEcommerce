import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[CommonModule,FooterComponent,HeaderComponent,FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  query = '';
  activeCategory = 'All categories';
  categories = ['All categories','Women','Men','Home','Electronics','Beauty','Toys','Office'];

  products: Product[] = [];
  filtered: Product[] = [];
   cartCount = 0;
  apiUrl = 'http://localhost:5000/api/carty';

 
   constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCartCount();
    
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  if (ref) {
    this.http.post('https://luxuria-backend-v5u9.onrender.com/api/dm/click', { referral_code: ref, url: window.location.href })
      .subscribe();
  
}

  }
    goToLogin() {
    this.router.navigate(['/login']);
  }
  addToCart(product: any) {
  console.log('Added to cart:', product);
  // Here you can integrate your cart logic
  alert(`${product.title} added to cart!`);
}
 // Method to generate WhatsApp link
  whatsappLink(product: any): string {
    const text = `I am interested in ${product.title} priced at ${product.price} FRS`;
    return `https://wa.me/676516888?text=${encodeURIComponent(text)}`;
  }


  loadProducts() {
    this.http.get<Product[]>('https://luxuria-backend-v5u9.onrender.com/api/products')
      .subscribe(data => {
        this.products = data;
        this.filtered = data;
      });
  }

  search() {
    const q = this.query.trim();
    this.http.get<Product[]>(`https://luxuria-backend-v5u9.onrender.com/api/products?q=${q}`)
      .subscribe(data => this.filtered = data);
  }

  selectCategory(cat: string) {
    this.activeCategory = cat;
    const url = `https://luxuria-backend-v5u9.onrender.com/api/products?category=${cat}`;
    this.http.get<Product[]>(url).subscribe(data => this.filtered = data);
  }



  viewProduct(p:Product){
    alert('Open product detail: ' + p.title);
  }

  // keyboard shortcut: press / to focus search
  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent){
    if(event.key === '/'){
      event.preventDefault();
      const el = document.querySelector('.search-input') as HTMLInputElement;
      if(el) el.focus();
    }
  }
  ngAfterViewInit() {
  const images = document.querySelectorAll('.carousel-inner img');
  const prev = document.querySelector('.carousel-btn.prev') as HTMLElement;
  const next = document.querySelector('.carousel-btn.next') as HTMLElement;
  const lightbox = document.getElementById('lightbox')!;
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const closeBtn = document.querySelector('.lightbox .close') as HTMLElement;

  let current = 0;
  const total = images.length;

  function showImage(index: number) {
    images.forEach((img, i) => img.classList.toggle('active', i === index));
  }

  function nextImage() {
    current = (current + 1) % total;
    showImage(current);
  }

  function prevImage() {
    current = (current - 1 + total) % total;
    showImage(current);
  }

  next.onclick = nextImage;
  prev.onclick = prevImage;

  // Auto-slide every 3s
  setInterval(nextImage, 3000);

  // Lightbox open
  images.forEach((img) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.getAttribute('src')!;
    });
  });

  // Lightbox close
  closeBtn.onclick = () => (lightbox.style.display = 'none');
  lightbox.onclick = (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  };
}
 goToCart() {
    this.router.navigate(['/cart']);
  }
  goToUser() {
    this.router.navigate(['/acc']);
  }

  loadCartCount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.cartCount = 0;
      return;
    }

    this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: (res) => {
        this.cartCount = res.reduce((sum, item) => sum + item.quantity, 0);
      },
      error: (err) => console.error('Error fetching cart count:', err),
    });
  }

}


