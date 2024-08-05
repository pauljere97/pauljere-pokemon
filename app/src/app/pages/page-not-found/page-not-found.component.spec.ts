import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { By } from '@angular/platform-browser';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the path to window location hash on init', () => {
    const testHash = '#/test-path';
    window.location.hash = testHash;
    component.ngOnInit();
    expect(component.path).toBe('/test-path');
  });

  it('should display the path in the template', () => {
    component.path = '/test-path';
    fixture.detectChanges();
    const pathElement = fixture.debugElement.query(By.css('.pokemon-detail p')).nativeElement;
    expect(pathElement.textContent).toContain('/test-path');
  });

  it('should have a link to home', () => {
    const linkElement = fixture.debugElement.query(By.css('.not-found-link')).nativeElement;
    expect(linkElement.getAttribute('ng-reflect-router-link')).toBe('/');
  });
});
