import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = { items: [], toppings: [],totalAmount: 0 };

  constructor(private cartService: CartService, private router: Router,private http: HttpClient, private orderService: OrderService,) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart() {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cart = data;
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  removeItem(pizzaId: string) {
    this.cartService.removeFromCart(pizzaId).subscribe(() => {
      this.fetchCart();
    });
  }

  removeTopping(tname: string) {
    this.cartService.removeToppingFromCart(tname).subscribe(() => {
      this.fetchCart();
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.cart = { items: [], toppings: [] };
    });
  }

  increaseQty(item: any) {
    const newQty = item.qty + 1;
    this.cartService.updateCartItemQty(item.pizzaId, newQty).subscribe(() => {
      this.fetchCart();
    });
  }

  decreaseQty(item: any) {
    const newQty = item.qty - 1;
    if (newQty > 0) {
      this.cartService.updateCartItemQty(item.pizzaId, newQty).subscribe(() => {
        this.fetchCart();
      });
    } else {
      this.removeItem(item.pizzaId);
    }
  }

  calculateItemsTotal(): number {
    const itemsTotal = this.cart.items.reduce(
      (total: number, item: any) => total + item.price * item.qty,
      0
    );
    return itemsTotal;
  }

  calculateToppingsTotal(): number {
    const toppingsTotal = this.cart.toppings.reduce(
      (total: number, topping: any) => total + topping.price,
      0
    );
    return toppingsTotal;
  }

  calculateTotal(): number {
    const itemsTotal = this.cart.items.reduce(
      (total: number, item: any) => total + item.price * item.qty,
      0
    );
    const toppingsTotal = this.cart.toppings.reduce(
      (total: number, topping: any) => total + topping.price,
      0
    );
    return itemsTotal + toppingsTotal;
  }

  paylo(): void {
    this.fetchCart();
    if (!this.cart.items || this.cart.items.length === 0) {
      alert('Your cart is empty. Please select at least one pizza before proceeding to payment.');
      return;
    }
  
    const orderPayload = {
      items: this.cart.items,
      toppings: this.cart.toppings,
      totalAmount: this.calculateTotal(),
    };
  
    this.orderService.placeOrder(orderPayload).subscribe({
      next: (response: any) => {
        alert('Order placed successfully!');
        this.cartService.clearCart().subscribe({
          next: () => {
            this.router.navigateByUrl('/payment');
          },
          error: (error) => {
            console.error('Error clearing cart:', error);
            alert('Cart could not be cleared. Please refresh and try again.');
          }
        });
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again later.');
      },
    });
  }
  
}
