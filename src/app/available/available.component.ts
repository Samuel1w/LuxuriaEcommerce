import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-available',
  imports: [CommonModule],
  templateUrl: './available.component.html',
  styleUrl: './available.component.css'
})
export class AvailableComponent {
allProducts = [
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod12.jpg',
    price: '25000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod13.jpg',
    price: '35000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod14.jpg',
    price: '500000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod15.jpg',
    price: '250000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod16.jpg',
    price: '40000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod17.jpeg',
    price: '15000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod18.jpeg',
    price: '34000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod19.jpeg',
    price: '20000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod20.jpg',
    price: '90000'
  },

  {
    title: 'Blue Football Sofa',
    img: 'assets/prod21.jpeg',
    price: '50000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod22.jpeg',
    price: '36000'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod24.jpeg',
    price: '60000'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod25.jpeg',
    price: '50000'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod26.jpeg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod27.jpeg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod28.jpeg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod29.jpeg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod30.jpeg'
  },
   {
    title: 'Blue Football Sofa',
    img: 'assets/prod31.jpeg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod32.jpeg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod34.jpeg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod35.jpeg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod36.jpeg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod37.jpeg'
  },
  {
    title: 'Blue Football Sofa',
    img: 'assets/prod38.jpg'
  },
  {
    title: 'Green Velvet Couch',
    img: 'assets/prod39.jpg'
  },
  {
    title: 'Cream Italian Sofa',
    img: 'assets/prod40.jpg'
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
