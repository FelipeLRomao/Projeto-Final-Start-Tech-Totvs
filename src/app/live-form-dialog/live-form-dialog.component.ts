import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.scss']
})
export class LiveFormDialogComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>
    ) {}

    ngOnInit(): void{

      // Criando requisição tipo Get
      this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
        this.cursos = data;
      });
     }


   fechar(): void{
    this.dialogRef.close();

   }
     //  json cursos
     cursos: any;
  }


