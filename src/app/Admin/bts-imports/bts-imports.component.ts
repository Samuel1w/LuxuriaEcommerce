import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Empire {
  id: number;
  title: string;
  image_url: string;
  created_at: string;
}

@Component({
  selector: 'app-bts-imports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bts-imports.component.html',
  styleUrls: ['./bts-imports.component.css']
})
export class BtsImportsComponent implements OnInit {
  empireItems: Empire[] = [];
   // removed image_url, not needed
  newEmpire = { title: ''};

  baseUrl = 'http://localhost:5000/api/empire';

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEmpire();
  }

  fetchEmpire() {
    this.http.get<Empire[]>(this.baseUrl).subscribe({
      next: res => this.empireItems = res,
      error: err => console.error(err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addEmpire() {
    const formData = new FormData();
    formData.append('title', this.newEmpire.title);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post(this.baseUrl, formData).subscribe({
      next: () => {
        this.fetchEmpire(); // correct method name
        this.newEmpire = { title: '' };
        this.selectedFile = null;
      },
      error: err => console.error(err)
    });
  }

  deleteEmpire(id: number) {
    if (!confirm('Delete this showcase item?')) return;
    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => this.empireItems = this.empireItems.filter(e => e.id !== id),
      error: err => console.error(err)
    });
  }
}
