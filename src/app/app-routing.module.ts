import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './component/author/author.component';
import { AuthorCreaditaComponent } from './component/author/author-creadita/author-creadita.component';

const routes: Routes = [
  {
    path:'authors',component:AuthorComponent,children:[
      { path:'nuevo', component:AuthorCreaditaComponent },
      {path:'edicion/:id', component:AuthorCreaditaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
