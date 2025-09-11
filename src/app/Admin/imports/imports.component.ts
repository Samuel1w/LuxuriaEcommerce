import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Student {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  interest: string;
  preferred_time: string;
  date_registered: string;
}

@Component({
  selector: 'app-imports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.css']
})
export class ImportsComponent implements OnInit {

  students: Student[] = [];
  editingStudent: Student | null = null;

  newStudent: Student = {
    id: 0,
    full_name: '',
    email: '',
    phone: '',
    interest: '',
    preferred_time: '',
    date_registered: ''
  };

  baseUrl = 'http://localhost:5000/api/students';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<Student[]>(this.baseUrl)
      .subscribe({
        next: res => this.students = res,
        error: err => console.error('Error fetching students:', err)
      });
  }
 

  addStudent() {
    if (!this.newStudent.full_name || !this.newStudent.email || !this.newStudent.interest) {
      alert('Full name, email, and interest are required');
      return;
    }

    this.http.post<Student>(this.baseUrl, this.newStudent)
      .subscribe({
        next: res => {
          alert('Student added successfully!');
          this.resetNewStudent();
          this.fetchStudents();
        },
        error: err => console.error('Add student error:', err)
      });
  }

  editStudent(student: Student) {
    this.editingStudent = { ...student };
  }

  updateStudent() {
    if (!this.editingStudent) return;

    this.http.put<Student>(`${this.baseUrl}/${this.editingStudent.id}`, this.editingStudent)
      .subscribe({
        next: res => {
          alert('Student updated!');
          this.editingStudent = null;
          this.fetchStudents();
        },
        error: err => console.error('Update student error:', err)
      });
  }

  deleteStudent(id: number) {
    if (!confirm('Are you sure you want to delete this student?')) return;

    this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`)
      .subscribe({
        next: res => {
          alert(res.message);
          this.fetchStudents();
        },
        error: err => console.error('Delete student error:', err)
      });
  }

  resetNewStudent() {
    this.newStudent = { id: 0, full_name: '', email: '', phone: '', interest: '', preferred_time: '', date_registered: '' };
  }

  cancelEdit() {
    this.editingStudent = null;
  }
}
