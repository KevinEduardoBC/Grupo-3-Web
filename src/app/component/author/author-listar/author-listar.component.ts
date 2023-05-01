import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/model/author';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorService } from 'src/app/service/author.service';
import { MatDialog } from '@angular/material/dialog'
import { AuthorDialogoComponent } from './author-dialogo/author-dialogo.component';

@Component({
  selector: 'app-author-listar',
  templateUrl: './author-listar.component.html',
  styleUrls: ['./author-listar.component.css']
})
export class AuthorListarComponent implements OnInit{

  lista: Author[] = []
  dataSource: MatTableDataSource<Author>= new MatTableDataSource();
  idMayor: number = 0

  displayedColumns: string []=['codigo','titulo','descripcion','FechaPublicacion',
  'FechaDesaparicion','Vigente','accion01',]

  constructor(private aS:AuthorService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.aS.list().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
    })

    this.aS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(AuthorDialogoComponent);
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe(() => {
      this.aS.list().subscribe(data => {
        this.aS.setList(data);
      })
    })
  }
  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }

}
