import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contact',
  imports: [FormsModule,HeaderComponent,CommonModule,FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
onSubmit() {
   
    console.log('✅ Form submitted successfully!');
    
   
    alert('Thank you for reaching out! We’ll get back to you shortly.');
  }
}
