import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id?: number;
  type: string;
  title: string;
  author: string;
  acquisitionDate: string;
  serialNumber: string;
  status: 'szabad' | 'kikölcsönzött' | 'selejtezett';
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  update(id: number, item: Partial<Item>): Observable<Item> {
    return this.http.patch<Item>(`${this.apiUrl}/${id}`, item);
  }
}
