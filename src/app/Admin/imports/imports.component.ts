import { Component, OnInit } from '@angular/core';
import { ImportService } from '../../import.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imports',
  imports: [CommonModule,FormsModule],
  templateUrl: './imports.component.html',
  styleUrl: './imports.component.css'
})
export class ImportsComponent implements OnInit {
  students: any[] = [];
    searchText: string = '';

  constructor(private studentService: ImportService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

   fetchStudents() {
    this.studentService.getStudents().subscribe({
      next: (res: any) => this.students = res,
      error: (err) => console.error(err)
    });
  }

  deleteStudent(id: number) {
    if(confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => this.fetchStudents());
    }
  }
}
