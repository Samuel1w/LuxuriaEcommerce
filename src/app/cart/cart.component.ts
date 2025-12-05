import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

interface SubImage {
  url: string;
  quantity: number;
}

interface CartItem {
  id: number;
  product_id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  selected_image?: string;
  sub_images: SubImage[];
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  total = 0;
  apiUrl = 'https://luxuria-backend-v5u9.onrender.com/api/carty';
  adminPhone = '237676516888';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get<CartItem[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.cartItems = res;
        this.calculateTotal();
      },
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + this.getItemSubtotal(item), 0);
  }

  updateQuantity(item: CartItem, change: number) {
    const newQty = item.quantity + change;
    if (newQty < 1) return;

    this.http.put(`${this.apiUrl}/${item.id}`, { quantity: newQty }).subscribe({
      next: () => {
        item.quantity = newQty;
        this.calculateTotal();
      },
      error: (err) => console.error('Error updating quantity:', err)
    });
  }

  updateSubImageQuantity(item: CartItem, sub: SubImage, change: number) {
    const newQty = sub.quantity + change;
    if (newQty < 0) return;

    sub.quantity = newQty;
    this.calculateTotal();
  }

  removeItem(itemId: number) {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("No token found — user not logged in");
      alert("You must be logged in to remove items.");
      return;
    }

    this.http.delete(`${this.apiUrl}/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.id !== itemId);
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error removing item:', err);
        alert("Failed to remove item.");
      }
    });
  }

  getImageUrl(img: any): string {
    if (!img) return 'assets/placeholder.png';

    if (typeof img === 'string') {
      try {
        const parsed = JSON.parse(img);
        return parsed.secure_url || parsed.url || 'assets/placeholder.png';
      } catch {
        return img.startsWith('http') ? img : 'assets/placeholder.png';
      }
    }

    return img.secure_url || img.url || 'assets/placeholder.png';
  }

 sendToWhatsApp() {
  if (!this.cartItems || !this.cartItems.length) {
    alert('Cart is empty!');
    return;
  }

  const phoneNumber = this.adminPhone;
  const origin = window.location.origin;

  let message = "Hello, I would like to place an order 😊\n\n";

  this.cartItems.forEach(item => {
    message += `*Product:* ${item.title}\n`;

    let count = 1;

    // SUB IMAGES
    if (item.sub_images && item.sub_images.length) {
      item.sub_images
        .filter(img => img.quantity > 0)
        .forEach(img => {
          const realUrl =
            img.secure_url ||
            img.url?.secure_url ||
            img.url?.url ||
            img.url ||
            "Image unavailable";

          message += `${count}) ${img.quantity} of this sub image 👉 ${realUrl}\n`;
          count++;
        });
    }

    // MAIN PRODUCT
    if (item.quantity > 0) {
      message += `${count}) ${item.quantity} main product\n`;
    }

    // PRODUCT LINK
    message += `Product link: ${origin}/product/${item.product_id}\n\n`;
  });

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(waUrl, '_blank');
}

  getItemSubtotal(item: CartItem): number {
    return item.sub_images.reduce((sum, img) => sum + img.quantity * item.price, 0);
  }
}
