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
  tipo = 'usuario';
  loggedIn = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  breakpoint: number = (window.innerWidth <= 480) ? 1 : 4;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar) {
    authService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    })
  }

  usuarios: Array<any> = [];

  onResize(event: any): void {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 4;
  }
  
  login(): void {
    this.authService.login(this.username, this.password).subscribe();
  }

  registerUser(username: string,): void {
    const newUser = {
      name: this.name,
      idade: this.idade,
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      tipo: 'usuario'
    }
    this.http.get<any>('http://localhost:3000/users')
      .subscribe(
        (response) => {
          this.usuarios = response;
          const usernameExistente = this.usuarios.find(user => user.username === username)

          if (usernameExistente) {
            this._snackBar.open('O usuário já existe! Confira novamente...', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000
            })
          }

          else if (this.password != this.confirmPassword) {
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
      )
  }
}
