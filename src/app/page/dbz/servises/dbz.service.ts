import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dbz, Dbzs } from '../interfaces/dbzs';

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private apiURLBase: string = 'https://dragonball-api.com/api/characters';
  private next: string | null = null;
  private previous: string | null = null;

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de personajes, permite usar URL de paginación
  getDbzs(url: string = this.apiURLBase): Observable<Dbzs> {
    return this.http.get<Dbzs>(url);
  }

  // Método para obtener un personaje específico por ID o nombre
  getDbz(termino: number | string): Observable<Dbz> {
    return this.http.get<Dbz>(`${this.apiURLBase}/${termino}`);
  }

  // Setters para las URLs de paginación
  set nextURL(url: string | null) {
    this.next = url;
  }

  set prevURL(url: string | null) {
    this.previous = url;
  }

  // Getters para las URLs de paginación
  get nextURL(): string | null {
    return this.next;
  }

  get prevURL(): string | null {
    return this.previous;
  }

}



