import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../pokemon/pokemon.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component'
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent, PokemonCardComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, RouterLink],
      providers: [PokemonService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pokemons on init', () => {
    const pokemons = {
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
    };
    jest.spyOn(pokemonService, 'getPokemons').mockReturnValue(of(pokemons));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.pokemons.length).toBeGreaterThan(0);
    expect(component.pokemons[0].name).toBe('bulbasaur');
  });

  it('should load more pokemons', () => {
    const pokemons = {
      results: [{ name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }]
    };
    jest.spyOn(pokemonService, 'getPokemons').mockReturnValue(of(pokemons));

    component.loadMore();
    fixture.detectChanges();

    expect(component.pokemons.length).toBeGreaterThan(0);
    expect(component.pokemons[0].name).toBe('ivysaur');
  });

  it('should search for pokemons', () => {
    const pokemon = { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' };
    jest.spyOn(pokemonService, 'getPokemon').mockReturnValue(of(pokemon));

    component.searchQuery = 'charizard';
    component.searchPokemons();
    fixture.detectChanges();

    expect(component.pokemons.length).toBe(1);
    expect(component.pokemons[0].name).toBe('charizard');
  });

  it('should clear search when search query is empty', () => {
    const pokemons = {
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
    };
    jest.spyOn(pokemonService, 'getPokemons').mockReturnValue(of(pokemons));

    component.searchQuery = '';
    component.searchPokemons();
    fixture.detectChanges();

    expect(component.pokemons.length).toBeGreaterThan(0);
    expect(component.pokemons[0].name).toBe('bulbasaur');
  });

  it('should render pokemon cards', () => {
    const pokemons = {
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
    };
    jest.spyOn(pokemonService, 'getPokemons').mockReturnValue(of(pokemons));

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('app-pokemon-card').length).toBeGreaterThan(0);
  });

  it('should call searchPokemons when enter key is pressed', () => {
    const searchSpy = jest.spyOn(component, 'searchPokemons');
    const input = fixture.debugElement.query(By.css('.search-input')).nativeElement;

    input.value = 'pikachu';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();

    expect(searchSpy).toHaveBeenCalled();
  });

  it('should call searchPokemons when search button is clicked', () => {
    const searchSpy = jest.spyOn(component, 'searchPokemons');
    const button = fixture.debugElement.query(By.css('.search-icon')).nativeElement;

    button.click();
    fixture.detectChanges();

    expect(searchSpy).toHaveBeenCalled();
  });

  it('should display "Load More" button when pokemons length is greater than 1', () => {
    component.pokemons = [
      { id: 1, hashID: '001', name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
      { id: 2, hashID: '002', name: 'ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' }
    ];
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('.pokemon-loadmore button'));
    expect(loadMoreButton.nativeElement.textContent).toContain('Load More');
  });

  it('should display "Clear" button when pokemons length is less than 2', () => {
    component.pokemons = [
      { id: 1, hashID: '001', name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' }
    ];
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.pokemon-loadmore button'));
    expect(clearButton.nativeElement.textContent).toContain('Clear');
  });
});
