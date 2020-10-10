import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface IAuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
  }

  signIn(email: string, password: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.apiUrl}/auth`, {email, password});
  }

  signOut() {
    localStorage.removeItem('@sasbrasil_token');
    this.router.navigate(['/acesso'])
  }
}

