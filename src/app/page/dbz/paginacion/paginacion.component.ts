import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DbzService } from '../servises/dbz.service';
import { Dbzs } from '../interfaces/dbzs';

@Component({
  selector: 'Dbz-pagi',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {

  @Output() public eventNewDbzs = new EventEmitter<Dbzs>();
  // Añadir propiedad para controlar la visibilidad de la paginación
  public isSearching: boolean = false; // Cambia esto según sea necesario

  constructor(
    private _srvDbz: DbzService
  ) { }

  get nextURL(): string | null {
    return this._srvDbz.nextURL;
  }

  get prevURL(): string | null {
    return this._srvDbz.prevURL;
  }

  loadDbzs(url: string): void {
    this._srvDbz.getDbzs(url).subscribe((dbzsAll) => {
      // Emitimos la lista completa de datos obtenidos
      this.eventNewDbzs.emit(dbzsAll);

      // Actualizamos los URLs de navegación después de obtener los datos
      this._srvDbz.nextURL = dbzsAll.links.next;
      this._srvDbz.prevURL = dbzsAll.links.previous;

      // Enriquecemos cada personaje con datos adicionales si es necesario
      dbzsAll.items.forEach((character) => {
        this._srvDbz.getDbz(character.id).subscribe((characterData) => {
          character.Data = characterData;
        });
      });
    });
  }
  // Método para actualizar el estado de búsqueda
  updateSearchState(isSearching: boolean): void {
    this.isSearching = isSearching;
  }

}