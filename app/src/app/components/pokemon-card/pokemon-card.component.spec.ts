import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      imports: [RouterTestingModule, RouterLink],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render pokemon name, image, and hash', () => {
    const pokemon = {
      id: 1,
      hashID: '001',
      name: 'Bulbasaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    };

    component.pokemon = pokemon;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.font-three').textContent).toContain('Bulbasaur');
    expect(compiled.querySelector('.pokemon-image').src).toContain(pokemon.image);
    expect(compiled.querySelector('.pokemon-hash').textContent).toContain('#001');
  });
});
