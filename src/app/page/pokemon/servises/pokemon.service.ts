import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, Pokemons } from '../interfaces/pokemons';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiURLBase: string= 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private htpp: HttpClient
  ) { }

  getPokemons(): Observable< Pokemons > {
    return this.htpp.get<Pokemons>(this.apiURLBase);

  }
  getPoquemon(termino: string | number ): Observable< Pokemon > {
    return this.htpp.get<Pokemon>(this.apiURLBase);
  }
 

}
