import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { PoMenuItem, PoModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subscription, timer} from 'rxjs';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { LiveFormDialogComponent } from '../live-form-dialog/live-form-dialog.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatIconModule, NgFor, NgIf,  CommonModule, PoModule, MatDialogModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog) {}
   // Guarda a referência do temporizador. Assim conseguimos interromper o temporizador a qualquer momento
   timerSubs!: Subscription;
   // Array com a URL das imagens do carrossel
    imagens: Array<any> = [
         'https://i.ibb.co/pZMtnYf/curso-gratuito-programacao-1.jpg',
         'https://i.ibb.co/Xk0pkBZ/tec-1.png',
         'https://i.ibb.co/y64yYpc/work.jpg'
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

     ngOnInit(): void {
       this.iniciarTimer();
     }

    //  Inicio códiogo Modal
   abrirModalCurso(): void{
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O dialogo ira fechar');
    });
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

    //  json cursos
    cursos:Array<any> = [

      {
        id: 1,
        name: "Python",
        description: "Começando com a linguagem",
        foto:"https://i.ibb.co/dLCkbFw/python.jpg",
        preco: "159.80",
        favorito: true
      },
      {
        id: 2,
        name: "Javascript para Web",
        description: "Crie páginas dinâmicas",
        foto: "https://i.ibb.co/jT3Bw8y/java-Script.jpg",
        preco: "220.79",
        favorito: true
      },
      {
        id: 3,
        name: "Angular",
        description: "Componentização e design com Angular Material",
        foto:"https://i.ibb.co/ky1kCL3/angular.jpg",
        preco: "275.20",
        favorito: true
      },
      {
        id: 4,
        name: "Inteligencia Artificial e UX",
        description: "Otimize a construção de um produto digital",
        foto: "https://i.ibb.co/n0BWBbw/artificial.jpg",
        preco: "280.15",
        favorito: true
      },
      {
        id: 5,
        name: "Mobile: IOS e HTTP",
        description: "Web Services e sicronização offine",
        foto: "https://i.ibb.co/Xj93ZLz/mobile.jpg",
        preco: "195.49",
        favorito: false
      },
      {
        id: 6,
        name: "HTML e CSS",
        description: "Praticando HTML/CSS",
        foto: "https://i.ibb.co/0c5Z330/html-css.webp",
        preco: "150.00",
        favorito: false
      },
      {
        id: 7,
        name: "SQL com MySQL",
        description: "Manipule e consulte dados",
        foto: "https://i.ibb.co/b7bbd7F/sql-mysql1.jpg",
        preco: "184.99",
        favorito: false
      },
      {
        id: 8,
        name: "UX Usability",
        description: "Facilite a vida do seu usuário no mobile",
        foto: "https://i.ibb.co/hVqgdSz/ux-usability.jpg",
        preco: "165.55",
        favorito: false
      },
      {
        id: 9,
        name: "Data Science",
        description: "Visualização de dados para saúde e medicina",
        foto: "https://i.ibb.co/dt4X5Gs/data-science.jpg",
        preco: "160.77",
        favorito: false
      },
      {
        id: 10,
        name: "Jogos Digitais",
        description: "Criação de programas e ambientes de jogos",
        foto: "https://i.ibb.co/QXcXHwn/desenvolvimento-de-jogos.png",
        preco: "230.49",
        favorito: false
      },
      {
        id: 11,
        name: "React",
        description: "lidando com arquivos estáticos",
        foto: "https://i.ibb.co/s96b5tw/react.webp",
        preco: "185.30",
        favorito: false
      },
      {
        id: 12,
        name: "Linux I",
        description: "conhecendo e utilizando o terminal",
        foto: "https://i.ibb.co/gFqfNZ8/linux.webp",
        preco: "275.00",
        favorito: false
      }
    ]
  }
