import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dbz-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() public eventSearch = new EventEmitter<string>();
  public isSearching: boolean = false; // Inicializamos la propiedad isSearching

  searchDbz(termino: number | string): void {
    const termSearch = termino.toString().trim();

    // Si el término de búsqueda está vacío, recargamos la lista completa y actualizamos el estado
    if (termSearch.length === 0) {
      this.isSearching = false; // Asegúrate de tener esta propiedad en tu clase
      this.eventSearch.emit(''); // Emitimos un término vacío para recargar la lista completa
      return;
    }

    this.isSearching = true; // Actualizamos el estado de búsqueda
    // Emitimos el término de búsqueda
    this.eventSearch.emit(termSearch);
  }
}