import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { Dbzs } from './interfaces/dbzs';
import { DbzService } from './servises/dbz.service';


@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [
    CardComponent,
    PaginacionComponent
  ],
  templateUrl: './dbz.component.html',
  styleUrls: ['./dbz.component.css'] // Corregido 'styleUrl' a 'styleUrls'
})
export class DbzComponent implements OnInit { // Cambiado de 'PokemonComponent' a 'DbzComponent'
  dbzs: Dbzs | undefined; // Cambiado 'pokemons' a 'dbzs' para mejor coherencia

  constructor(
    private _srcDbz: DbzService
  ) {}

  ngOnInit(): void {
    this._srcDbz.getDbzs().subscribe((dbzAll) => {
      dbzAll.items.forEach((dbz) => { // Corregido 'results' a 'items'
        this._srcDbz.getDbz(dbz.name).subscribe((dbzData) => {
          dbz.Data = dbzData;
        });
      });
      this.dbzs = dbzAll; // Corregido 'this.Dbzs' a 'this.dbzs'
    });
  }
}
