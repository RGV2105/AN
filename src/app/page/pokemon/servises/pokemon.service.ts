import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, Pokemons } from '../interfaces/pokemons';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  [x: string]: any;

  private apiURLBase: string= 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private htpp: HttpClient
  ) { }

  getPokemons(): Observable< Pokemons > {
    return this.htpp.get<Pokemons>(this.apiURLBase);

  }
  getPokemon(termino: string | number ): Observable< Pokemon > {
    return this.htpp.get<Pokemon>(`${this.apiURLBase}/${termino}`);
  }


}
