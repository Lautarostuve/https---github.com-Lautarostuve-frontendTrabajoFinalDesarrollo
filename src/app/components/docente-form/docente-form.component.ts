import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DocenteService } from '../../services/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { Docente } from '../../model/docente.model';

@Component({
  selector: 'app-docente-form',
  standalone: true,
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.css'],
  imports: [ReactiveFormsModule,CommonModule]  // Importamos ReactiveFormsModule
})
export class DocenteFormComponent {

  docenteForm: FormGroup;

  constructor(
    private docenteService: DocenteService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.docenteForm = this.fb.group({
      nombre: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.docenteService.obtenerDocentePorId(id).subscribe(data => {
        this.docenteForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.docenteForm.valid) {
      const docente: Docente = new Docente(
        this.docenteForm.value.nombre
      );
  
      const id = this.route.snapshot.params['id'];
  
      if (id) {
        this.docenteService.actualizarDocente(id, docente).subscribe(() => {
          console.log('Docente actualizado con éxito');
          this.router.navigate(['/docentes']);
        });
      } else {
        this.docenteService.guardarDocente(docente).subscribe(() => {
          console.log('Docente creado con éxito');
          this.router.navigate(['/docentes']);
        });
      }
    }
  }
  
  

  
  
}
