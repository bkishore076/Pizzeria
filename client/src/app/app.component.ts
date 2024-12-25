import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { OrderService } from './pizza-order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pizza-client';
  count: number = 0;

  constructor(
    public authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getCartCountObservable().subscribe((count: number) => {
      this.count = count;
    });

    this.orderService.getCartCount().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
