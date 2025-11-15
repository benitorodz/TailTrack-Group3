import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export type Exercise = {
  _id?: string;
  petId: string;
  date: string;
  activityType: 'Walk' | 'Run' | 'Play' | 'Park' | 'Frisbee' | 'Swim' | 'Hike' | 'Training' | 'Other';
  durationMinutes: number;
  distanceMiles?: number;  
  notes?: string;
  createdAt?: string;
};

@Injectable({ providedIn: 'root' })
export class ExerciseService {
private http = inject(HttpClient);
// Use proxy in dev: ng serve --proxy-config proxy.conf.json
private base = '/api/exercises';

  list(petId?: string): Observable<Exercise[]> {
    const url = petId ? `${this.base}?petId=${encodeURIComponent(petId)}` : this.base;
    return this.http.get<Exercise[]>(url);
  }
  create(payload: Exercise) { return this.http.post<Exercise>(this.base, payload); }
  update(id: string, payload: Partial<Exercise>) { return this.http.put<Exercise>(`${this.base}/${id}`, payload); }
  remove(id: string) { return this.http.delete<{ ok: boolean }>(`${this.base}/${id}`); }

  // helper for weekly window (last 7 days inclusive)
  last7Days(petId?: string) {
    const now = new Date();
    const start = new Date(now); start.setDate(now.getDate() - 6); 
    return this.list(petId).pipe(
      map(items => items.filter(x => {
        const d = new Date(x.date);
        return d >= new Date(start.toDateString()) && d <= now;
      }))
    );
  }
}
