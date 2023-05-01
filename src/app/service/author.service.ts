import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../model/author';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class AuthorService {
private url=`${base_url}/authors`
private confirmarEliminacion = new Subject<Boolean>()
private listaCambio=new Subject<Author[]>()

  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Author[]>(this.url);
  }
  insert(author:Author){
    return this.http.post(this.url,author);
  }
  setList(ListaNueva:Author[]){
    this.listaCambio.next(ListaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Author>(`${this.url}/${id}`);
  }
  update(aut:Author){
    return this.http.put(this.url + "/" + aut.id, aut);
  }
   //http- HttpClientModule: get-post-put-delete, hacer un cuadro comparativo

   delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  getConfirmDelete(){
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmDelete(estado:Boolean){
    this.confirmarEliminacion.next(estado);
  }
}
