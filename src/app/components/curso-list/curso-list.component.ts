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
export class CursoListComponent implements OnInit {

  cursos: Curso[] = []; 
  mostrarTodo: boolean[] = [];

  // Formulario para buscar por profesor y fecha
  buscarForm!: FormGroup;
  busquedaRealizada: boolean = false; 
  
  constructor(private cursoService: CursoService,private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerTodosLosCursos();

    // Inicializar el formulario
    this.buscarForm = this.fb.group({
      legajo: ['', [Validators.required]],  // Campo para legajo del profesor
      fecha: ['', [Validators.required]]    // Campo para la fecha
      
    });
  }

  obtenerTodosLosCursos() {
      this.cursoService.obtenerTodosLosCursos().subscribe(data => {
      this.cursos = data;
      this.mostrarTodo = new Array(this.cursos.length).fill(false);
      this.busquedaRealizada = false;
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
        (cursos: Curso[]) => {
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
