import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dbz, Dbzs } from '../interfaces/dbzs';

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private apiURLBase: string= 'https://dragonball-api.com/api/characters';

  constructor(
    private htpp: HttpClient
  ) { }

 getDbzs(): Observable <Dbzs> {
  return this.htpp.get<Dbzs>(this.apiURLBase)
 }

 getDbz(termino: string | number ): Observable< Dbz > {
  return this.htpp.get<Dbz>(`${this.apiURLBase}/${termino}`);
}
  }



