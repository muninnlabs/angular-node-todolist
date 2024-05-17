import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private router = inject(Router);
  public userService = inject(UsersService);
  private cookieService = inject(CookieService);
  public loginForm: FormGroup;
  public formMessage: string = '';
  hide: boolean = false;

  private sub: Subscription = new Subscription();

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onLogin() {
    this.sub = this.userService.userAuth(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        this.cookieService.set('token', response.userHashCode);
        this.router.navigate(['/tasks']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onRegister() {
    this.sub = this.userService.createUser(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        this.formMessage = 'User created successfully!';
      },
      (error) => {
        this.formMessage =
          error == 409 ? 'Usuario ja existente, tente logar' : error;
        console.log('error', error, this.formMessage);
      }
    );
  }
}
