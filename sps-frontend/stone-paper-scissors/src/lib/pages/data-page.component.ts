import {Component, Input} from '@angular/core';
import {GamesEntity} from "@sps-frontend/feature-stone-paper-scissors";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'data-page',
  template: `Games: {{ games | json }}`,
  styles: ``,
  standalone: true,
  imports: [JsonPipe],
})
export class DataPageComponent {
  @Input() games: GamesEntity[] = [];
}