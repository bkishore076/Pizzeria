import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  private toppingsApiUrl = 'http://localhost:3001/toppings';
  private cartApiUrl = 'http://localhost:3004/cart';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getToppings() {
    const headers = this.getAuthHeaders();
    return this.http.get(this.toppingsApiUrl, { headers });
  }

  addToppingsToCart(toppings: any) {
    const headers = this.getAuthHeaders();
    const payload = {
      toppings: toppings
    };
    return this.http.post(`${this.cartApiUrl}/addToppings`, payload, { headers });
  }
}
