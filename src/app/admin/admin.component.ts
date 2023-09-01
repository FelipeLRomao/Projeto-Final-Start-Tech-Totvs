import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatSnackBarModule, MatDialogModule],
})

export class AdminComponent implements OnInit {

  cursos: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['foto', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.listarCurso();
  }

  listarCurso(): void {
    this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  modalExcluirCurso(cursoId:string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(excluirCursos, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: cursoId
    });
  }

  modalAdicionar(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AdicionarCurso, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  modalEditar(cursoId: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditarCurso, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: cursoId
    });
  }
  toggleFavorito(cursosId: string): void {
    this.http.get<any>('http://localhost:3000/cursos/' + cursosId).subscribe(data => {

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
            this._snackBar.open('Instrutor ocorreu um erro ao favoritar/desfavoritar o curso!', 'Fechar', {
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

@Component({
  selector: 'adicionarCurso',
  templateUrl: './adicionarCurso.html',
  styleUrls: ['./modal.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
})

export class AdicionarCurso {

  name: string | undefined;
  description: string | undefined;
  foto: string | undefined;
  foto2: string | undefined;
  descricao1: string | undefined;
  descricao2: string | undefined;
  descricao3: string | undefined;
  preco: string | undefined;
  favorito: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdicionarCurso>
  ) { }

  adicionarCurso() {
    const novoCurso = {
      nome: this.name,
      descricao: this.description,
      descricao1: this.descricao1,
      descricao2: this.descricao2,
      descricao3: this.descricao3,
      foto: this.foto,
      foto2: this.foto2,
      preco: this.preco,
      favorito: false,
    };

    this.http.post(' http://localhost:3000/cursos', novoCurso)
      .subscribe(
        (response) => {
          this._snackBar.open('Curso cadastrado com sucesso!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        },
        (error) => {
          console.error('Erro ao cadastrar curso:', error);
          this._snackBar.open('Erro ao cadastrar curso!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        }
      );
  }
}

@Component({
  selector: 'editarCurso',
  templateUrl: './editarCurso.html',
  styleUrls: ['./modal.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
})

export class EditarCurso implements OnInit {

  cursos: any = {};

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdicionarCurso>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/cursos/' + this.data).subscribe(response => {
      this.cursos = response;
    });
  }

  editarCurso() {
    const dadosCurso = {
      nome: this.cursos.name,
      descricao: this.cursos.description,
      descricao1: this.cursos.descricao1,
      descricao2: this.cursos.descricao2,
      descricao3: this.cursos.descricao3,
      foto: this.cursos.foto,
      foto2: this.cursos.foto2,
      preco: this.cursos.preco,
      favorito: this.cursos.false,
    }

    this.http.patch('http://localhost:3000/cursos/' + this.data, dadosCurso)
      .subscribe(
        (response) => {
          this._snackBar.open('Curso alterado com sucesso!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        },
        (error) => {
          console.error('Erro ao alterar curso:', error);
          this._snackBar.open('Erro ao cadastrar curso!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        }
      );
  }
}

@Component({
  selector: 'dialogExcluirCurso',
  styleUrls: ['dialogExcluir.scss'],
  templateUrl: 'dialogExcluir.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})

export class excluirCursos implements OnInit {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdicionarCurso>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  cursos: any = {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/cursos/' + this.data).subscribe(response => {
      this.cursos = response;
    });
  }

  load() {
      location.reload()
    }

  listarCurso(): void {
    this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deletarCurso(cursosId: string): void {
    this.http.delete('http://localhost:3000/cursos/' + cursosId).subscribe(response => {
      this._snackBar.open('O curso foi removido!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
      this.listarCurso();
      this.load()

    },
      error => {
        this._snackBar.open('Ocorreu um erro ao remover o curso ' + error, 'Fechar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
      });
  }

}