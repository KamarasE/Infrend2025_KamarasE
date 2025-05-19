import { Component, NgModule, OnInit } from '@angular/core';
import { Loan } from '../loan-model';
import { LoanService } from '../loan.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  imports: [FormsModule]
})
export class LoanFormComponent implements OnInit {
  loan: Loan = {
    memberId: 0,
    itemId: 0,
    borrowDate: new Date(),
    isReturned: false
  };

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {}

  save(): void {
    this.loanService.addLoan(this.loan).subscribe(() => {
      this.router.navigate(['/loans']);
    });
  }
}
