import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../model/tema.model';
//Este archivo hara las solicitudes crud al back
@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private baseUrl = 'http://localhost:8080/temas/'; 

  constructor(private http: HttpClient) { }

  // Obtener todos los temas
  obtenerTodosLosTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.baseUrl}`);
  }

  // Obtener un tema por ID
  obtenerTemaPorId(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.baseUrl}${id}`);
  }

  // Crear un nuevo tema, en el back hay un endpoint POST/temas que recibe un tema en el cuerpo de la solicitud
  guardarTema(tema: Tema): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, tema);
  }

  // Actualizar un tema
  actualizarTema(id: number, tema: Tema): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`, tema);
  }

  // Eliminar un tema
  eliminarTema(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
