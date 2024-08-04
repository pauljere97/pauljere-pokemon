import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonService } from '../../pokemon/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PokemonModel } from '../../models/models';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let pokemonService: PokemonService;

  const mockPokemon: PokemonModel = {
    id: 1,
    hashID: '#0001',
    name: 'bulbasaur',
    images: ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'],
    selectedImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    type: 'grass',
    height: '7',
    weight: '69'
  };

  const mockPokemonData = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
      other: {
        showdown: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        }
      }
    },
    height: '7',
    weight: '69',
    types: [{ type: { name: 'grass' } }]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        PokemonService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'bulbasaur' } }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);

    jest.spyOn(pokemonService, 'getPokemon').mockReturnValue(of(mockPokemonData));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and process pokemon data correctly with getData', () => {
    const result = component.getData(mockPokemonData);
    expect(result).toEqual(mockPokemon);
  });

  it('should fetch and display pokemon details on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.pokemon).toEqual(mockPokemon);
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.pokemon-name').textContent).toContain('bulbasaur');
      expect(compiled.querySelector('.pokemon-hash').textContent).toContain('#0001');
    });
  });

  it('should change selected image on click', () => {
    component.pokemon = component.getData(mockPokemonData);
    fixture.detectChanges();

    const compiled = fixture.debugElement;
    const imageToggle = compiled.query(By.css('.image-toggle'));
    imageToggle.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.pokemon.selectedImage).toBe(mockPokemon.images[0]);
  });
});
