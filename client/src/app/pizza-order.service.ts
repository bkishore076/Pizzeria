import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private pizzaApiUrl = 'http://localhost:3002/pizzas';
  private cartApiUrl = 'http://localhost:3004/cart';  
  private cartCountSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPizzas() {
    const headers = this.getAuthHeaders();
    return this.http.get(this.pizzaApiUrl, { headers });
  }

  addToCart(pizza: any, qty: number, toppings: any[] = []) {
    const headers = this.getAuthHeaders();

    const payload = {
      pizzaId: pizza.id,
      name: pizza.name,
      price: pizza.price,
      qty: qty,
      image: pizza.image,
      toppings: toppings
    };

    return this.http.post(`${this.cartApiUrl}/add`, payload, { headers }).pipe(
      switchMap(() => this.getCartCount())
    );
  }

  removeFromCart(pizzaId: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.cartApiUrl}/remove/${pizzaId}`, { headers }).pipe(
      switchMap(() => this.getCartCount())
    );
  }

  getCartCount() {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.cartApiUrl}/`, { headers }).pipe(
      tap((cart) => {
        const count = cart.items.length;
        this.cartCountSubject.next(count);
      })
    );
  }

  getCartCountObservable() {
    return this.cartCountSubject.asObservable();
  }
}
