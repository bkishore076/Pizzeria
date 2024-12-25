import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  user: any = null;

  constructor(private orderService: OrderService,private userService: UserService) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchUserDetails();
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (response: any) => {
        this.orders = response.orders.map((order: any) => {
          
          const pizzaTotal = order.items.reduce(
            (sum: number, item: any) => sum + (item.price * item.qty),
            0
          );
          
          
          const toppingTotal = order.toppings.reduce(
            (sum: number, topping: any) => sum + topping.price,
            0
          );
  
          
          return { ...order, pizzaTotal, toppingTotal };
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch orders. Please try again later.';
        console.error('Error fetching orders:', err);
        this.isLoading = false;
      }
    });
  }

  fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe({
      next: (response) => {
        this.user = response;  
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      },
    });
  }
  
}
