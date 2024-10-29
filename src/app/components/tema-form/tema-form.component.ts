import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemaService } from '../../services/tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { Tema } from '../../model/tema.model';

@Component({
  selector: 'app-tema-form',
  standalone: true,
  templateUrl: './tema-form.component.html',
  styleUrls: ['./tema-form.component.css'],
  imports: [ReactiveFormsModule,CommonModule]  // Importamos ReactiveFormsModule
})
export class TemaFormComponent {

  temaForm: FormGroup;

  constructor(
    private temaService: TemaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.temaForm = this.fb.group({
      nombre: [''],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.temaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]]
    });
    
    if (id) {
      this.temaService.obtenerTemaPorId(id).subscribe(data => {
        this.temaForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.temaForm.valid) {
      const tema: Tema = new Tema(
        this.temaForm.value.nombre,
        this.temaForm.value.descripcion
      );
  
      const id = this.route.snapshot.params['id'];
  
      if (id) {
        this.temaService.actualizarTema(id, tema).subscribe(() => {
          console.log('Tema actualizado con éxito');
          this.router.navigate(['/temas']);
        });
      } else {
        this.temaService.guardarTema(tema).subscribe(() => {
          console.log('Tema creado con éxito');
          this.router.navigate(['/temas']);
        });
      }
    }
  }
  
}
