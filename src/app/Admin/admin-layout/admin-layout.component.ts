import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  /** Mobile/Tablet off-canvas state */
  sidebarOpen = false;

  constructor(private router: Router) {
    // Close sidebar after route change (mobile UX)
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.closeSidebar());
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    document.body.style.overflow = this.sidebarOpen ? 'hidden' : '';
  }

  closeSidebar(): void {
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.closeSidebar();
  }
}
