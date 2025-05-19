import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.service';
import { Member } from './member.service';

export interface Loan {
  id?: number;
  memberId: number;
  itemId: number;
  borrowDate?: string;
  returnDate?: string;
  isReturned: boolean;
  member?: Member;
  item?: Item;
}

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private apiUrl = 'http://localhost:3000/api/loans';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  getById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  create(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  markReturned(id: number): Observable<Loan> {
    return this.http.patch<Loan>(`${this.apiUrl}/${id}/return`, {});
  }

  getOverdue(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/overdue/check`);
  }
}
