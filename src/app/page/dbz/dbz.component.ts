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
  styleUrl: './dbz.component.css'
})
export class DbzComponent implements OnInit { 
  dbzs: Dbzs | undefined; 

  constructor(
    private _srcDbz: DbzService
  ) {}

  ngOnInit(): void {
    this._srcDbz.getDbzs().subscribe((dbzAll) => {
      dbzAll.items.forEach((dbz) => { 
        this._srcDbz.getDbz(dbz.id).subscribe((dbzData) => {
          dbz.Data = dbzData;
        });
      });
      this.dbzs = dbzAll; 
    });
  }
}
