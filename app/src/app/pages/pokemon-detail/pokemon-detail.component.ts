import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../pokemon/pokemon.service';
import { PokemonModel } from '../../models/models';
import { UnsubscribeObservablesComponent } from '../../components/unsubscribe-observables/unsubscribe-observables.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})

export class PokemonDetailComponent extends UnsubscribeObservablesComponent implements OnInit, OnDestroy {
  pokemon: PokemonModel | undefined;
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    super();
  }

  name: string = '';
  showError: boolean = false;
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.name = name
      const subscription: Subscription = this.pokemonService.getPokemon(name).subscribe({
        next: (data: any) => {
          this.pokemon = this.getData(data);
        }, error: (err) => {
          this.showError = true
        }
      });
      this.subscriptions.push(subscription);
    } else {
      this.showError = true
    }
  }

  getData(data: any): PokemonModel {
    const { id, name, sprites, height, weight, types } = data
    const hashID = `#${id.toString().padStart(4, '0')}`
    const images = this.getImages(sprites)
    const selectedImage = images[0]
    const { type } = types[0]
    return {
      id, hashID, name, images, selectedImage,
      type: type.name, height, weight
    }
  }

  getImages(sprites: any): string[] {
    if (!sprites) return []
    const { other } = sprites
    const images: any = []

    for (const key in other.showdown) {
      if (Object.prototype.hasOwnProperty.call(other.showdown, key)) {
        if (typeof other.showdown[key] == 'string') {
          images.push(other.showdown[key])
        }
      }
    }

    if (!images.length) {
      for (const key in sprites) {
        if (Object.prototype.hasOwnProperty.call(sprites, key)) {
          if (typeof sprites[key] == 'string') {
            images.push(sprites[key])
          }
        }
      }
    }
    return images.reverse()
  }
}
