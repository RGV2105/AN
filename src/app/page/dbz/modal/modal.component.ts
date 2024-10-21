import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Affiliation, Gender, Item } from '../interfaces/dbzs';

@Component({
  selector: 'dbz-modal',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class DbzModalComponent implements AfterViewInit {
  
  @Input() public dbzCharacter: Item = {
    id: 0,
    name: '',
    ki: '',
    maxKi: '',
    race: '',
    gender: Gender.Male,
    description: '',
    image: '',
    affiliation: Affiliation.Freelancer,
    deletedAt: null,
    Data: {
      id: 0,
      name: '',
      ki: '',
      maxKi: '',
      race: '',
      gender: Gender.Male,
      description: '',
      image: '',
      affiliation: Affiliation.Freelancer, // Asignado como un valor de la enumeración
      deletedAt: null,
      originPlanet: {
        id: 0,
        name: '',
        isDestroyed: false,
        description: '',
        image: '',
        deletedAt: null
      },
      transformations: [] // Inicializado como un array vacío
    }
  };
  
    private bootstrapModal: any;
    @ViewChild('modalElement') public modalElement!: ElementRef;
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
    ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.initializeModal();
      }
    }
  
    initializeModal(): void {
      import('bootstrap').then((bootstrap) => {
        this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
      });
    }
  
    open(character: Item): void {
      if (character.Data) {
        // Asegúrate de que transformations se inicialice correctamente
        this.dbzCharacter = {
          ...character,
          Data: {
            ...character.Data,
            transformations: character.Data.transformations || [] // Asegura que transformations sea un array
          }
        };
        console.log('Data loaded:', this.dbzCharacter.Data);
      } else {
        console.warn('No data available for the character:', character);
        return;
      }
  
      if (isPlatformBrowser(this.platformId)) {
        if (this.bootstrapModal) {
          this.bootstrapModal.show();
        } else {
          this.initializeModal();
          setTimeout(() => {
            this.bootstrapModal.show();
          }, 0);
        }
      }
    }
  
    close(): void {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      }
    }
  }