import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PaginacionComponent } from './paginacion/paginacion.component';




@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports:[
    CardComponent,
    PaginacionComponent,
   
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {

}
