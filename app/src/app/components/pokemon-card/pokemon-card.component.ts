import { Component, Input } from '@angular/core';
import { PokemonListModel } from '../../models/models';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemon: PokemonListModel | undefined;
}
