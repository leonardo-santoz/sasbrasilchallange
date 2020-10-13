import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';
import { Position } from './../models/Position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  add(position: Position): Observable<Position> {
    return this.http.post<Position>(`${this.baseUrl}/positions`, position);
  }

  listById(id: string): Observable<Position> {
    return this.http.get<Position>(`${this.baseUrl}/positions`)
  }

  listAll(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.baseUrl}/positions`);
  }

  update(id: string, position: Position): Observable<Position> {
    return this.http.put<Position>(`${this.baseUrl}/positions/${id}`, position)
  }

  remove(id: string) {
    return this.http.delete(`${this.baseUrl}/positions/${id}`)
  }
}
