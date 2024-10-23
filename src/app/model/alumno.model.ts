export class Alumno {
    id!: number;
    nombre!: string;
    fechaNacimiento!: string;
    
    constructor(nombre: string = '', fechaNacimiento: '' ) {
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
      }
}
