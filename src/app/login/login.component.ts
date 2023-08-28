import { Component,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatGridListModule, MatCardModule,
    MatButtonModule],
})
export class LoginComponent {

  name = '';
  email = '';
  idade = '';
  username = '';
  password =  '';
  loggedIn = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar){
    authService.loggedIn$.subscribe((loggedIn:boolean) => {
      this.loggedIn = loggedIn;
    })
  }

  login(): void {
    this.authService.login(this.username, this.password);
    this.router.navigate(['home'])
  }

  afterCreateAccount() : void {
    this.router.navigate(['login']);
    this._snackBar.open('Criação de usuário concluída! Clique em Login!', 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    }); 
  }

}
