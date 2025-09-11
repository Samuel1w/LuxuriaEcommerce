import { Component} from '@angular/core';
import { ProductService, Product } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-product-details',
   imports: [FormsModule,CommonModule,RouterModule, FooterComponent,HeaderComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
product!: Product;
mainImage!: string;
constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id')!;
  this.productService.getProductById(id).subscribe(data => {
    this.product = data;
    this.mainImage = data.image_url; // default main image
  });
}

setMainImage(img: string) {
  this.mainImage = img;
}

}
