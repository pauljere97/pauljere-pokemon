import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { NotFoundException } from '@nestjs/common';

describe('PokemonController', () => {
    let controller: PokemonController;
    let service: PokemonService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [PokemonController],
            providers: [PokemonService],
        }).compile();

        controller = module.get<PokemonController>(PokemonController);
        service = module.get<PokemonService>(PokemonService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should get a list of pokemons', async () => {
        const result = { results: [{ name: 'bulbasaur' }] };
        jest.spyOn(service, 'getPokemons').mockReturnValue(of(result) as any);

        const pokemons = await controller.getPokemons(0, 20).toPromise();
        expect(pokemons).toEqual(result);
    });

    it('should get a single pokemon', async () => {
        const result = { name: 'bulbasaur' };
        jest.spyOn(service, 'getPokemon').mockReturnValue(of(result) as any);

        const pokemon = await controller.getPokemon('bulbasaur').toPromise();
        expect(pokemon).toEqual(result);
    });

    it('should handle NotFoundException when fetching a pokemon', async () => {
        jest.spyOn(service, 'getPokemon').mockReturnValue(throwError(new NotFoundException()));

        try {
            await controller.getPokemon('invalid').toPromise();
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
});
