import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dbz, Dbzs } from '../interfaces/dbzs';

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private apiURLBase: string = 'https://dragonball-api.com/api/characters';

  constructor(
    private http: HttpClient
  ) { }

  getDbzs(): Observable<Dbzs> {
    return this.http.get<Dbzs>(this.apiURLBase);
  }

  getDbz(termino: number): Observable<Dbz> {
    return this.http.get<Dbz>(`${this.apiURLBase}/${termino}`);
  }
}



