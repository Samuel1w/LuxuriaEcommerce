import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true, // This is now a standalone component
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  // Sidebar open state
  sidebarOpen = false;

  ngOnInit(): void {
    // No direct DOM manipulation needed here for toggle logic
    // The toggle will be handled via Angular bindings
  }

  // Toggle sidebar open/close
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Close sidebar
  closeSidebar() {
    this.sidebarOpen = false;
  }
}
