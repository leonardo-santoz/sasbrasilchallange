import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../../environments/environment';
import { Area } from './../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  add(area: Area): Observable<Area> {
    return this.http.post<Area>(`${this.baseUrl}/areas`, area);
  }

  listById(id: string): Observable<Area> {
    return this.http.get<Area>(`${this.baseUrl}/areas/${id}`)
  }

  listAll(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseUrl}/areas`);
  }

  update(id: string, area: Area): Observable<Area> {
    return this.http.put<Area>(`${this.baseUrl}/areas/${id}`, area)
  }

  remove(id: string) {
    return this.http.delete(`${this.baseUrl}/areas/${id}`)
  }
}
