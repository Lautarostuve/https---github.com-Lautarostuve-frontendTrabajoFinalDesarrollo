import { Tema } from './tema.model';
import { Docente } from './docente.model';
import { Alumno } from './alumno.model';

export class Curso {
  id: number;
  tema: Tema;
  fechaInicio: string;
  fechaFin: string;
  docente: Docente;
  precio: number;
  alumnos: Alumno[];

  constructor(
    id: number,
    tema: Tema,
    fechaInicio: string,
    fechaFin: string,
    docente: Docente,
    precio: number,
    alumnos: Alumno[]
  ) {
    this.id = id;
    this.tema = tema;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.docente = docente;
    this.precio = precio;
    this.alumnos = alumnos;
  }
}
