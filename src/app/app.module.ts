import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { CursosComponent } from './cursos/cursos.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//MATERIAL UI
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { LiveFormDialogComponent } from './live-form-dialog/live-form-dialog.component';
<<<<<<< HEAD
import { DetalhesComponent } from './detalhes/detalhes.component';
=======
import { AuthService } from './auth.service';
>>>>>>> 13970a92b15acfa542ecb09a18d7dc846884db75

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    CursosComponent,
    FooterComponent,
    LiveFormDialogComponent,
    LoginComponent,
    DetalhesComponent,
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
    NgFor,
    NgIf,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule

  ],
  providers:[
    [AuthService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
