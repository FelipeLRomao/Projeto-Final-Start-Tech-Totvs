import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent {

  username = '';
  password =  '';
  loggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    ){
    authService.loggedIn$.subscribe((loggedIn:boolean) => {
      this.loggedIn = loggedIn;
    })
  }

  login(): void {
    this.authService.login(this.username, this.password)
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home'])
  }

}
