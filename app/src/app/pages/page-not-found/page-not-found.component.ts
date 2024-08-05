import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  path: string = ''
  ngOnInit(): void {
    this.path = window.location.hash.substring(1);
  }
}
