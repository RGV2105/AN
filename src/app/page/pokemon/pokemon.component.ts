import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { Pokemons } from './interfaces/pokemons';
import { PokemonService } from './servises/pokemon.service';





@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    CardComponent,
    PaginacionComponent,

  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemons | undefined ;

  constructor(
    private _srcPokemon: PokemonService
  ) {}
  ngOnInit(): void {
    this._srcPokemon.getPokemons().subscribe((pokemonall) => {
      pokemonall.results.forEach((pokemon) => {
        this._srcPokemon.getPokemon(pokemon.name).subscribe((pokemonData) => {
          pokemon.data = pokemonData;
        });
      });
      this.pokemons = pokemonall;
    });
  }
  

}
