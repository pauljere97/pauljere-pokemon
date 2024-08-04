import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    public readonly apiUrl = 'http://localhost:3000/api/pokemon';

    constructor(private http: HttpClient) { }

    getPokemons(offset: number, limit: number): Observable<any> {
        return this.http.get(`${this.apiUrl}?offset=${offset}&limit=${limit}`).pipe(
            catchError(this.handleError)
        );
    }

    getPokemon(name: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${name}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `A client-side error occurred: ${error.error.message}`;
        } else {
            switch (error.status) {
                case 404:
                    errorMessage = 'Pokemon not found';
                    break;
                case 500:
                    errorMessage = 'An internal server error occurred';
                    break;
                default:
                    errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
                    break;
            }
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
