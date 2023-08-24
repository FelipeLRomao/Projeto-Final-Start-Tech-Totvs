import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { CursosComponent } from './cursos/cursos.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//MATERIAL UI
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { LiveFormDialogComponent } from './live-form-dialog/live-form-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    CursosComponent,
    FooterComponent,
    LiveFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatDialogModule

  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
