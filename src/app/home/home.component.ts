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


}
