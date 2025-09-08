
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../finance.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  cashIn: any[] = [];
  expenses: any[] = [];
  investments: any[] = [];

  totals = { cashIn: 0, expenses: 0, investments: 0, returns: 0 };

  newRecord: any = { type: 'cashin', name: '', purpose: '', amount: null, returns: 0, notes: '' };
  editingRecord: any = null;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void { this.loadAll(); }

  loadAll() {
    this.financeService.getByType('cashin').subscribe((res: any) => { this.cashIn = res; this.calculateTotals(); });
    this.financeService.getByType('expense').subscribe((res: any) => { this.expenses = res; this.calculateTotals(); });
    this.financeService.getByType('investment').subscribe((res: any) => { this.investments = res; this.calculateTotals(); });
  }

  addRecord() {
    this.financeService.add(this.newRecord).subscribe(() => {
      this.newRecord = { type: 'cashin', name: '', purpose: '', amount: null, returns: 0, notes: '' };
      this.loadAll();
    });
  }

  editRecord(record: any) { this.editingRecord = { ...record }; }

  updateRecord() {
    this.financeService.update(this.editingRecord.id, this.editingRecord).subscribe(() => {
      this.editingRecord = null;
      this.loadAll();
    });
  }

  deleteRecord(id: number) {
    if (confirm('Delete this record?')) this.financeService.delete(id).subscribe(() => this.loadAll());
  }

  calculateTotals() {
    this.totals = { cashIn: 0, expenses: 0, investments: 0, returns: 0 };
    this.cashIn.forEach(r => this.totals.cashIn += parseFloat(r.amount));
    this.expenses.forEach(r => this.totals.expenses += parseFloat(r.amount));
    this.investments.forEach(r => { this.totals.investments += parseFloat(r.amount); this.totals.returns += parseFloat(r.returns || 0); });
  }
}
