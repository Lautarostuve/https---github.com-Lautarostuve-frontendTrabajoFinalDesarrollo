import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../model/alumno.model';
//Este archivo hara las solicitudes crud al back
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private baseUrl = 'http://localhost:8080/alumnos'; // Asegúrate de que coincida con tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los alumnos
  obtenerTodosLosAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.baseUrl}`);
  }

  // Obtener un alumno por ID
  obtenerAlumnoPorId(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo alumno, en el back hay un endpoint POST/alumnos que recibe un alumno en el cuerpo de la solicitud
  guardarAlumno(alumno: Alumno): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, alumno);
  }

  // Actualizar un alumno
  actualizarAlumno(id: number, alumno: Alumno): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, alumno);
  }

  // Eliminar un alumno
  eliminarAlumno(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
