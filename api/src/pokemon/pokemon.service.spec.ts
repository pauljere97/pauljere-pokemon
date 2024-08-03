import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PokemonService } from './pokemon.service';
import { NotFoundException } from '@nestjs/common';

describe('PokemonService', () => {
    let service: PokemonService;
    let httpService: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [PokemonService],
        }).compile();

        service = module.get<PokemonService>(PokemonService);
        httpService = module.get<HttpService>(HttpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should fetch pokemons', done => {
        const result: AxiosResponse<any> | any = {
            data: { results: [{ name: 'bulbasaur' }] },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };

        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

        service.getPokemons(0, 20).subscribe(data => {
            expect(data.results.length).toBe(1);
            expect(data.results[0].name).toBe('bulbasaur');
            done();
        });
    });

    it('should fetch a single pokemon', done => {
        const result: AxiosResponse<any> | any = {
            data: { name: 'bulbasaur' },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };

        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

        service.getPokemon('bulbasaur').subscribe(data => {
            expect(data.name).toBe('bulbasaur');
            done();
        });
    });

    it('should throw a NotFoundException when pokemon not found', done => {
        jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
            throwError({ response: { status: 404, statusText: 'Not Found' } })
        );

        service.getPokemon('invalid').subscribe({
            next: () => done.fail('Expected an error, but got a success response'),
            error: error => {
                expect(error).toBeInstanceOf(NotFoundException);
                done();
            },
        });
    });
});
