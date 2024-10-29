import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  maxDate: string = '';

  constructor(
    private alumnoService: AlumnoService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.alumnoForm = this.fb.group({
      nombre: [''],
      fechaNacimiento: ['', [Validators.required, this.maxDateValidator.bind(this)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.setMaxDate();

    
    
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
  
  //Setea la fecha maxima al dia actual.
  private setMaxDate() {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }
  
  // Validador personalizado para la fecha de nacimiento
  private maxDateValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value > this.maxDate) {
      return { maxDate: true };
    }
    return null;
  }
  
  
  
}
