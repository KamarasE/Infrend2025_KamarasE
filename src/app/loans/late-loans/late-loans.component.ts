import { Component, OnInit } from '@angular/core';
import { Loan } from '../loan-model';
import { LoanService } from '../loan.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-late-loans',
  templateUrl: './late-loans.component.html',
  imports: [CommonModule, NgFor],
})
export class LateLoansComponent implements OnInit {
  overdueLoans: Loan[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getOverdueLoans().subscribe(data => {
      this.overdueLoans = data;
    });
  }

  calculateDelay(date: Date): number {
  const loanDate = new Date(date);
  const now = new Date();
  const diff = now.getTime() - loanDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

}
