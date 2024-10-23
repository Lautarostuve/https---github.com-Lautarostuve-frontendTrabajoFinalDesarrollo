import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TemaListComponent } from "./components/tema-list/tema-list.component";
import { AlumnoListComponent } from "./components/alumno-list/alumno-list.component";
import { DocenteListComponent } from "./components/docente-list/docente-list.component";
import { CursoListComponent } from "./components/curso-list/curso-list.component";
import { CentralComponent } from "./central/central.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemaListComponent, AlumnoListComponent, DocenteListComponent, CursoListComponent, CentralComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

