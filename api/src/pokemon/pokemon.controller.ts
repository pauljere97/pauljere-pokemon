import { Controller, Get, Query, Param, UseFilters } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('pokemon')
@UseFilters(new HttpExceptionFilter())
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    getPokemons(@Query('offset') offset = 0, @Query('limit') limit = 20) {
        return this.pokemonService.getPokemons(Number(offset), Number(limit));
    }

    @Get(':name')
    getPokemon(@Param('name') name: string) {
        return this.pokemonService.getPokemon(name);
    }
}