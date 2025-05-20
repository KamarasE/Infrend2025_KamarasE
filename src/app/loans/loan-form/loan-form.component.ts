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
    loanDate: new Date(),
    isReturned: false
  };

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {}

  save(): void {
    console.log(this.loan);
  const payload = {
    memberId: Number(this.loan.memberId),
    itemId: Number(this.loan.itemId)
  };

  console.log('Küldésre előkészített adat:', payload);

  this.loanService.addLoan(payload).subscribe({
    next: () => this.router.navigate(['/loans']),
    error: err => console.error('HIBA válaszként:', err)
  });
}
cancel(): void {
  this.router.navigate(['/loans']);
}


}
