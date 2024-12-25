import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../pizza-order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orderpizza',
  templateUrl: './orderpizza.component.html',
  styleUrls: ['./orderpizza.component.css']
})
export class OrderpizzaComponent implements OnInit {
  pizzas: any[] = [];
  flags: { [key: string]: boolean } = {};
  @Output() cartCountUpdated: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.orderService.getPizzas().subscribe(
      (data: any) => {
        this.pizzas = data;
      },
      (error) => {
        console.error('Error fetching pizzas:', error);
      }
    );

    this.updateCartCount();
  }

  getIngredientsList(ingredients: any[]): string {
    return ingredients.map(i => i.iname).join(', ');
  }

  getToppingsList(toppings: any[]): string {
    return toppings.map(t => t.tname).join(', ');
  }

  updateCartCount(): void {
    this.orderService.getCartCount().subscribe((cart: any) => {
      const count = cart.items.length;
      this.cartCountUpdated.emit(count);
    });
  }

  add(pizza: any) {
    this.orderService.addToCart(pizza, 1).subscribe(
      (res) => {
        this.flags[pizza.id] = true;
        this.updateCartCount();
        alert('Pizza successfully added to cart!');
      },
      (error) => {
        console.error('Error adding to cart:', error);
      }
    );
  }

  remove(pizza: any) {
    this.orderService.removeFromCart(pizza.id).subscribe(
      (res) => {
        this.flags[pizza.id] = false;
        this.updateCartCount();
      },
      (error) => {
        console.error('Error removing from cart:', error);
      }
    );
  }
}