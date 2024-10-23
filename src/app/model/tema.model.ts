export class Tema {
    id!: number;
    nombre!: string;
    descripcion!: string;
  
    constructor(nombre: string = '', descripcion: string = '') {
      this.nombre = nombre;
      this.descripcion = descripcion;
    }
  }
  