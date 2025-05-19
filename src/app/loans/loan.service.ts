import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from './loan-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private apiUrl = 'http://localhost:3000/api/loans';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  addLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  returnLoan(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/return`, {});
  }

  getOverdueLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/overdue`);
  }
}
