import { Component, Input } from '@angular/core';
import { GamesEntity } from '@sps-frontend/feature-stone-paper-scissors';
import { SpsTableComponent } from '../components/sps-table.component';

@Component({
  selector: 'data-page',
  template: ` <stone-paper-scissors-table [games]="games" /> `,
  styles: [],
  standalone: true,
  imports: [SpsTableComponent],
})
export class DataPageComponent {
  @Input() games: GamesEntity[] = [];
}
