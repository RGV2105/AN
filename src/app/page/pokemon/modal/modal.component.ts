import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
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
export class ModalComponent {

  @Input() public pokemon: Pokemon = {
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: ''
    }
  } as Pokemon;

  private bootdtrapModal: any;
  @ViewChild('modalElement') public modalElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializeModal();
    }
  }
  inicializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootdtrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
    })
  }

  open(pokemon: Pokemon): void {
    this.pokemon = pokemon;
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootdtrapModal) {
        this.bootdtrapModal.show();
      } else {
        this.inicializeModal();
        setTimeout(() => {
          this.bootdtrapModal.show();
        }, 0)
      }
    }

  }


  close(): void {
    this.bootdtrapModal.hide();
  }
}



