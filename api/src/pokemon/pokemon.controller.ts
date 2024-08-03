import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    getPokemons(@Query('offset') offset = 0, @Query('limit') limit = 20) {
        return this.pokemonService.getPokemons(Number(offset), Number(limit));;
    }

    @Get(':name')
    getPokemon(@Param('name') name: string) {
        try {
            return this.pokemonService.getPokemon(name);
        } catch (err) {
            throw new NotFoundException()
        }
    }
}