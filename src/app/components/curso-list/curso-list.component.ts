import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../model/curso.model';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
  imports: [CommonModule]
})
export class CursoListComponent implements OnInit {

  cursos: Curso[] = []; 
  mostrarTodo: boolean[] = [];

  constructor(private cursoService: CursoService,private router: Router) { }

  ngOnInit(): void {
    this.obtenerTodosLosCursos();
  }

  private obtenerTodosLosCursos() {
    this.cursoService.obtenerTodosLosCursos().subscribe(data => {
      this.cursos = data;
      this.mostrarTodo = new Array(this.cursos.length).fill(false);
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

}
