import { Component, HostListener, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { cart } from '../carty.service';

@Component({
  selector: 'app-lux-craft',
  imports:[CommonModule,FooterComponent,HeaderComponent,FormsModule,RouterModule],
  templateUrl: './lux-craft.component.html',
  styleUrls: ['./lux-craft.component.css']
})
export class LuxCraftComponent implements OnInit{
  query = '';
  activeCategory = 'All categories';
  categories = ['All categories','Women','Men','Kids','Home Decor','Bags','Jewelries','Potraits'];

  products: cart[] = [];
  filtered: cart[] = [];

   constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
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
    this.http.get<cart[]>('https://luxuria-backend-v5u9.onrender.com/api/cart')
      .subscribe(data => {
        this.products = data;
        this.filtered = data;
      });
  }

  search() {
    const q = this.query.trim();
    this.http.get<cart[]>(`https://luxuria-backend-v5u9.onrender.com/api/cart?q=${q}`)
      .subscribe(data => this.filtered = data);
  }

  selectCategory(cart: string) {
    this.activeCategory = cart;
    const url = `https://luxuria-backend-v5u9.onrender.com/api/cart?category=${cart}`;
    this.http.get<cart[]>(url).subscribe(data => this.filtered = data);
  }



  viewProduct(p:cart){
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

}
