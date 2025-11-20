import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feeding {
  _id?: string;
  petId: string;
  petName: string;
  date: string;
  time: string;
  foodType: string;
  portion: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class FeedingService {
  private base = '/api/feedings';

  constructor(private http: HttpClient) {}

  list(petId: string): Observable<Feeding[]> {
    return this.http.get<Feeding[]>(this.base, { params: { petId } });
  }

  create(feeding: Feeding): Observable<Feeding> {
    return this.http.post<Feeding>(this.base, feeding);
  }

  update(id: string, feeding: Feeding): Observable<Feeding> {
    return this.http.put<Feeding>(`${this.base}/${id}`, feeding);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
