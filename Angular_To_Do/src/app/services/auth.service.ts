import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7015/api/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/Auth/login`, body);
  }

  signup(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/Auth/signup`, body);
  }
}
