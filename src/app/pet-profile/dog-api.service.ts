import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface DogBreed {
  id: number;
  name: string;
  temperament: string;
  lifeSpan: string;
  weight: string;
  imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class DogApiService {
  constructor(private http: HttpClient) {}

  getBreeds(): Observable<DogBreed[]> {
    return this.http
      .get<{ breeds: DogBreed[] }>('/api/dog-api/breeds')
      .pipe(map(res => res.breeds));
  }
}
