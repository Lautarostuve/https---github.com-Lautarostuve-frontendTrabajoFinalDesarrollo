import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../model/curso.model';
//Este archivo hara las solicitudes crud al back
@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private baseUrl = 'http://localhost:8080/cursos'; // Asegúrate de que coincida con tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los cursos
  obtenerTodosLosCursos(): Observable<Curso[]> {
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
