import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
    let service: PokemonService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PokemonService]
        });

        service = TestBed.inject(PokemonService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch pokemons', () => {
        const dummyPokemons = {
            results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }]
        };

        service.getPokemons(0, 20).subscribe(pokemons => {
            expect(pokemons.results.length).toBe(2);
            expect(pokemons.results).toEqual(dummyPokemons.results);
        });

        const req = httpMock.expectOne(`${service.apiUrl}?offset=0&limit=20`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyPokemons);
    });

    it('should fetch a single pokemon', () => {
        const dummyPokemon = { name: 'charizard' };

        service.getPokemon('charizard').subscribe(pokemon => {
            expect(pokemon).toEqual(dummyPokemon);
        });

        const req = httpMock.expectOne(`${service.apiUrl}/charizard`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyPokemon);
    });
});
