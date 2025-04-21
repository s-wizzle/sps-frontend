import { Component, Input } from '@angular/core';
import { GamesEntity } from '@sps-frontend/feature-stone-paper-scissors';
import { StonePaperScissorsTableComponent } from '../components/stone-paper-scissors-table.component';

@Component({
  selector: 'data-page',
  template: ` <stone-paper-scissors-table [games]="games"/> `,
  styles: ``,
  standalone: true,
  imports: [StonePaperScissorsTableComponent],
})
export class DataPageComponent {
  @Input() games: GamesEntity[] = [];
}
