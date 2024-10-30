import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../model/docente.model';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css'],
  imports: [CommonModule,FormsModule]
})
export class DocenteListComponent implements OnInit {

  docentes?: Docente[];
  alumnos: string[] = [];  // Lista de alumnos obtenidos por docente
  legajoDocente: number = 0;  // Legajo del docente para la búsqueda

  constructor(private docenteService: DocenteService,private router: Router) { }

  ngOnInit(): void {
    this.obtenerTodosLosDocentes();
  }

  private obtenerTodosLosDocentes() {
    this.docenteService.obtenerTodosLosDocentes().subscribe(data => {
      this.docentes = data;
    });
  }


  // Buscar alumnos por legajo de docente
  buscarAlumnosPorDocente() {
    this.docenteService.obtenerAlumnosPorDocente(this.legajoDocente).subscribe(
      data => {
        this.alumnos = data ?? [];
      },
      error => {
        console.log('Error al obtener los alumnos del docente.');
      }
    );
  }

  mensajeError: string | null = null; // Propiedad para el mensaje de error
  // Eliminar docente
  eliminarDocente(id: number) {
    this.docenteService.eliminarDocente(id).subscribe(
      () => {
      console.log('Docente eliminado con éxito');
      this.obtenerTodosLosDocentes(); // Recargar la lista después de eliminar
      this.mensajeError = null;
      },
      error => {
        if (error.status === 500) {
          console.log('No fue posible eliminar el docente porque está asignado a un curso.');
          this.mensajeError = "No fue posible eliminar el docente porque está asignado a un curso."   
        } else {
          console.log('Error al intentar eliminar el docente.')
          this.mensajeError = "No fue posible eliminar el docente porque está asignado a un curso."
      }
    });
  }

  navegarAFormularioAgregar() {
    this.router.navigate(['/agregar-docente']);
  }

  // Navegar al formulario para editar un docente
  navegarAFormularioEditar(id: number) {
    this.router.navigate(['/editar-docente', id]);
  }

}
