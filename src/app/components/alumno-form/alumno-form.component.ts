import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { Alumno } from '../../model/alumno.model';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css'],
  imports: [ReactiveFormsModule,CommonModule]  // Importamos ReactiveFormsModule
})
export class AlumnoFormComponent {

  alumnoForm: FormGroup;

  constructor(
    private alumnoService: AlumnoService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.alumnoForm = this.fb.group({
      nombre: [''],
      fechaNacimiento: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.alumnoService.obtenerAlumnoPorId(id).subscribe(data => {
        this.alumnoForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      const alumno: Alumno = new Alumno(
        this.alumnoForm.value.nombre,
        this.alumnoForm.value.fechaNacimiento // Directamente como string
      );
  
      const id = this.route.snapshot.params['id'];
  
      if (id) {
        this.alumnoService.actualizarAlumno(id, alumno).subscribe(() => {
          console.log('Alumno actualizado con éxito');
          this.router.navigate(['/alumnos']);
        });
      } else {
        this.alumnoService.guardarAlumno(alumno).subscribe(() => {
          console.log('Alumno creado con éxito');
          this.router.navigate(['/alumnos']);
        });
      }
    }
  }
  
  

  
  formatDate(fecha: Date): string {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Añade el 0 si es necesario
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`; // Retorna en formato YYYY-MM-DD
  }
  
  
}