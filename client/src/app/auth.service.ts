import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3003/auth';

  constructor(private http: HttpClient, private router: Router) { }


  signup(username: string, password: string, name: string, age: number, phone_no: string, address: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password, name, age, phone_no, address });
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }


  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/home']);
  }
}
