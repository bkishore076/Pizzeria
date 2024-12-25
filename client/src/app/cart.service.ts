import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { OrderService } from './pizza-order.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3004/cart';
  toppings: any[] = [];
  toppingtotal: number = 0;

  constructor(private http: HttpClient, private orderService: OrderService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCart() {
    return this.http.get<any>(`${this.apiUrl}/`, { headers: this.getAuthHeaders() });
  }

  addToCart(pizzaId: string, name: string, price: number, qty: number, image: string) {
    const body = { pizzaId, name, price, qty, image };
    return this.http.post(`${this.apiUrl}/add`, body, { headers: this.getAuthHeaders() }).pipe(
      switchMap(() => this.getCart())
    );
  }

  removeFromCart(pizzaId: string) {
    return this.http.delete(`${this.apiUrl}/remove/${pizzaId}`, { headers: this.getAuthHeaders() }).pipe(
      switchMap(() => this.getCart()),
      tap(() => {
        this.orderService.getCartCount().subscribe();
      })
    );
  }

  clearCart() {
    return this.http.delete(`${this.apiUrl}/clear`, { headers: this.getAuthHeaders() }).pipe(
      tap(() => {
        this.orderService.getCartCount().subscribe();
      })
    );
  }

  updateCartItemQty(pizzaId: string, qty: number) {
    const body = { pizzaId, qty };
    return this.http.post(`${this.apiUrl}/updateQty`, body, { headers: this.getAuthHeaders() }).pipe(
      switchMap(() => this.getCart())
    );
  }

  addToppings(toppings: any[]) {
    const headers = this.getAuthHeaders();
    const body = { toppings };
    return this.http.post(`${this.apiUrl}/addToppings`, body, { headers }).pipe(
      switchMap(() => this.getCart())
    );
  }

  removeToppingFromCart(tname: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/removeTopping/${tname}`, { headers }).pipe(
      switchMap(() => this.getCart())
    );
  }
  getCartItemCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/`, { headers: this.getAuthHeaders() }).pipe(
      map((cart) => cart.items.length) // Assuming the cart structure has an 'items' array
    );
  }
 
}
