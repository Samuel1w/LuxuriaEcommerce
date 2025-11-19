import { Component, OnInit } from '@angular/core';
import { ProService, Product } from '../../pro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = ['All categories', 'Women', 'Men', 'Home', 'Electronics', 'Beauty', 'Toys', 'Office'];
  searchQuery = '';
  selectedCategory = 'All categories';
  productForm: FormGroup;
  thumbnailFile: File | null = null;
  subimageFiles: File[] = [];
  loading = false;

  constructor(private productService: ProService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      store: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.searchQuery, this.selectedCategory).subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
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
  }
  onThumbnailSelected(event: any): void {
    this.thumbnailFile = event.target.files[0] || null;
  }

  onSubimagesSelected(event: any): void {
    this.subimageFiles = Array.from(event.target.files);
  }

 submitProduct(): void {
  if (this.productForm.invalid) return;

  const formData = new FormData();
  formData.append('title', this.productForm.value.title);
  formData.append('price', this.productForm.value.price.toString()); // ensure string
  formData.append('category', this.productForm.value.category);
  formData.append('store', this.productForm.value.store);

  if (this.thumbnailFile) formData.append('thumbnail', this.thumbnailFile);
  this.subimageFiles.forEach(file => formData.append('subimages', file)); // multiple files

  this.loading = true;

  this.productService.addProduct(formData).subscribe({
    next: (res: any) => {
      this.products.push(res); // push new product to list
      this.productForm.reset();
      this.thumbnailFile = null;
      this.subimageFiles = [];
      this.loading = false;
    },
    error: (err) => {
      console.error('Error adding product:', err);
      this.loading = false;
    }
  });
}

  deleteProduct(id: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.products = this.products.filter(p => p.id !== id),
      error: (err) => console.error(err)
    });
  }
}
