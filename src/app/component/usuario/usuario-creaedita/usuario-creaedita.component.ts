import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import * as moment from 'moment'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-creaedita',
  templateUrl: './usuario-creaedita.component.html',
  styleUrls: ['./usuario-creaedita.component.css']
})
export class UsuarioCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()

  constructor(private uS: UsuarioService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      nombres: new FormControl(),
      apellidos: new FormControl(),
      email: new FormControl(),
      contrasena: new FormControl(),
      telefono: new FormControl()
    })

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null

      this.init()
    })
  }

  //método aceptar registro

  aceptar(): void {
    this.usuario.id = this.form.value['id']
    this.usuario.nombres = this.form.value['nombres']
    this.usuario.apellidos = this.form.value['apellidos']
    this.usuario.email = this.form.value['email']
    this.usuario.contrasena = this.form.value['contrasena']
    this.usuario.telefono = this.form.value['telefono']

    if (this.form.value['nombres'].length > 0 &&
      this.form.value['apellidos'].length > 0 &&
      this.form.value['email'].length > 0 &&
      this.form.value['contrasena'].length > 0 &&
      this.form.value['telefono'].length > 0) {


      if (this.edicion) {
        //actualizar
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      }
      else {
        //registrar

        this.uS.insert(this.usuario).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      }

      this.router.navigate(['usuarios'])
    }
  }

  //actualizar
  id: number = 0
  edicion: boolean = false

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombres: new FormControl(data.nombres),
          apellidos: new FormControl(data.apellidos),
          email: new FormControl(data.email),
          contrasena: new FormControl(data.contrasena),
          telefono: new FormControl(data.telefono)
        })
      })
    }
  }


}
