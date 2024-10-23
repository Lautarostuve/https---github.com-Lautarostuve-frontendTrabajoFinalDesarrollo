import { Component, OnInit } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../model/tema.model';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tema-list',
  standalone: true,
  templateUrl: './tema-list.component.html',
  styleUrls: ['./tema-list.component.css'],
  imports: [CommonModule]
})
export class TemaListComponent implements OnInit {

  temas?: Tema[];

  constructor(private temaService: TemaService,private router: Router) { }

  ngOnInit(): void {
    this.obtenerTodosLosTemas();
  }

  private obtenerTodosLosTemas() {
    this.temaService.obtenerTodosLosTemas().subscribe(data => {
      this.temas = data;
    });
  }

  // Eliminar tema
  eliminarTema(id: number) {
    this.temaService.eliminarTema(id).subscribe(
      () => {
      console.log('Tema eliminado con éxito');
      this.obtenerTodosLosTemas(); // Recargar la lista después de eliminar
      },
      error => {
        if (error.status === 500) {
          console.log('No fue posible eliminar el tema porque está asignado a un curso.')     
        } else {
          console.log('Error al intentar eliminar el tema.')
      }
    });
  }

  navegarAFormularioAgregar() {
    this.router.navigate(['/agregar-tema']);
  }

  // Navegar al formulario para editar un tema
  navegarAFormularioEditar(id: number) {
    this.router.navigate(['/editar-tema', id]);
  }

}
