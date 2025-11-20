import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pet {
  _id?: string;
  name: string;
  type: string;
  breed?: string;
  birthday?: string;     // ISO date string
  weight?: number;
  summary?: string;
  medicalInfo?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class PetService {
  private base = '/api/pets';

  constructor(private http: HttpClient) {}

  list(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.base);
  }

  get(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.base}/${id}`);
  }

  create(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.base, pet);
  }

  update(id: string, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.base}/${id}`, pet);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
