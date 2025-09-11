import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../product.service'; 

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct: any = { 
    name: '', 
    description: '', 
    price: '',           // ✅ string to prevent multer issues
    category: 'imports', 
    type: 'available', 
    file: null,          // main image
    subFiles: []         // multiple sub-images
  };
  editingProduct: any = null;
  currentPage: number = 1;
  totalPages: number = 1;

  categories = ['imports', 'craft'];
  types = ['available', 'preorder'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(page: number = 1): void {
    this.productService.getProducts({
      page: page,
      pageSize: 5,
      category: undefined,
      type: undefined
    }).subscribe((res: any) => {
      this.products = res.items;
      this.currentPage = res.page;
      this.totalPages = res.pages;
    });
  }

  addProduct(): void {
    const formData = new FormData();
    formData.append('name', this.newProduct.name || '');
    formData.append('description', this.newProduct.description || '');
    formData.append('price', this.newProduct.price?.toString() || '0'); // ✅ always string
    formData.append('category', this.newProduct.category || '');
    formData.append('type', this.newProduct.type || '');

    if (this.newProduct.file) {
      formData.append('image_url', this.newProduct.file);
    }

    if (this.newProduct.subFiles && this.newProduct.subFiles.length > 0) {
      this.newProduct.subFiles.forEach((file: File) => {
        formData.append('sub_images', file); // ✅ must match backend
      });
    }

    this.productService.addProduct(formData).subscribe({
      next: () => {
        this.resetNewProduct();
        this.fetchProducts();
      },
      error: err => console.error('Add Product Error:', err)
    });
  }

  updateProduct(): void {
    const formData = new FormData();
    formData.append('name', this.editingProduct.name || '');
    formData.append('description', this.editingProduct.description || '');
    formData.append('price', this.editingProduct.price?.toString() || '0');
    formData.append('category', this.editingProduct.category || '');
    formData.append('type', this.editingProduct.type || '');

    if (this.editingProduct.file) {
      formData.append('image_url', this.editingProduct.file);
    }

    if (this.editingProduct.subFiles && this.editingProduct.subFiles.length > 0) {
      this.editingProduct.subFiles.forEach((file: File) => {
        formData.append('sub_images', file);
      });
    }

    this.productService.updateProduct(this.editingProduct.id, formData).subscribe({
      next: () => {
        this.editingProduct = null;
        this.fetchProducts();
      },
      error: err => console.error('Update Product Error:', err)
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => this.fetchProducts());
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.fetchProducts(page);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.newProduct.file = input.files[0];
    }
  }

  onSubImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.newProduct.subFiles = Array.from(input.files);
    }
  }

  onEditFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.editingProduct.file = input.files[0];
    }
  }

  onEditSubImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.editingProduct.subFiles = Array.from(input.files);
    }
  }

  private resetNewProduct() {
    this.newProduct = { 
      name: '', 
      description: '', 
      price: '', 
      category: 'imports', 
      type: 'available', 
      file: null, 
      subFiles: [] 
    };
  }

  editProduct(product: any): void {
  this.editingProduct = { ...product, file: null, subFiles: [] };
}

}
