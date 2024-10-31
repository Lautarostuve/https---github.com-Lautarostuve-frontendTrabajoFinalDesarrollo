import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../model/curso.model';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class CursoListComponent implements OnInit { //define el componente CursoList, que sera la lista de cursos. Se puede exportar, como en app.routes

  cursos: Curso[] = []; //contiene la lista de cursos del back, se llena cuando se hace el ngOnInit y la funcion obtenerTodosLosCursos
  mostrarTodo: boolean[] = [];

  // Formulario para buscar por profesor y fecha
  buscarForm!: FormGroup; 
  busquedaRealizada: boolean = false; 
  
  constructor(private cursoService: CursoService,private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerTodosLosCursos();

    // Inicializar el formulario para buscar por profesor y fecha
    this.buscarForm = this.fb.group({
      legajo: ['', [Validators.required]],  // Campo para legajo del profesor, validators indica que es requerido si o si para hacer la busqueda, si no es invalido
      fecha: ['', [Validators.required]]    // Campo para la fecha
      
    });
  }

  obtenerTodosLosCursos() {
      this.cursoService.obtenerTodosLosCursos().subscribe(data => { //se suscribe al observable obtenerTodosLosCursos(), que obtiene datos de los cursos. Cuando los datos llegan, son pasados a la función donde se asignan a this.cursos.
      this.cursos = data; //No puedo asignar directamente el resultado de obtenerTodosLosCursos, ya que es un observable, debo hacer el suscribe
      this.mostrarTodo = new Array(this.cursos.length).fill(false); //es un array que en cada posicion tiene un true o false, indicando si se presiono en ver mas o no en cada curso
      this.busquedaRealizada = false; //para ver si se realizo una busqueda y desbloquear el boton de mostrar todos los cursos
    });
  }
  // Mostrar todos los alumnos del curso seleccionado
  verMas(index: number) {
    this.mostrarTodo[index] = true;
  }

  // Ocultar los alumnos extra del curso seleccionado
  verMenos(index: number) {
    this.mostrarTodo[index] = false;
  }

  // Eliminar curso
  eliminarCurso(id: number) {
    this.cursoService.eliminarCurso(id).subscribe(
      () => {
      console.log('Curso eliminado con éxito');
      this.obtenerTodosLosCursos(); // Recargar la lista después de eliminar
      },
      error => {
        if (error.status === 500) {
          console.log('No fue posible eliminar el curso porque está asignado a un curso.')     
        } else {
          console.log('Error al intentar eliminar el curso.')
      }
    });
  }

  navegarAFormularioAgregar() {
    this.router.navigate(['/agregar-curso']);
  }

  // Navegar al formulario para editar un curso
  navegarAFormularioEditar(id: number) {
    this.router.navigate(['/editar-curso', id]);
  }

  // Buscar cursos por profesor y fecha
  buscarCursosPorProfesor() {
    if (this.buscarForm.valid) {
      const legajo = this.buscarForm.value.legajo;
      const fecha = this.buscarForm.value.fecha;
      
      this.cursoService.obtenerCursosVigentesPorProfesor(fecha,legajo).subscribe(
        (cursos: Curso[]) => { //podria haber puesto data
          this.cursos = cursos;  // Actualizar la lista de cursos con los resultados de la búsqueda
          this.busquedaRealizada = true;
        },
        error => {
          console.log('Error al buscar cursos por profesor y fecha:', error);
        }
      );
    }
  }

}
