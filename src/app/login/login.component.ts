import { Component,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = '';
  password =  '';
  loggedIn = false;

  constructor(private authService: AuthService){
    authService.loggedIn$.subscribe((loggedIn:boolean) => {
      this.loggedIn = loggedIn;
    })
  }

  login(): void {
    this.authService.login(this.username, this.password)
  }

  logout(): void {
    this.authService.logout();
  }

}
