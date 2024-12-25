import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  name: string = '';
  age: number | null = null;
  phone_no: string = '';
  address: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    if (!this.age || this.age < 1) {
      this.errorMessage = 'Please enter a valid age.';
      return;
    }

    this.authService.signup(this.username, this.password, this.name, this.age, this.phone_no, this.address).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Error signing up. Please try again.';
      }
    );
  }
}
