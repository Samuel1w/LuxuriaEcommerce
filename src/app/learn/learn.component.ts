import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent {
  registrationForm: FormGroup;
  isSubmitted = false;
  baseUrl = 'http://localhost:5000/api/students'; // backend endpoint

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      interest: ['', Validators.required],
      preferredTime: ['', Validators.required]
    });
  }

  submitForm() {
    this.isSubmitted = true;

    if (this.registrationForm.valid) {
      this.http.post(this.baseUrl, this.registrationForm.value)
        .subscribe({
          next: (res) => {
            alert('Registration submitted successfully! We will contact you shortly.');
            this.registrationForm.reset();
            this.isSubmitted = false;
          },
          error: (err) => {
            console.error('Registration error:', err);
            alert('Something went wrong. Please try again later.');
          }
        });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  joinWhatsAppCommunity() {
    window.open('https://wa.me/237676516888?text=Hello%20Luxuria_Imports%2C%20I%27m%20interested%20in%20learning%20importation!', '_blank');
  }
}
