import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product: any; // product passed from parent (list or router)

  addToCart(product: any) {
    console.log('Added to cart:', product);
    // TODO: integrate with cart service
  }

  preOrder(product: any) {
    console.log('Pre-ordered:', product);
    // TODO: connect to pre-order backend
  }
}
