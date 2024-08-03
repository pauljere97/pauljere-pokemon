import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private readonly apiUrl = 'http://localhost:3000/api/pokemon';

    constructor(private http: HttpClient) { }

    getPokemons(offset: number, limit: number): Observable<any> {
        return this.http.get(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
    }

    getPokemon(name: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${name}`);
    }
}