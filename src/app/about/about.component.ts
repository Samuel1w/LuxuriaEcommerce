import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent,CommonModule,FooterComponent,RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {


  // Four Pillars
  pillarsList = [
    { icon: '🏛', name: 'Luxuria Imports', desc: 'Delivering elegance through world-class importation of luxury goods, redefining trust and sophistication.' },
    { icon: '💻', name: 'Luxuria Techub', desc: 'Where innovation meets creativity — empowering digital growth and building futuristic solutions.' },
    { icon: '🧶', name: 'Luxuria Craft', desc: 'Handmade crochets crafted with passion, blending tradition with modern artistry.' },
    { icon: '🎶', name: 'Luxuria Music', desc: 'Amplifying voices and rhythms, nurturing talent, and creating a symphony of inspiration.' }
  ];

  // Journey / Timeline
  journeyList = [
    { year: '2022', description: 'Luxuria Music was born, nurturing intrumental talents and producing royal melodies.' },
    { year: '2022', description: 'The birth of Luxuria Imports – founded on the vision of expanding our reach.' },
    { year: '2023', description: 'First major importation deal sealed, setting a new standard for trust and sophistication.' },
    { year: '2024', description: 'Launched Luxuria Techub, empowering innovation and digital transformation.' },
    { year: '2025', description: 'Expanded into handmade crafts, blending cultural artistry with modern trends.' },
   { year: '2025', description: 'The birth of Luxuria Empire – founded on the vision of blending luxury, technology, craft, and music.' },
    { year: '2025', description: 'Formed partnerships with global brands' },
    { year: '2025', description: 'Recognition – Luxuria Empire became a dynasty of excellence .' },
    { year: '2025', description: 'Present & Beyond – embarking on new royal journeys, expanding globally, and fueling inspirations.' }
  ];

  // FAQ
  faqList = [
    { question: 'What is Luxuria Empire?', answer: 'Luxuria Empire is a multi-vertical company uniting luxury importation, tech, crafts, and music.' },
    { question: 'Where are you based?', answer: 'We are headquartered in Cameroon with global reach.' },
    { question: 'Can I book music classes?', answer: 'Yes, check out Luxuria Music to book online or live sessions.' },
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
  activeIndex = -1;
  toggleFAQ(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }

  // People and Partners (add your own data)
  peopleList = [
 { name: 'Atouba Dalina M', role: 'CEO & Founder', bio: 'Visionary leader redifining excellence and consitentcy throughout all four houses.', image: 'assets/CEO.JPG' },
    { name: 'Samuel Moka K', role: 'Operations Director', bio: 'Drives Luxuria Empire’s branding and customer experience strategies.', image: 'assets/COO.JPG' },
    { name: 'Peleke Fritz F', role: 'Business Mentor', bio: 'Ensures Proper business running', image: 'assets/abtfritz.JPG' }
  ];


  
partnersList = [
    { name: 'MJDigitalz', logo: 'assets/mu.PNG' },
    
    
  ];
  valuesList = [
    { icon: '💎', title: 'Excellence', desc: 'We pursue the highest standards in everything.' },
    { icon: '🌟', title: 'Innovation', desc: 'Creative solutions for a modern world.' },
    { icon: '🤝', title: 'Integrity', desc: 'Trust and transparency at the core.' },
    { icon: '🎨', title: 'Creativity', desc: 'Blending artistry with strategy.' }
  ];
}


