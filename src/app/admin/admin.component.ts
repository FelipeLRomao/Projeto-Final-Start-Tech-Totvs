import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSnackBarModule, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatSnackBarModule],
})

export class AdminComponent implements OnInit{
  cursos: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['foto', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource();

  constructor (
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.listarCurso();
  }

  listarCurso(): void {
    this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  adicionarCurso(): void {

  }

  editarCurso(cursosId: string): void {

  }

  deletarCurso(cursosId: string): void {
    this.http.delete('http://localhost:3000/cursos/' + cursosId).subscribe(response => {
      this._snackBar.open('O curso foi removido!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
      this.listarCurso();
    },
    error => {
      this._snackBar.open('Ocorreu um erro ao remover o curso ' + error, 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
    });
  }

  toggleFavorito(cursosId: string): void {
    this.http.get<any>('http://localhost:3000/imoveis/' + cursosId).subscribe(data => {

      this.cursos = data;

      this.cursos.favorito = !this.cursos.favorito;
      this.http.patch('http://localhost:3000/cursos/' + cursosId, { favorito: this.cursos.favorito })
        .subscribe(
          response => {
            // console.log('Property favorito status updated successfully:', response);
            if (this.cursos.favorito === true) {
              this._snackBar.open('O curso foi favoritado!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            } else {
              this._snackBar.open('O curso foi removido dos favoritos...', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            }

            this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
              this.dataSource.data = data;
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
              this.cursos.favorito = !this.cursos.favorito;
            }

      );
    });

  }

  filtrarCurso(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

