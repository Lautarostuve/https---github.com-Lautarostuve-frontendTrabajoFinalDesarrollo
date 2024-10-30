import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../model/alumno.model';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css'],
  imports: [CommonModule]
})
export class AlumnoListComponent implements OnInit {

  alumnos?: Alumno[];
  mensajeError: string = ''; // Variable para almacenar el mensaje de error

  constructor(private alumnoService: AlumnoService,private router: Router) { }

  ngOnInit(): void {
    this.obtenerTodosLosAlumnos();
  }

  private obtenerTodosLosAlumnos() {
    this.alumnoService.obtenerTodosLosAlumnos().subscribe(data => {
      this.alumnos = data;
    });
  }

  // Eliminar alumno
  eliminarAlumno(id: number) {
    this.alumnoService.eliminarAlumno(id).subscribe(
      () => {
      console.log('Alumno eliminado con éxito');
      this.obtenerTodosLosAlumnos(); // Recargar la lista después de eliminar
      this.mensajeError = '';
      },
      error => {
        if (error.status === 500) {
          console.log('No fue posible eliminar el alumno porque está asignado a un curso.')
          this.mensajeError = 'No fue posible eliminar el alumno porque está asignado a un curso.';
        } else {
          console.log('Error al intentar eliminar el alumno.')
          this.mensajeError = 'Error al intentar eliminar el alumno.'
      }
    });
  }

  navegarAFormularioAgregar() {
    this.router.navigate(['/agregar-alumno']);
  }

  // Navegar al formulario para editar un alumno
  navegarAFormularioEditar(id: number) {
    this.router.navigate(['/editar-alumno', id]);
  }

}
