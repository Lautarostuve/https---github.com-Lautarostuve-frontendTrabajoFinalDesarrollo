import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../model/curso.model';
//Este archivo hara las solicitudes crud al back
@Injectable({  //le indica a Angular que puede instanciar esta clase e inyectarla en otros componentes
  providedIn: 'root' // Hace que el servicio esté disponible en toda la app
})
export class CursoService {
  private baseUrl = 'http://localhost:8080/cursos'; 

  constructor(private http: HttpClient) { } //HttpClient es una clase que provee Angular para realizar solicitudes HTTP

  // Obtener todos los cursos
  obtenerTodosLosCursos(): Observable<Curso[]> { //Observable permite retornar datos que pueden ser observados o suscritos en componentes
    return this.http.get<Curso[]>(`${this.baseUrl}`);
  }

  // Obtener un curso por ID
  obtenerCursoPorFechaFin(fechaFin: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseUrl}/${fechaFin}`);
  }
  
  // Obtener un curso por ID
  obtenerCursoPorId(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseUrl}/${id}`);
  }
  
  //Obtener los cursos vigentes de un profesor:
  obtenerCursosVigentesPorProfesor(fechaFin: string,legajo: number): Observable<Curso[]>{
    return this.http.get<Curso[]>(`${this.baseUrl}/profesor/${fechaFin}/${legajo}`)
  }

  // Crear un nuevo curso, en el back hay un endpoint POST/cursos que recibe un curso en el cuerpo de la solicitud
  guardarCurso(curso: Curso): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, curso);
  }

  // Actualizar un curso
  actualizarCurso(id: number, curso: Curso): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, curso);
  }

  // Eliminar un curso
  eliminarCurso(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
