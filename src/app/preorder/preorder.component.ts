import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preorder',
  imports: [CommonModule,FormsModule],
  templateUrl: './preorder.component.html',
  styleUrl: './preorder.component.css'
})
export class PreorderComponent {
  allProducts = [
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod1.jpg',
    price: '25000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod2.jpg',
    price: '35000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod3.jpg',
    price: '500000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod4.jpg',
    price: '250000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod5.jpg',
    price: '40000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod6.jpg',
    price: '15000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod7.jpg',
    price: '34000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod8.jpg',
    price: '20000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod9.jpg',
    price: '90000'
  },

  {
    title: 'Blue Football Sofa',
    img: 'assets/prod10.jpg',
    price: '50000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod22.jpg',
    price: '36000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod11.jpg',
    price: '60000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod12.jpg',
    price: '50000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod13.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod14.jpg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod15.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod16.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod17.jpg'
  },
   {
    title: 'Blue Football Sofa',
    img: 'assets/prod18.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod19.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod20.jpg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod21.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod22.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod23.jpg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod24.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod25.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod26.jpg'
  },
    {
    title: 'Blue Football Sofa',
    img: 'assets/prod27.jpg',
    price: '25000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod28.jpg',
    price: '35000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod29.jpg',
    price: '500000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod30.jpg',
    price: '250000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod31.jpg',
    price: '40000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod32.jpg',
    price: '15000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod33.jpg',
    price: '34000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod34.jpg',
    price: '20000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod35.jpg',
    price: '90000'
  },

  {
    title: 'Blue Football Sofa',
    img: 'assets/prod36.jpg',
    price: '50000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod22.jpg',
    price: '36000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod11.jpg',
    price: '60000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod12.jpg',
    price: '50000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod13.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod14.jpg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod15.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod16.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod17.jpg'
  },
   {
    title: 'Blue Football Sofa',
    img: 'assets/prod18.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod19.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod20.jpg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod21.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod22.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod23.jpg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod24.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod25.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod26.jpg'
  }
  //
  // add as many as you want
];


  currentPage = 1;
  itemsPerPage = 12;

  get totalPages(): number {
    return Math.ceil(this.allProducts.length / this.itemsPerPage);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allProducts.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

}
