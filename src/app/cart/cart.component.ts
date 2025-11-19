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
  adminPhone = '237676516888'; // Replace with your WhatsApp number

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCart();
  }
getImageUrl(img: any): string {
  if (!img) return 'assets/placeholder.png';

  // 1️⃣ If DB returns full JSON string → parse it
  if (typeof img === 'string') {
    try {
      const parsed = JSON.parse(img);

      return (
        parsed.secure_url ||
        parsed.url ||
        'assets/placeholder.png'
      );

    } catch {
      // 2️⃣ If it is not JSON, assume it's already a URL
      return img.startsWith('http')
        ? img
        : 'assets/placeholder.png';
    }
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

  // Update main item quantity
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

  // Update sub-image quantity
  updateSubImageQuantity(item: CartItem, sub: SubImage, change: number) {
    const newQty = sub.quantity + change;
    if (newQty < 0) return;

    sub.quantity = newQty;
    this.calculateTotal();
  }

removeItem(itemId: number) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error("❌ No token found — user not logged in");
    alert("You must be logged in to remove items.");
    return;
  }

  this.http.delete(
    `${this.apiUrl}/${itemId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  ).subscribe({
    next: () => {
      this.cartItems = this.cartItems.filter(i => i.id !== itemId);
      this.calculateTotal();
    },
    error: (err) => {
      console.error('❌ Error removing item:', err);
      alert("Failed to remove item.");
    }
  });
}


sendToWhatsApp() {
  if (!this.cartItems || !this.cartItems.length) {
    alert('Cart is empty!');
    return;
  }

  const phoneNumber = '237676516888'; // Replace with your number including country code, e.g., 2376xxxxxxx
  const origin = window.location.origin;   // To generate product links dynamically

  // Build message text
  let message = '🛒 *My Cart Items:*\n\n';

  this.cartItems.forEach(item => {
    message += `*${item.title}*\n`;

    // Include sub-images with quantity > 0
    if (item.sub_images && item.sub_images.length) {
      item.sub_images
        .filter(img => img.quantity && img.quantity > 0)
        .forEach(img => {
          message += `- Sub Image: ${img.url} x${img.quantity}\n`;
        });
    }

    // Include main quantity if any
    if (item.quantity && item.quantity > 0) {
      message += `- Main Product: x${item.quantity}\n`;
    }

    // Include product page link
    message += `Product link: ${origin}/product/${item.product_id}\n\n`;
  });

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // Open WhatsApp
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(waUrl, '_blank');
}

  // Add this method inside CartComponent
getItemSubtotal(item: CartItem): number {
  return item.sub_images.reduce((sum, img) => sum + img.quantity * item.price, 0);
}


}
