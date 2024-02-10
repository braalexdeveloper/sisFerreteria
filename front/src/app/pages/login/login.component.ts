
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify.service';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private _authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {

  }

  login() {
    return this._authService.login({ email: this.email, password: this.password }).subscribe({
      next: (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(error)
        this.alertify.error(error.error)
      }
    })
  }

}
