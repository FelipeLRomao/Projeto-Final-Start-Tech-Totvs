import { Component, Input, OnDestroy, OnInit, VERSION, Inject } from '@angular/core';
import { PoMenuItem, PoModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  } from '../admin/admin.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatIconModule, NgFor, NgIf, CommonModule, HttpClientModule, MatSnackBarModule]
})
export class HomeComponent implements OnInit {
  nome: string = 'CodeCreators';
  curso: any;
  cursos: any;
  //DIREÇÃO DO SNACK PARA EXIBIÇÃO NA TELA
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  breakpoint: number = (window.innerWidth <= 480) ? 1 : 4;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
      this.cursos = data;
    });
    this.iniciarTimer();
  }

  onResize(event: any): void {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 4;
  }
  //DETALHES EM MODAL
  abrirModalCurso(cursoId:string): void {
    this.dialog.open(detalheCurso, {
      width: '700px',
      height: '483px',
      data: cursoId
    });
  }

  // FAVORITANDO CURSOS
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
            this.curso.favorito = !this.cursos.favorito;
          }
        );
    });
  }

  //CARROSSEL
  // Guarda a referência do temporizador. Assim conseguimos interromper o temporizador a qualquer momento
  timerSubs!: Subscription;
  // Array com a URL das imagens do carrossel
  imagens: Array<any> = [
    'https://i.ibb.co/vsgyrd5/mayla.png',
    'https://i.ibb.co/R9k2ThM/felipe.png',
    'https://i.ibb.co/whwMfYq/brigit.png',
    'https://i.ibb.co/GxNwNkk/vitor.png',
    'https://i.ibb.co/nRWxnFQ/maylaforca.png',
    'https://i.ibb.co/ZKJ5wX5/karina.png'

  ];
  // Guarda a posição no array "imagens" que corresponde a imagem que está sendo exibidano carrossel
  private _indexImagemAtiva: number = 0;
  get indexImagemAtiva() {
    return this._indexImagemAtiva;
  }

  set indexImagemAtiva(value: number) {
    this._indexImagemAtiva =
      value < this.imagens.length ? value : 0;
  }

  ngOnDestroy(): void {
    this.pararTimer();
  }

  iniciarTimer(): void {
    this.timerSubs = timer(3000).subscribe(() => {
      this.ativarImagem(
        this.indexImagemAtiva + 1
      );
    });
  }

  pararTimer(): void {
    this.timerSubs?.unsubscribe();
  }

  ativarImagem(index: number): void {
    this.indexImagemAtiva = index;
    this.iniciarTimer();
  }

  todosCursos(): void {
    this.router.navigate(['/cursos'])
  }

}

@Component({
  selector: 'modalDetalhes',
  styleUrls: ['modalDetalhes.scss'],
  templateUrl: 'modalDetalhes.html',
  standalone: true,
  imports: [MatDialogModule, NgIf, NgFor],
})
export class detalheCurso implements OnInit{
  constructor(
    public dialog: MatDialog,
    public http : HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,) {}

    ngOnInit(): void {
      this.http.get<any>('http://localhost:3000/cursos/' + this.data).subscribe(response => {
        this.cursos = response;
      });
    }

    cursos: any = {}
  }

