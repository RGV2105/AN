import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Pokemons } from '../interfaces/pokemons';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges {
  @Input() public pokemonsAll: Pokemons | undefined;
  
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonAll']) {
      this.pokemonsAll = changes['pokemonAll'].currentValue;
    }
  }
  



}


