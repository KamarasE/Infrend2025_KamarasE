import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from './member.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemberService {
  http = inject(HttpClient)

  private apiUrl = 'http://localhost:3000/members';

  //constructor(private http: HttpClient) {}

  getMembers(search: string = ''): Observable<Member[]> {
  return this.http.get<Member[]>(this.apiUrl, {
    params: { q: search }
  });
}


  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${member.id}`, member);
  }

  deactivateMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
