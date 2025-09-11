import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehindService, Behind } from '../behind.service';

@Component({
  selector: 'app-bts-crochet',
  imports: [CommonModule],
  templateUrl: './bts-crochet.component.html',
  styleUrls: ['./bts-crochet.component.css'],
  standalone: true,
})
export class BtsCrochetComponent implements OnInit, OnChanges {
  @Input() type: 'imports' | 'craft' = 'imports';  // default type
  items: Behind[] = [];
  baseUrl = 'http://localhost:5000'; // for building video URL

  loading = false;
  error: string | null = null;

  constructor(private behindService: BehindService) {}

  ngOnInit(): void {
    // ✅ Ensure it loads at component startup
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type'] && !changes['type'].firstChange) {
      this.load();
    }
  }

  load() {
    this.loading = true;
    this.error = null;

    this.behindService.getByType(this.type).subscribe({
      next: (res) => {
        this.items = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Could not load videos';
        this.loading = false;
        console.error('❌ Error loading behind-the-scenes:', err);
      }
    });
  }

  // Helper to safely build video URL
  getVideoUrl(path: string): string {
    return path.startsWith('http')
      ? path
      : `${this.baseUrl}${path}`;
  }
}
