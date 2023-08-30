import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatGridListModule, MatCardModule,
    MatButtonModule, CommonModule],
})
export class LoginComponent {

  name = '';
  email = '';
  idade = '';
  username = '';
  password = '';
  confirmPassword = '';
  loggedIn = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar) {
    authService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    })
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe();
  }

  CreateAccount(): void {
    const newUser = {
      name: this.name,
      idade: this.idade,
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    if (this.password != this.confirmPassword) {
      this._snackBar.open('As senhas não são iguais! Confira novamente...', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000
      })
    }

    else {
      this.http.post(' http://localhost:3000/users', newUser)
        .subscribe(
          (response) => {
            this._snackBar.open('Criação de usuário concluída! Vá para o Login!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000
            });
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          },
          (error) => {
            console.error('Erro ao cadastrar usuário:', error);
            this._snackBar.open('Erro ao cadastrar usuário!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000
            });
          }
        )
    }
  }
}
