import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-stat',
  templateUrl: './pokemon-stat.component.html',
  styleUrl: './pokemon-stat.component.scss'
})
export class PokemonStatComponent {
  @Input() title: string | undefined;
  @Input() value: string | undefined;
}
