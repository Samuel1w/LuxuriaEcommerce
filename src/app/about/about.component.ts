import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent,CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
faqList = [
  {
    question: 'What services does Luxuria_Imports offer?',
    answer: 'Luxuria Imports specializes in high-quality international products, offering pre-orders, local availability, and limited-time hot deals.'
  },
  {
    question: 'What is Luxuria_CrochetCraft about?',
    answer: 'It’s our artisanal line creating custom handmade crafts, home décor, and accessories made with love and luxury.'
  },
  {
    question: 'What is Luxuria_TechHub?',
    answer: 'Luxuria TechHub is the innovation wing, offering software development, digital marketing, and tech education services.'
  },
  {
    question: 'Does Luxuria_Music offer lessons?',
    answer: 'Yes! Luxuria Music empowers artists through coaching, production, and musical gear sales.'
  },
  {
    question: 'Can I track my order across Luxuria brands?',
    answer: 'Absolutely! You’ll receive updates and can track every order from any of the Luxuria branches.'
  }
];

activeIndex: number | null = null;

toggleFAQ(index: number) {
  this.activeIndex = this.activeIndex === index ? null : index;
}

  peopleList = [
    { name: 'Atouba Dalina M', role: 'CEO & Founder', bio: 'Visionary leader redifining excellence and consitentcy throughout all four houses.', image: 'assets/CEO.JPG' },
    { name: 'Samuel Moka K', role: 'Operations Director', bio: 'Drives Luxuria Empire’s branding and customer experience strategies.', image: 'assets/COO.JPG' },
    { name: 'Peleke Fritz F', role: 'Business Mentor', bio: 'Incharge of Legal Domains and Proper business running', image: 'assets/abtfritz.JPG' }
  ];

  partnersList = [
    { name: 'MJDigitalz', logo: 'assets/mu.PNG' },
    { name: 'GlobalX', logo: 'assets/mu.PNG' }
    
  ];

  valuesList = [
    { icon: '✨', title: 'Excellence', desc: 'We deliver with the highest standards of quality and trust.' },
    { icon: '🤝', title: 'Integrity', desc: 'Transparency and honesty define our every transaction.' },
    { icon: '🌍', title: 'Global Reach', desc: 'We connect clients to the world’s finest luxury imports.' },
    { icon: '💎', title: 'Luxury', desc: 'Every detail of our service is designed to reflect elegance.' }
  ];

}
