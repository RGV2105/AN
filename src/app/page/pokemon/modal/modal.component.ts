import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Pokemon } from '../../pokemon/interfaces/pokemons';

@Component({
  selector: 'poke-modal',
  standalone: true,
  imports: [
    NgFor,
    TitleCasePipe,
    NgIf
   
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterViewInit {
  
  @Input() public pokemon: Pokemon = {
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: ''
    }
  } as Pokemon;

  private bootstrapModal: any; // Corregido de "bootdtrapModal" a "bootstrapModal"
  
  @ViewChild('modalElement') public modalElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeModal(); // Corregido "inicializeModal" a "initializeModal" para una mejor claridad
    }
  }

  initializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
    });
  }

  open(pokemon: Pokemon | null): void {
    // Verifica que el Pokémon no sea nulo
    if (!pokemon) {
      console.error("No se proporcionó un Pokémon válido.");
      return;
    }

    this.pokemon = pokemon; // Asigna el Pokémon a la propiedad del componente

    if (isPlatformBrowser(this.platformId)) {
      // Si el modal ya está inicializado, simplemente lo mostramos
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        // Si no está inicializado, lo inicializamos y luego lo mostramos
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close(): void {
    if (this.bootstrapModal) {
      this.bootstrapModal.hide(); // Asegúrate de que el modal esté inicializado antes de ocultarlo
    }
  }
}
