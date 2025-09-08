import { Component } from '@angular/core';
import { MusicService } from '../../music.service';

@Component({
  selector: 'app-tech',
  imports: [],
  templateUrl: './tech.component.html',
  styleUrl: './tech.component.css'
})
export class TechComponent {
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
