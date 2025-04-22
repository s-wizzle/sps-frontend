import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'game-mode-selector',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  template: `
    <div class="game-mode-selector">
      <p-dropdown
        [options]="modes"
        [(ngModel)]="selected"
        placeholder="Spielmodus wählen"
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
  @Input() selected = { label: 'Default', value: 'default' };
  @Output() modeChanged = new EventEmitter<{ label: string; value: string }>();

  modes = [
    { label: 'Default', value: 'default' },
    { label: 'Hard', value: 'hard' },
    { label: 'Expert', value: 'expert' },
  ];
}
