import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';
import { Employee } from './../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  add(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/users`, employee);
  }

  listById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/users/${id}`)
  }

  listAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/users`);
  }

  update(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/users/${id}`, employee)
  }

  remove(id: string) {
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }
}
