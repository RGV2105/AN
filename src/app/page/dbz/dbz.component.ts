import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { Affiliation, Dbzs, Gender,Item } from './interfaces/dbzs';
import { DbzService } from './servises/dbz.service';
import { SearchComponent } from './search/search.component';
import { forkJoin, tap } from 'rxjs';



@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [
    CardComponent,
    PaginacionComponent,
    SearchComponent
  ],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css'
})
export class DbzComponent implements OnInit {
  dbzs: Dbzs | undefined;

  constructor(
    private _srvDbz: DbzService
  ) { }

  ngOnInit(): void {
    this._srvDbz.getDbzs().subscribe((dbzAll) => {
      // Creamos un arreglo de observables para obtener los detalles de cada personaje.
      const characterDetailsObservables = dbzAll.items.map((dbz) => 
        this._srvDbz.getDbz(dbz.id).pipe(
          tap((dbzData) => {
            dbz.Data = dbzData;
          })
        )
      );
  
      // Ejecutamos todos los observables de forma paralela.
      forkJoin(characterDetailsObservables).subscribe(() => {
        // Una vez que todos los datos están cargados, establecemos las URLs de navegación.
        this._srvDbz.nextURL = dbzAll.links.next;
        this._srvDbz.prevURL = dbzAll.links.previous;
        
        // Asignamos los datos completos a `this.dbzs`.
        this.dbzs = dbzAll;
      });
    });
  }
  

  setNewDbz(DbzsNew: Dbzs): void {
    this.dbzs = DbzsNew;
  }
  
  searchDbz(termino: number | string): void {
    const termSearch = termino.toString().trim().toLowerCase();
  
    if (!termSearch) {
      // Si el término está vacío, recargamos la lista completa.
      this.ngOnInit();
      return;
    }
  
    if (!isNaN(+termSearch)) {
      // Si el término es un número, se asume que es un ID y se realiza la búsqueda por ID.
      this._srvDbz.getDbz(termSearch).subscribe(
        (character) => {
          // Construimos un objeto Dbzs con solo un elemento.
          this.dbzs = {
            meta: {
              totalItems: 1,
              itemCount: 1,
              itemsPerPage: 1,
              totalPages: 1,
              currentPage: 1,
            },
            links: {
              first: '',
              previous: '',
              next: '',
              last: '',
            },
            items: [
              {
                id: character.id,
                name: character.name,
                ki: character.ki,
                maxKi: character.maxKi,
                race: character.race,
                gender: character.gender as Gender,
                description: character.description,
                image: character.image,
                affiliation: character.affiliation as Affiliation,
                deletedAt: character.deletedAt,
                Data: character,
              },
            ],
          };
          // Deshabilitamos la navegación de la paginación ya que solo hay un resultado.
          this._srvDbz.nextURL = null;
          this._srvDbz.prevURL = null;
        },
        (error) => {
          console.error('Personaje no encontrado:', error);
          // Manejo de error, como mostrar un mensaje en la interfaz.
        }
      );
    } else {
      // Si el término es un string (nombre), se filtra la lista de personajes cargados.
      const filteredItems = this.dbzs?.items?.filter((item) =>
        item.name.toLowerCase().includes(termSearch)
      ) || [];
  
      // Verificamos si hay resultados.
      if (filteredItems.length > 0) {
        // Actualizar la lista de personajes filtrados.
        this.dbzs = {
          ...this.dbzs,
          meta: {
            totalItems: filteredItems.length,
            itemCount: filteredItems.length,
            itemsPerPage: filteredItems.length,
            totalPages: 1,
            currentPage: 1,
          },
          items: filteredItems,
          links: {
            first: '',
            previous: '',
            next: '',
            last: '',
          },
        };
      } else {
        // Manejo de caso sin resultados, como mostrar un mensaje en la interfaz.
        console.warn('No se encontraron personajes con el nombre:', termSearch);
      }
    }
  }
  
  
  

}
