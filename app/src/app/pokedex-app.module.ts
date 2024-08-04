import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterLink, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { routes } from './pokedex-app.routes';
import { PokedexAppComponent } from "./pokedex-app.component";
import { PokemonService } from "./pokemon/pokemon.service";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { PokemonDetailComponent } from "./pages/pokemon-detail/pokemon-detail.component";
import { PokemonListComponent } from "./pages/pokemon-list/pokemon-list.component";
import { PokemonCardComponent } from "./components/pokemon-card/pokemon-card.component";
import { PokemonStatComponent } from "./components/pokemon-stat/pokemon-stat.component";

@NgModule({
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    PokemonService,
    provideAnimationsAsync(),
  ],
  declarations: [
    PokedexAppComponent,
    PokemonDetailComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonStatComponent,
  ],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule { }
