
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehindService, Behind } from '../behind.service';

@Component({
  selector: 'app-bts-crochet',
  imports: [CommonModule],
  templateUrl: './bts-crochet.component.html',
  styleUrls: ['./bts-crochet.component.css'],
  standalone: true,
})
export class BtsCrochetComponent implements OnChanges {
  @Input() type: 'imports' | 'craft' = 'imports';
  items: Behind[] = [];
  baseUrl = 'http://localhost:5000'; // used to build full video URL

  loading = false;
  error: string | null = null;

  constructor(private behindService: BehindService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) this.load();
  }

  load() {
    this.loading = true;
    this.error = null;
    this.behindService.getByType(this.type).subscribe({
      next: res => { this.items = res; this.loading = false; },
      error: err => { this.error = 'Could not load videos'; this.loading = false; console.error(err); }
    });
  }
}
