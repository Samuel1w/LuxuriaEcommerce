import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-lux-tech',
  imports: [HeaderComponent,CommonModule,RouterModule,FooterComponent],
  templateUrl: './lux-tech.component.html',
  styleUrl: './lux-tech.component.css'
})
export class LuxTechComponent {
events = [
    {
      day: '02',
      month: 'AUG',
      time: '10:00 AM',
      title: 'Tech Bootcamp',
      description: 'A 5-day coding experience for beginners & enthusiasts.'
    },
    {
      day: '16',
      month: 'AUG',
      time: '9:00 AM',
      title: 'Women in Tech Summit',
      description: 'Inspiring girls and women to pursue tech careers.'
    },
    {
      day: '30',
      month: 'AUG',
      time: '1:00 PM',
      title: 'Hackathon Challenge',
      description: 'Collaborate and innovate with other young developers.'
    }
  ];
  
  services = [
    {
      title: 'Web Development',
      description: 'Crafting fast, responsive websites tailored to your business needs using the latest frameworks and technologies.',
      icon: '💻'
    },
    {
      title: 'Mobile App Development',
      description: 'We build scalable and intuitive mobile apps for Android and iOS to put your business in everyone’s pocket.',
      icon: '📱'
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful interfaces and seamless user experiences that make every interaction delightful.',
      icon: '🎨'
    },
    {
      title: 'Tech Tutoring',
      description: 'Personalized mentorship to help you or your team gain essential tech skills and build real-world projects.',
      icon: '📚'
    },
    
  ];
 whyLuxuria = [
  {
    icon: '../../assets/g1.jpeg',
    title: 'Royal-Class Service',
    description: 'We deliver luxury hospitality tailored to your every need, making every moment unforgettable.'
  },
  {
    icon: '../../assets/g2.jpeg',
    title: 'Elegant Ambience',
    description: 'Our spaces are curated with sophistication and charm to elevate your comfort and experience.'
  },
  {
    icon: '../../assets/g2.jpeg',
 title: 'World-Class Cuisine',
    description: 'Enjoy meals crafted by top chefs with ingredients as refined as your taste.'
  },
  {
    icon: '../../assets/g2.jpeg',
    title: '24/7 Personalized Assistance',
    description: 'Our concierge team is always on standby to ensure you receive timely, seamless support.'
  }
];
}
