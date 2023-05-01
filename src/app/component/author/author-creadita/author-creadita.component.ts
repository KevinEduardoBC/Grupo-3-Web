import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Author } from 'src/app/model/author';

import * as moment from 'moment';
import { AuthorService } from 'src/app/service/author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-author-creadita',
  templateUrl: './author-creadita.component.html',
  styleUrls: ['./author-creadita.component.css']
})
export class AuthorCreaditaComponent implements OnInit {
  form: FormGroup=new FormGroup({});
  author:Author=new Author();
  mensaje: String = "";
  maxFecha: Date = moment().add(-1,'days').toDate();
  id:number=0;
  edicion:boolean=false;

  constructor(private aS:AuthorService, private router: Router,
    private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    })
    this.form= new FormGroup({
      id:new FormControl(),
      Titulo:new FormControl(),
      Descripcion:new FormControl(),
      Fecha_Publicacion:new FormControl(),
      Fecha_Desaparicion:new FormControl(),
      Vigente:new FormControl(),

    });
  }
  aceptar():void{
   this.author.id= this.form.value['id'];
   this.author.Titulo= this.form.value['Titulo'];
   this.author.Descripcion= this.form.value['Descripcion'];
   this.author.Fecha_Publicacion= this.form.value['Fecha_Publicacion'];
   this.author.Fecha_Desaparicion= this.form.value['Fecha_Desaparicion'];
   this.author.Vigente= this.form.value['Vigente'];
   if (this.form.value['Vigente'].length>0) {


    if(this.edicion){
      //actualice
      this.aS.update(this.author).subscribe(()=>{
        this.aS.list().subscribe(data=>{
          this.aS.setList(data);
        })
      })

    }else{
      this.aS.insert(this.author).subscribe(data=>{
        this.aS.list().subscribe(data=> {
          this.aS.setList(data);
        })
      })
    }


    this.router.navigate(['authors']);
   } else{
    this.mensaje="!!Complete los campos requeridos de la manera adecuada!!";
   }
  }

  init(){
    if(this.edicion){
      this.aS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          id:new FormControl(data.id),
          Titulo: new FormControl(data.Titulo),
          Descripcion: new FormControl(data.Descripcion),
          Fecha_Publicacion: new FormControl(data.Fecha_Publicacion),
          Fecha_Desaparicion: new FormControl(data.Fecha_Desaparicion),
          Vigente: new FormControl(data.Vigente),
        })
      })
    }
  }

}
