import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from './loan-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private apiUrl = 'http://localhost:3000/loans';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  addLoan(data: { memberId: number; itemId: number }): Observable<Loan> {
  return this.http.post<Loan>(this.apiUrl, data);
}


 returnLoan(id: number): Observable<void> {
  return this.http.patch<void>(`http://localhost:3000/loans/${id}/return`, {});
}



  getOverdueLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/overdue`);
  }
}
