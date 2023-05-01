import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './component/author/author.component';
import { AuthorListarComponent } from './component/author/author-listar/author-listar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { AuthorCreaditaComponent } from './component/author/author-creadita/author-creadita.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { AuthorDialogoComponent } from './component/author/author-listar/author-dialogo/author-dialogo.component'
import { MatDialogModule } from '@angular/material/dialog'


@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    AuthorListarComponent,
    AuthorCreaditaComponent,
    AuthorDialogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
