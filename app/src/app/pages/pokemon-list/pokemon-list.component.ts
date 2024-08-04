import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../pokemon/pokemon.service';
import { PokemonListModel } from '../../models/models';

const pokemonImageLink = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})


export class PokemonListComponent implements OnInit {
  pokemons: PokemonListModel[] = [];
  offset = 0;
  limit = 20;
  searchQuery = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons(this.offset, this.limit)
      .subscribe((data: any) => {
        this.pokemons = this.pokemons.concat(data.results).map(pokemon => this.getData(pokemon));
      });
  }

  getData(pokemon: any): PokemonListModel {
    let id = pokemon.id
    if (!id) id = pokemon.url.split('/')[6]
    const hashID = id.toString().padStart(4, '0')
    const image = this.getPokemonImage(id)
    return { id, image, hashID, name: pokemon.name };
  }

  getPokemonImage(id: string) {
    return `${pokemonImageLink}/${id}.png`
  }

  loadMore(): void {
    this.searchQuery = ''
    this.offset += this.limit;
    this.loadPokemons();
  }

  searchPokemons(): void {
    if (this.searchQuery) {
      this.pokemons = []
      this.pokemonService.getPokemon(this.searchQuery.toLowerCase()).subscribe((data: any) => {
        this.pokemons = [this.getData(data)];
      });
    } else {
      this.offset = 0;
      this.pokemons = [];
      this.loadPokemons();
    }
  }
}