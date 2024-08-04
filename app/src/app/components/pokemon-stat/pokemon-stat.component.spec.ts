import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonStatComponent } from './pokemon-stat.component';

describe('PokemonStatComponent', () => {
  let component: PokemonStatComponent;
  let fixture: ComponentFixture<PokemonStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonStatComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and value', () => {
    component.title = 'Weight';
    component.value = '45';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.stat-title').textContent).toContain('Weight');
    expect(compiled.querySelector('.stat-desc').textContent).toContain('45');
  });
});
