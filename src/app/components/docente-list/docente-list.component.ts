import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../model/docente.model';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css'],
  imports: [CommonModule]
})
export class DocenteListComponent implements OnInit {

  docentes?: Docente[];

  constructor(private docenteService: DocenteService,private router: Router) { }

  ngOnInit(): void {
    this.obtenerTodosLosDocentes();
  }

  private obtenerTodosLosDocentes() {
    this.docenteService.obtenerTodosLosDocentes().subscribe(data => {
      this.docentes = data;
    });
  }

  // Eliminar docente
  eliminarDocente(id: number) {
    this.docenteService.eliminarDocente(id).subscribe(
      () => {
      console.log('Docente eliminado con éxito');
      this.obtenerTodosLosDocentes(); // Recargar la lista después de eliminar
      },
      error => {
        if (error.status === 500) {
          console.log('No fue posible eliminar el docente porque está asignado a un curso.')     
        } else {
          console.log('Error al intentar eliminar el docente.')
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
