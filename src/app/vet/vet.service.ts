import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface VetVisit {
  id: string; // Frontend uses 'id' for tracking/editing/deleting
  _id?: string; // Backend returns this
  petId: string;
  date: string;           // ISO date string
  reason: string;
  vetName: string;
  diagnosis: string;
  treatment: string;
  nextAppointment?: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class VetService {
  private visits$ = new BehaviorSubject<VetVisit[]>([]);
  private apiUrl = '/api/vet';

  constructor(private http: HttpClient) {
    this.refresh();
  }

  list(): VetVisit[] {
    return this.visits$.value.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  refresh(): Observable<VetVisit[]> {
    return this.http.get<VetVisit[]>(this.apiUrl).pipe(
      tap(visits => {
        // Ensure each visit has id set to _id for frontend consistency
        visits.forEach(visit => visit.id = visit._id || visit.id);
        this.visits$.next(visits);
      })
    );
  }

  add(input: Omit<VetVisit, '_id' | 'createdAt' | 'updatedAt'>): Observable<VetVisit> {
    return this.http.post<VetVisit>(this.apiUrl, input).pipe(
      tap(() => this.refresh().subscribe())
    );
  }

  update(id: string, patch: Partial<VetVisit>): Observable<VetVisit> {
    return this.http.put<VetVisit>(`${this.apiUrl}/${id}`, patch).pipe(
      tap(() => this.refresh().subscribe())
    );
  }

  delete(id: string | null): Observable<any> {
    if (!id) return of(null);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refresh().subscribe())
    );
  }
}
