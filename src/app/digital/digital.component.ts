import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

interface Order {
  id: number;
  title: string;
  quantity: number;
  price: number;
  created_at: string;
  verified: boolean;
  commission: number;
}

@Component({
  selector: 'app-digital',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent,FooterComponent],
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.css'],
})
export class DigitalComponent implements OnInit {
  
  form = { name: '', email: '', phone: '', platform: '', note: '' };
  loading = false;
  marketerId: number | null = null;
  stats: any = { counts: { clicks: 0, orders: 0, balance: 0 }, orders: [] };
  previewRefUrl: string = '';
 
  referralLink: string = '';
  preview: any = { counts: { clicks: 0, orders: 0, balance: 0 } };

  constructor(private http: HttpClient) {}
ngOnInit() {
  this.http.get<{ marketer: { referral_code: string } }>('http://localhost:5000/api/dm/marketer')
      .subscribe(res => {
        // Assign here in TS, not in HTML
        this.referralLink = `${window.location.origin}?ref=${res.marketer.referral_code}`;
      });
  // Load dashboard if marketer is logged in
  if (this.marketerId) this.loadDashboard();
}


  register() {
    this.loading = true;
    this.http.post('http://localhost:5000/api/dm/register', this.form)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.marketerId = res.marketer.id;
          this.previewRefUrl = `${window.location.origin}?ref=${res.marketer.referral_code}`;
          this.loadDashboard();
        },
        error: err => { console.error(err); this.loading = false; }
      });

       setTimeout(() => {
      this.referralLink = 'https://luxuria.com/?ref=DALINA123'; // demo
      this.preview = { counts: { clicks: 12, orders: 2, balance: 5000 } }; // demo
      this.loading = false;
    }, 1500);
  }



loadDashboard() {
  if (!this.marketerId) return;
  this.http.get<any>(`http://localhost:5000/api/dm/dashboard/${this.marketerId}`)
    .subscribe({
      next: data => {
        this.stats = data;
        this.preview.counts.clicks = data.counts.clicks;
        this.preview.counts.orders = data.counts.orders;
        this.preview.counts.balance = data.counts.balance;
      },
      error: err => console.error(err)
    });
}

  copyRef() {
    navigator.clipboard.writeText(this.previewRefUrl);
    alert('Referral link copied!');
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openShareMenu() {
    // implement sharing logic (popup/modal)
    alert('Open share menu');
  }

  openPromoKit() {
    // show promo kit modal
    alert('Open promo kit');
  }

  resetForm() {
    this.form = { name: '', email: '', phone: '', platform: '', note: '' };
  }



  copyReferralLink() {
    navigator.clipboard.writeText(this.referralLink);
    alert('Referral link copied!');
  }

}



