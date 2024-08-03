import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})


export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  searchQuery = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    console.log("hererer")
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe((data: any) => {
      this.pokemons = this.pokemons.concat(data.results);
    });
  }

  loadMore(): void {
    this.offset += this.limit;
    this.loadPokemons();
  }

  searchPokemons(): void {
    if (this.searchQuery) {
      this.pokemonService.getPokemon(this.searchQuery.toLowerCase()).subscribe((data: any) => {
        this.pokemons = [data];
      });
    } else {
      this.offset = 0;
      this.pokemons = [];
      this.loadPokemons();
    }
  }
}