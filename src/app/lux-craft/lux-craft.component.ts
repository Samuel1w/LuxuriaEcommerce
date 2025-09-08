import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductListComponent } from '../product-list/product-list.component';
import { BtsCrochetComponent } from '../bts-crochet/bts-crochet.component';


@Component({
  selector: 'app-lux-craft',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    
    ProductListComponent,
    BtsCrochetComponent
    // ✅ Add BTS Component to imports
  ],
  templateUrl: './lux-craft.component.html',
  styleUrl: './lux-craft.component.css'
})
export class LuxCraftComponent implements OnInit {
  currentSlide = 0;
  intervalId: any;

  bgImages: string[] = [
    './assets/crochet4.png',
   
    './assets/luxCrochet1.png',
    
    
    
  ];

  currentBgIndex = 0;
  activeTab: string = 'preorder';
  tabPosition = 150;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentBgIndex = (this.currentBgIndex + 1) % this.bgImages.length;
    }, 5000);
  }

  selectBg(index: number) {
    this.currentBgIndex = index;
    clearInterval(this.intervalId);
    this.ngOnInit(); // restart auto-rotation
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    const tabIndexMap: any = { preorder: 150, available: 620, bts: 1050 };
    this.tabPosition = tabIndexMap[tab] ?? 150;
  }
 

}
