import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';import { CommonModule } from '@angular/common';import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';



@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatIconModule, NgFor, NgIf, CommonModule,  MatSnackBarModule]
})
export class CursosComponent implements OnInit {
  nome: string =  'Roosevelt';
  curso: any;
  cursos: any; 

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  breakpoint: number = (window.innerWidth <= 480) ? 1 : 4;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
      this.cursos = data;
    });
  }

  onResize(event: any): void {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 4;
  }
  
  verDetalhe(cursoId: string): void {   
    this.router.navigate(['/detalhes', cursoId]);
  }

  toggleFavorito(cursoId: string): void {
    this.http.get<any>('http://localhost:3000/cursos/' + cursoId).subscribe(data => {

      this.curso = data;

      this.curso.favorito = !this.curso.favorito;
      this.http.patch('http://localhost:3000/cursos/' + cursoId, { favorito: this.curso.favorito })
        .subscribe(
          response => {
            // console.log('Property favorito status updated successfully:', response);
            if (this.curso.favorito === true) {
              this._snackBar.open('Curso favoritado!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            } else {
              this._snackBar.open('Curso removido dos favoritos', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            }

            this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
              this.cursos = data;
            });
          },
          error => {
            // console.error('Error updating property favorito status:', error);
              this._snackBar.open('Ocorreu um erro ao favoritar/desfavoritar o curso!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
              // Revert the 'favorito' value if the update fails
              this.curso.favorito = !this.curso.favorito;
            } 
            
      );
    });
 
    
  }

  

  
  
    
}
