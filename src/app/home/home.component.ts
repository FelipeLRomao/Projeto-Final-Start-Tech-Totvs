import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatIconModule, NgFor, NgIf,  CommonModule]
})
export class HomeComponent implements OnInit, OnDestroy {
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
