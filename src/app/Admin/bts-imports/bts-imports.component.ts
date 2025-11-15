import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cart, CartyService } from '../../carty.service';

@Component({
  selector: 'app-bts-imports',
  imports:[FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './bts-imports.component.html',
  styleUrls: ['./bts-imports.component.css']
})
export class BtsImportsComponent implements OnInit {
  products: cart[] = [];
  categories: string[] = ['All categories','Women','Men','Kids','Home Decor','Bags','Jewelries','Potraits'];
  searchQuery = '';
  selectedCategory = 'All categories';
  productForm: FormGroup;
  selectedFile: File | null = null;
  loading = false;

  constructor(private productService: CartyService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      store: ['', Validators.required],
      thumbnail: [null]
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  submitProduct(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    formData.append('title', this.productForm.value.title);
    formData.append('price', this.productForm.value.price);
    formData.append('category', this.productForm.value.category);
    formData.append('store', this.productForm.value.store);
    if (this.selectedFile) formData.append('thumbnail', this.selectedFile);

    this.productService.addProduct(formData).subscribe({
      next: (res) => {
        this.products.push(res);
        this.productForm.reset();
        this.selectedFile = null;
      },
      error: (err) => console.error(err)
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
