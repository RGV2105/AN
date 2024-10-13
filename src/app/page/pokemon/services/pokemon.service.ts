import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private ApiUrlBase: string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) { }

  // Método para obtener un Pokémon por su nombre o id
  getPokemon(nameOrId: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.ApiUrlBase}${nameOrId}`);
  }

  // Método para obtener la lista de Pokémon con paginación
  getPokemonList(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${this.ApiUrlBase}?limit=${limit}&offset=${offset}`);
  }
}
