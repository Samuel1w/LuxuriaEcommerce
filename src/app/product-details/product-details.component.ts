import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../auth.service'; 
import { CartService } from '../cart.service'; 


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FooterComponent, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  selectedImage: string | null = null;
  allImages: string[] = [];
  showLoginModal = false;
  loginEmail = '';
  loginPassword = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:5000/api/admin/${id}`).subscribe({
      next: (data: any) => {
        this.product = data;
        const subImages = Array.isArray(data.subimages) ? data.subimages : [];
        this.allImages = [data.thumbnail, ...subImages].filter(Boolean);
        this.selectedImage = this.allImages[0];
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }

  goBack() {
    this.location.back();
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  addToCart(product: any) {
    const token = localStorage.getItem('token');

    if (!token) {
      this.showLoginModal = true;
      return;
    }

    const cartData = {
      product_id: product.id,
      selected_image: this.selectedImage || product.thumbnail,
      quantity: this.quantity,
    };

    this.http.post('http://localhost:5000/api/carty', cartData, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: () => alert(`${product.title} added to cart!`),
      error: (err) => console.error('Error adding to cart:', err),
    });
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  loginUser() {
    this.http.post('http://localhost:5000/api/auth/login', {
      email: this.loginEmail,
      password: this.loginPassword,
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        alert('Login successful!');
        this.showLoginModal = false;
      },
      error: (err) => alert('Invalid credentials.'),
    });
  }

  registerUser() {
    this.http.post('http://localhost:5000/api/auth/register', {
      email: this.loginEmail,
      password: this.loginPassword,
    }).subscribe({
      next: () => alert('Registration successful! You can now log in.'),
      error: (err) => alert('Error registering user.'),
    });
  }
}

