export class Alumno {
    id!: number;
    nombre!: string;
    fechaNacimiento!: string;
    
    constructor(nombre: string = '', fechaNacimiento: '' ) { //el id es autoincrementable
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
      }
}
5