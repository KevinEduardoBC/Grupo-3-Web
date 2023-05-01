export class Author{
  id: number = 0
  Titulo: string = ""
  Descripcion: string = ""
  Fecha_Publicacion: Date = new Date(Date.now())
  Fecha_Desaparicion: Date = new Date(Date.now())
  Vigente: string = ""
}
