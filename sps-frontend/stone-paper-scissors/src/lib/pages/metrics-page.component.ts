import { Component, Input } from '@angular/core';
import { GamesEntity } from '@sps-frontend/feature-stone-paper-scissors';

@Component({
  selector: 'metrics-page',
  template: ` Metrics page `,
  styles: ``,
  standalone: true,
  imports: [],
})
export class MetricsPageComponent {
  @Input() games: GamesEntity[] = [];
}
