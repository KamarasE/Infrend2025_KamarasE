// frontend/src/app/loans/loans.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanFormComponent } from './loan-form/loan-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoanListComponent,
    LoanFormComponent
  ],
  exports: [
    LoanListComponent,
    LoanFormComponent
  ]
})
export class LoansModule {}
