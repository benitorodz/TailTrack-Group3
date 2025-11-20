import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VetVisit {
  _id?: string;
  petId: string;
  date: string;
  reason: string;
  vetName: string;
  diagnosis?: string;
  treatment?: string;
  nextAppointment?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class VetService {
  private base = '/api/vet-visits';

  constructor(private http: HttpClient) {}

  list(petId: string): Observable<VetVisit[]> {
    return this.http.get<VetVisit[]>(this.base, { params: { petId } });
  }

  create(visit: VetVisit): Observable<VetVisit> {
    return this.http.post<VetVisit>(this.base, visit);
  }

  update(id: string, visit: VetVisit): Observable<VetVisit> {
    return this.http.put<VetVisit>(`${this.base}/${id}`, visit);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
