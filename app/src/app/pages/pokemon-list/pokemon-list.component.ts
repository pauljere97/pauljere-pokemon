import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../pokemon/pokemon.service';
import { PokemonListModel } from '../../models/models';
import { Router } from '@angular/router';
import { UnsubscribeObservablesComponent } from '../../components/unsubscribe-observables/unsubscribe-observables.component';

const pokemonImageLink = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})


export class PokemonListComponent extends UnsubscribeObservablesComponent implements OnInit, OnDestroy {
  pokemons: PokemonListModel[] = [];
  offset: number = 0;
  limit: number = 30;
  searchQuery: string = '';

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {
    super()
  }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    const subscription = this.pokemonService.getPokemons(this.offset, this.limit)
      .subscribe((data: any) => {
        this.pokemons = this.pokemons.concat(data.results).map(pokemon => this.getData(pokemon));
      });
    this.subscriptions.push(subscription);
  }

  getData(pokemon: any): PokemonListModel {
    let id = pokemon.id
    if (!id) id = pokemon.url.split('/')[6]
    const hashID = id.toString().padStart(4, '0')
    const image = `${pokemonImageLink}/${id}.png`
    return { id, image, hashID, name: pokemon.name };
  }

  loadMore(): void {
    this.searchQuery = ''
    this.offset += this.limit;
    this.loadPokemons();
  }

  searchPokemons(): void {
    if (this.searchQuery) {
      this.router.navigateByUrl(`/pokemon/${this.searchQuery}`)
    }
  }
}