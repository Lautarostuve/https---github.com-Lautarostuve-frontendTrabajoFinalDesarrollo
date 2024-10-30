import { Routes } from '@angular/router';
import { TemaListComponent } from './components/tema-list/tema-list.component'; // Importar correctamente los componentes
import { TemaFormComponent } from './components/tema-form/tema-form.component';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component'; // Importar correctamente los componentes
import { AlumnoFormComponent } from './components/alumno-form/alumno-form.component';
import { DocenteListComponent } from './components/docente-list/docente-list.component';
import { DocenteFormComponent } from './components/docente-form/docente-form.component';
import { CursoFormComponent } from './components/curso-form/curso-form.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CentralComponent } from './central/central.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
  { path: 'temas', component: TemaListComponent },
  { path: 'agregar-tema', component: TemaFormComponent },
  { path: 'editar-tema/:id', component: TemaFormComponent },
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'agregar-alumno', component: AlumnoFormComponent },
  { path: 'editar-alumno/:id', component: AlumnoFormComponent },
  { path: 'docentes', component: DocenteListComponent},
  { path: 'agregar-docente', component: DocenteFormComponent },
  { path: 'editar-docente/:id', component: DocenteFormComponent },
  { path: 'cursos', component: CursoListComponent},
  { path: 'agregar-curso', component: CursoFormComponent },
  { path: 'editar-curso/:id', component: CursoFormComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/cursos', pathMatch: 'full' },
];
