import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from '../../services/tema.service';
import { DocenteService } from '../../services/docente.service';
import { AlumnoService } from '../../services/alumno.service';
import { Curso } from '../../model/curso.model';
import { Tema } from '../../model/tema.model';
import { Docente } from '../../model/docente.model';
import { Alumno } from '../../model/alumno.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]  // Asegúrate de importar ReactiveFormsModule
})
export class CursoFormComponent implements OnInit {

  cursoForm!: FormGroup;

  temas: Tema[] = [];
  docentes: Docente[] = [];
  alumnos: Alumno[] = [];

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private temaService: TemaService,
    private docenteService: DocenteService,
    private alumnoService: AlumnoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      tema: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      docente: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      alumnos: [[]]
    });

    // Cargar datos de temas, docentes y alumnos para los selectores
    this.cargarTemas();
    this.cargarDocentes();
    this.cargarAlumnos();

    // Si hay un ID en la ruta, significa que es una edicion
    const id = this.route.snapshot.params['id']; //.params['id'] recupera el valor del parametro id de la ruta 
    if (id) {
      this.cargarCurso(id);
    }
  }

  cargarTemas(): void {
    this.temaService.obtenerTodosLosTemas().subscribe((temas) => {
      this.temas = temas;
    });
  }

  cargarDocentes(): void {
    this.docenteService.obtenerTodosLosDocentes().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }

  cargarAlumnos(): void {
    this.alumnoService.obtenerTodosLosAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
  }

  cargarCurso(id: number): void {
    this.cursoService.obtenerCursoPorId(id).subscribe((curso: Curso) => {
      this.cursoForm.patchValue({
        tema: curso.tema,
        fechaInicio: curso.fechaInicio,
        fechaFin: curso.fechaFin,
        docente: curso.docente,
        precio: curso.precio,
        alumnos: curso.alumnos
      });
    });
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      const curso: Curso = {
        ...this.cursoForm.value,
        // No es necesario buscar el tema y el docente de nuevo, ya que el formulario debe contener el objeto completo
        alumnos: this.alumnos.filter(a => this.cursoForm.value.alumnos.includes(a.id))
          .map(alumno => ({ id: alumno.id, nombre: alumno.nombre })) 
      };
  
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.cursoService.actualizarCurso(id, curso).subscribe(() => {
          console.log('Curso actualizado con éxito');
          this.router.navigate(['/cursos']);
        });
      } else {
        this.cursoService.guardarCurso(curso).subscribe(() => {
          console.log('Curso creado con éxito');
          this.router.navigate(['/cursos']);
        });
      }
    }
  }
  

  
  
}

