import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Dbzs } from '../interfaces/dbzs';

@Component({
  selector: 'Dbz-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] // Corregido 'styleUrl' a 'styleUrls'
})
export class CardComponent implements OnChanges {
  @Input() public dbzAll: Dbzs | undefined; // Usar 'dbzAll' en lugar de 'DbzAll' para seguir las convenciones de nombres

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dbzAll']) { // Asegúrate de que el nombre coincida con el de la propiedad @Input
      this.dbzAll = changes['dbzAll'].currentValue;
    }
  }
}
