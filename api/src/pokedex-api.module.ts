import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PokemonModule, HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokedexApiModule { }
