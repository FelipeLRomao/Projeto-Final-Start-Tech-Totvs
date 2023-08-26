import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent  implements OnInit {

  cursoId: string | undefined;

  //  json cursos
  cursos: any;

  constructor(
    private router: ActivatedRoute,
    private http: HttpClient

    ) {}

    ngOnInit(): void {
      this.router.paramMap.subscribe(params => {
        this.cursoId = params.get('id') ?? '';
      });

      //rota do json cursos
      this.http.get<any>('http://localhost:3000/cursos').subscribe(data => {
        this.cursos = data;
      });
     }
}
