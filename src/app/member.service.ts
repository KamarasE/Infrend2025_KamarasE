import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Member {
  id: number;
  name: string;
  phone: string;
  idCardNumber: string;
  address: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private apiUrl = 'http://localhost:3000/api/members';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  create(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }

  update(id: number, member: Partial<Member>): Observable<Member> {
    return this.http.patch<Member>(`${this.apiUrl}/${id}`, member);
  }

  delete(id: number): Observable<Member> {
    return this.http.delete<Member>(`${this.apiUrl}/${id}`);
  }
}
