import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../pokemon/pokemon.service';
import { PokemonListModel } from '../../models/models';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

const pokemonImageLink = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})


export class PokemonListComponent implements OnInit {
  pokemons: PokemonListModel[] = [];
  offset: number = 0;
  limit: number = 20;
  searchQuery: string = '';

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

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
      this.router.navigateByUrl(`/pokemon/${this.searchQuery}`)
    }
  }
}