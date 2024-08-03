import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class PokemonService {
    private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private readonly httpService: HttpService) { }

    getPokemons(offset: number, limit: number): Observable<any> {
        const requestLink = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
        return this.httpService.get(requestLink).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    getPokemon(name: string): Observable<any> {
        const requestLink = `${this.apiUrl}/${name}`;
        return this.httpService.get(requestLink).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }
}