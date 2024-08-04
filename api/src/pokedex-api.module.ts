import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [PokemonModule, HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class PokedexApiModule { }
