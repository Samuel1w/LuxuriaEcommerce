import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BtsCrochetComponent } from '../bts-crochet/bts-crochet.component';


import { LearnComponent } from '../learn/learn.component';
import { TrackComponent } from '../track/track.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-lux-imports',
  imports: [HeaderComponent,
    CommonModule,
    FormsModule,
   
    ProductListComponent,
    BtsCrochetComponent,
    TrackComponent,
  LearnComponent],
  templateUrl: './lux-imports.component.html',
  styleUrl: './lux-imports.component.css'
})
export class LuxImportsComponent  implements OnInit {
  currentSlide = 0;
  intervalId: any;

  bgImages: string[] = [
    './assets/imports1.png',
    './assets/imports5.png',
   
  ];

  currentBgIndex = 0;
 
 ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentBgIndex = (this.currentBgIndex + 1) % this.bgImages.length;
    }, 5000);
  }

  selectBg(index: number) {
    this.currentBgIndex = index;
    clearInterval(this.intervalId);
    this.ngOnInit(); // restart auto-rotation
  }

activeSidebarTab: string = 'products'; // Default section
activeTab: string = 'preorder'; // Default sub-tab
tabPosition: number = 0;

selectSidebarTab(tab: string) {
  
  this.activeSidebarTab = tab;

  // Reset to default sub-tab if Products is clicked again
  if (tab === 'products') {
    this.activeTab = 'preorder';
    this.tabPosition = 0;
  }
}

selectTab(tab: string) {
  this.activeTab = tab;

  switch (tab) {
    case 'preorder': this.tabPosition = 0; break;
    case 'available': this.tabPosition = 100; break;
    case 'bts': this.tabPosition = 200; break;
  }
}

// Sidebar open state
  sidebarOpen = false;

 
  // Toggle sidebar open/close
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Close sidebar
  closeSidebar() {
    this.sidebarOpen = false;
  }
  

}
