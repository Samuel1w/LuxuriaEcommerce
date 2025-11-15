import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lux-tech',
  imports: [HeaderComponent,CommonModule,RouterModule,FooterComponent,FormsModule],
  templateUrl: './lux-tech.component.html',
  styleUrl: './lux-tech.component.css'
})
export class LuxTechComponent {

    // Carousel state
  activeIndex2 = 2; // center card by default (0-based)
  


  ngAfterViewInit(): void {
    // initial arrow visibility
    setTimeout(() => this.updateArrow(), 50);
    // also update on window resize
    window.addEventListener('resize', () => this.updateArrow());
    setTimeout(() => this.scrollToActive(), 50);

    const grid = document.querySelector('.testimonials-grid') as HTMLElement;
    const cards = grid?.children?.length || 0;
    let index = 0;

    setInterval(() => {
      index = (index + 1) % cards;
      grid.style.transform = `translateX(-${index * 340}px)`; // slide effect
    }, 5000);
  }

  

  // Called by the scroll event on the horizontal container
  onScroll(): void {
    this.updateArrow();
  }
  @ViewChild('masonryScroll', { static: false }) masonryScroll!: ElementRef<HTMLDivElement>;

  // Only show the right-scroll arrow while there's hidden content to the right
  showRightArrow = true;
  // Scroll the gallery to the right (reveals hidden contents)
  scrollRight(): void {
    if (!this.masonryScroll) return;
    const el = this.masonryScroll.nativeElement;
    const amount = Math.round(el.clientWidth * 0.85); // scroll ~85% of the visible viewport of the gallery
    el.scrollBy({ left: amount, behavior: 'smooth' });
    // update arrow visibility shortly after scroll completes
    setTimeout(() => this.updateArrow(), 420);
  }

  // Check whether there's still overflow to the right
  private updateArrow(): void {
    if (!this.masonryScroll) {
      this.showRightArrow = false;
      return;
    }
    const el = this.masonryScroll.nativeElement;
    this.showRightArrow = el.scrollLeft + el.clientWidth < el.scrollWidth - 8;
  }

  // For dots click
  goTo2(idx: number) {
    this.activeIndex2 = idx;
    this.scrollToActive();
  }

  // smooth scroll / visual focus - uses #layered-stage element transforms
  scrollToActive() {
    // no heavy DOM libs — compute transform offset through CSS variables applied to host
    const style = (document.querySelector(':root') as HTMLElement).style;
    // we set an element-level attribute on container to allow CSS to handle transforms
    const stage = document.querySelector('.layered-stage') as HTMLElement;
    if (!stage) return;
    stage.setAttribute('data-active', String(this.activeIndex2));
  }

  // update on window resize for responsive adjustments
  @HostListener('window:resize') onResize() {
    this.scrollToActive();
  }

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
    icon: 'assets/chet1.jpeg',
    title: 'Innovation at the Core',
    description: `We don’t just follow trends — we create solutions that solve real community challenges through creativity and technology.`
  },
  {
    icon: 'assets/chet2.jpeg',
    title: 'Growth & Mentorship',
    description: `Our community is built on guidance. We connect learners, mentors, and innovators to grow together — not in competition, but in collaboration.`
  },
  {
    icon: 'assets/chet3.jpeg',
    title: 'Hackathons & Challenges',
    description: `From coding sprints to design jams, we create real-world opportunities for young talents to showcase skills, innovate, and gain visibility.`
  },
  {
    icon: 'assets/chet4.jpeg',
    title: 'Hands-on Bootcamps',
    description: `We run practical bootcamps designed to move people from learning to building. Code, collaborate, and launch projects that matter.`
  },
  {
    icon: 'assets/chet5.jpeg',
    title: 'Inclusive Tech Community',
    description: `Everyone deserves a seat at the table. Luxuria Hub nurtures inclusion, diversity, and access to opportunities in the tech ecosystem.`
  },
  {
    icon: 'assets/chet6.jpeg',
    title: 'Shaping the Future',
    description: `We believe Africa’s next big tech wave starts here — and we’re building the bridge between ideas, impact, and innovation.`
  }
];

facilities = [
  {
    id: 'hackathons',
    title: 'Hackathons & Innovation Challenges',
    image: 'assets/hack.jpeg',
    subImage: 'assets/chet1.jpeg',
    desc: `At Luxuria Tech, we host collaborative hackathons and innovation sprints that bring
           together students, young developers, and creatives to solve real-world problems.
           Each event promotes teamwork, creativity, and rapid prototyping with hands-on mentorship
           from experienced professionals.`,
    amenities: ['Team Collaboration', 'Tech Mentorship', 'Real Projects', 'Prizes & Recognition'],
    hours: 'Quarterly Events | Open to All Skill Levels',
    cta: 'Join Our Next Hackathon'
  },
  {
    id: 'mentorships',
    title: 'Private Mentorship Sessions',
    image: 'assets/mentors.jpeg',
    subImage: 'assets/chet4.jpeg',
    desc: `Our mentorship program pairs aspiring developers, designers, and entrepreneurs
           with experienced mentors for one-on-one guidance. From career planning to
           product development advice, we provide a space for real, personal growth.`,
    amenities: ['1-on-1 Sessions', 'Career Coaching', 'Technical Guidance', 'Startup Insights'],
    hours: 'By Appointment | Online & In-Person',
    cta: 'Book a Mentorship Session'
  },
  {
    id: 'bootcamps',
    title: 'Tech Tutoring & Bootcamps',
    image: 'assets/bts1.jpeg',
    subImage: 'assets/bts2.JPG',
    desc: `Our tutoring programs and coding bootcamps are designed for beginners and intermediate
           learners who want to build solid technical skills. We focus on practical projects,
           collaboration, and portfolio development to prepare participants for the real tech world.`,
    amenities: ['Hands-on Projects', 'Certified Trainers', 'Community Support', 'Flexible Learning'],
    hours: 'Ongoing Sessions | Weekend & Evening Classes',
    cta: 'Apply for a Bootcamp'
  },
  {
    id: 'workspace',
    title: 'Innovation & Collaboration Space',
    image: 'assets/bts3.JPG',
    subImage: 'assets/chet8.jpeg',
    desc: `Our physical hub is a creative environment designed for collaboration. 
           Whether you're working on a project, launching a prototype, or brainstorming with your team,
           our workspace provides access to the tools, internet, and community you need.`,
    amenities: ['High-Speed Internet', 'Work Desks', 'Community Events', 'Prototype Support'],
    hours: 'Open Mon - Sat | 09:00 - 19:00',
    cta: 'Book a Workspace'
  },
  {
    id: 'community',
    title: 'Community & Tech Events',
    image: 'assets/chet3.jpeg',
    subImage: 'assets/chet5.jpeg',
    desc: `We believe growth happens through connection. Our community events include
           tech talks, open demos, networking nights, and collaborative meetups that
           help innovators share ideas and build lasting partnerships.`,
    amenities: ['Networking', 'Workshops', 'Tech Talks', 'Demo Nights'],
    hours: 'Monthly Gatherings | All Are Welcome',
    cta: 'See Upcoming Events'
  }
];

columns = [
  // Column 1 (top = image)
  [
    { 
      type: 'image', 
      img: 'assets/chet1.jpeg', 
      alt: 'Team collaboration', 
      caption: 'Small team. Big ideas.' 
    },
    { 
      type: 'stat', 
      number: '3+', 
      heading: 'Years of learning and building', 
      subtitle: 'Still growing, still experimenting, still curious.' 
    },
    { 
      type: 'image', 
      img: 'assets/chet2.jpeg', 
      alt: 'Workspace creativity', 
      caption: 'Every project starts with a spark.' 
    }
  ],

  // Column 2 (top = stat)
  [
    { 
      type: 'stat', 
      number: '20+', 
      heading: 'Projects completed', 
      subtitle: 'From small tools to creative digital experiments.' 
    },
    { 
      type: 'image', 
      img: 'assets/chet3.jpeg', 
      alt: 'Coding night', 
      caption: 'Late nights. Endless coffee. Real progress.' 
    },
    { 
      type: 'stat', 
      number: '100+', 
      heading: 'Learners & creators connected', 
      subtitle: 'Through workshops, teamwork, and shared growth.' 
    }
  ],

  // Column 3 (top = image)
  [
    { 
      type: 'image', 
      img: 'assets/chet4.jpeg', 
      alt: 'Design and code', 
      caption: 'Design meets code in every build.' 
    },
    { 
      type: 'stat', 
      number: '50+', 
      heading: 'Creative ideas tested', 
      subtitle: 'Not all worked — but every one taught us something.' 
    },
    { 
      type: 'image', 
      img: 'assets/chet5.jpeg', 
      alt: 'Brainstorming session', 
      caption: 'Moments where concepts become prototypes.' 
    }
  ],

  // Column 4 (top = stat)
  [
    { 
      type: 'stat', 
      number: '1 vision', 
      heading: 'To grow through creation', 
      subtitle: 'Learning, building, and sharing every step.' 
    },
    { 
      type: 'image', 
      img: 'assets/chet6.jpeg', 
      alt: 'Team working', 
      caption: 'Learning from every build and every bug.' 
    },
    { 
      type: 'stat', 
      number: '100%', 
      heading: 'Driven by passion', 
      subtitle: 'No shortcuts — just consistent effort and creativity.' 
    }
  ]
];

projects = [
  {
    id: 'bakweri',
    title: 'Bakweri Cultural Heritage Platform',
    image: 'assets/chet1.jpeg',
    link: 'https://mbandomolatako.onrender.com', // replace with actual link
    desc: `A digital celebration of Bakweri history, language, and traditions — 
           this platform(FMCC) reconnects the younger generation with their cultural identity. 
           Developed with care, it features storytelling archives, historical galleries, 
           and learning resources designed to preserve and promote Bakweri heritage in the modern age.`,
    tagline: 'Preserving culture through digital innovation',
    cta: 'Explore the Bakweri Heritage Platform'
  },
  {
    id: 'oasis',
    title: 'Oasis Resort Website',
    image: 'assets/chet2.jpeg',
    link: 'https://oasisresort.onrender.com', 
    desc: `Where luxury meets technology. Oasis Resort’s online experience brings 
           seamless booking, real-time interaction, and immersive storytelling to the hospitality world. 
           We designed a modern, responsive, and elegant interface that reflects the resort’s calm sophistication 
           and commitment to excellence.`,
    tagline: 'A digital escape to comfort and class',
    cta: 'Visit Oasis Resort'
  },
  {
    id: 'luxuria',
    title: 'Luxuria Empire',
    image: 'assets/chet3.jpeg',
    link: 'https://luxuriaempire.onrender.com', // replace with actual link
    desc: `Our flagship e-commerce platform — Luxuria Empire connects creative artisans and 
           local businesses with buyers across regions. From handmade crafts to fashion essentials, 
           the platform empowers small creators to grow through technology and design.`,
    tagline: 'Empowering creators through digital trade',
    cta: 'Shop Luxuria Empire'
  },
  {
    id: 'cheatcode',
    title: 'CheatCode App (Under Construction)',
    image: 'assets/chet4.jpeg',
    link: '#', // no live link yet
    desc: `CheatCode is Luxuria Tech’s most ambitious innovation — an all-in-one platform for 
           tech learners, job seekers, and innovators. It provides a guided roadmap for anyone looking 
           to skill up or skill-connect: from curated courses and hybrid internships to mentorships, 
           hackathons, gigs, and even tools to help you start your own tech institution. 
           CheatCode is not just an app — it’s a movement to make tech growth accessible to everyone.`,
    tagline: 'Your roadmap from learning to leadership',
    cta: 'See What We’re Building'
  }
];



}

