import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../music.service';

@Component({
  selector: 'app-music',
  imports: [FormsModule,CommonModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  students: any[] = [];
    searchText: string = '';

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

   fetchStudents() {
    this.musicService.getStudents().subscribe({
      next: (res: any) => this.students = res,
      error: (err) => console.error(err)
    });
  }

  deleteStudent(id: number) {
    if(confirm('Are you sure you want to delete this student?')) {
      this.musicService.deleteStudent(id).subscribe(() => this.fetchStudents());
    }
  }
}
