import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { GAME_MODE } from '@sps-frontend/feature-stone-paper-scissors';

@Component({
  selector: 'game-mode-selector',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  template: `
    <div class="game-mode-selector">
      <p-dropdown
        [options]="modes"
        [(ngModel)]="selected"
        placeholder="Select Game Mode"
        (onChange)="modeChanged.emit(selected)"
        optionLabel="label"
      ></p-dropdown>
    </div>
  `,
  styles: [
    `
      .game-mode-selector {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class GameModeSelectorComponent {
  @Input() selected = { label: 'Default', value: GAME_MODE.DEFAULT };
  @Output() modeChanged = new EventEmitter<{ label: string; value: GAME_MODE }>();

  modes = [
    { label: 'Default', value: GAME_MODE.DEFAULT },
    { label: 'Hard', value: GAME_MODE.HARD },
    { label: 'Expert', value: GAME_MODE.EXPERT },
  ];
}
