import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../model/docente.model';
//Este archivo hara las solicitudes crud al back
@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private baseUrl = 'http://localhost:8080/docentes'; // Asegúrate de que coincida con tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los docentes
  obtenerTodosLosDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.baseUrl}/`);
  }

  // Obtener un docente por ID
  obtenerDocentePorId(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo docente, en el back hay un endpoint POST/docentes que recibe un docente en el cuerpo de la solicitud
  guardarDocente(docente: Docente): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, docente);
  }

  // Actualizar un docente
  actualizarDocente(id: number, docente: Docente): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, docente);
  }

  // Eliminar un docente
  eliminarDocente(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
