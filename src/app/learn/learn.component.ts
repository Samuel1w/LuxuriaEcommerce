import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-learn',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent {
 registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
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
      console.log('Registration Data:', this.registrationForm.value);
      alert('Registration submitted successfully! We will contact you shortly.');
      this.registrationForm.reset();
      this.isSubmitted = false;
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  joinWhatsAppCommunity() {
    window.open('https://wa.me/237676516888?text=Hello%20Luxuria_Imports%2C%20I%27m%20interested%20in%20learning%20importation!', '_blank');
  }
}
