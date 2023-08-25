import { Component,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nome: string = '';
  username = '';
  password =  '';
  confirmPassword: string = '';

  loggedIn = false;


}
