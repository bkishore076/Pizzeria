import { Component, OnInit } from '@angular/core';
import { BuildService } from '../build.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buildurpizza',
  templateUrl: './buildurpizza.component.html',
  styleUrls: ['./buildurpizza.component.css']
})
export class BuildurpizzaComponent implements OnInit {
  toppings: any[] = [];
  selectedToppings: any[] = [];
  toppingTotal: number = 0;

  constructor(
    private buildService: BuildService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildService.getToppings().subscribe((data: any) => {
      this.toppings = data;
    });
  }

  isToppingSelected(toppingId: string): boolean {
    return this.selectedToppings.some(topping => topping.id === toppingId);
  }

  toggleToppingSelection(event: any, topping: any) {
    if (event.target.checked) {
      this.selectedToppings.push({ 
        name: topping.tname, 
        price: topping.price, 
        image: topping.image
      });
    } else {
      this.selectedToppings = this.selectedToppings.filter(t => t.name !== topping.tname);
    }
    this.calculateToppingTotal();
  }

  calculateToppingTotal() {
    this.toppingTotal = this.selectedToppings.reduce((total, topping) => total + parseFloat(topping.price), 0);
  }

  confirmSelection() {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        if (!cart.items || cart.items.length === 0) {
          alert('Please select a pizza first before adding toppings.');
          this.router.navigateByUrl('/order');
          return;
        }

        this.buildService.addToppingsToCart(this.selectedToppings).subscribe({
          next: () => {
            alert('Toppings successfully added to cart!');
          },
          error: (err) => {
            alert('Failed to add toppings to cart.');
          },
        });
      },
      error: (err) => {
        alert('Failed to check cart status.');
      }
    });
  }
}
