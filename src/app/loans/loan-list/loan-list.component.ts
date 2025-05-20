import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';
import { Loan } from '../loan-model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  imports: [NgIf, NgFor, FormsModule, CommonModule]
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = [];

  constructor(
    private loanService: LoanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe(data => this.loans = data);
  }

  returnItem(loanId: number): void {
    if (confirm('Biztosan visszahozta az anyagot?')) {
      this.loanService.returnLoan(loanId).subscribe(() => this.loadLoans());
    }
  }

  navigateToNewLoan(): void {
    this.router.navigate(['/loans/new']);
  }
}
