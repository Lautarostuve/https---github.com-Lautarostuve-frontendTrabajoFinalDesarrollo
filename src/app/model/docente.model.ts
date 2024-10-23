export class Docente {
    legajo!: number;
    nombre!: string;

    constructor(nombre: string = '') {
        this.nombre = nombre;
    }
}
