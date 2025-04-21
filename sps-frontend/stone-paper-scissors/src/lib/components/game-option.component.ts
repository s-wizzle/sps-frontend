import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'primeng/card';
import { NgClass, NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'game-option',
  standalone: true,
  imports: [Card, NgClass, PrimeTemplate, NgIf],
  template: `
    <p-card
      (click)="selectOption()"
      [ngClass]="{ selected: selected }"
      class="p-card game-option"
    >
      <ng-template pTemplate="title">
        <img *ngIf="icon" [src]="icon" alt="{{ label }}" />
        <div>{{ label }}</div>
      </ng-template>
    </p-card>
  `,
  styles: [
    `
      .game-option {
        cursor: pointer;
        text-align: center;
        transition: transform 0.2s ease-in-out;
      }

      .game-option:hover {
        transform: scale(1.05);
      }

      .selected {
        border: 2px solid;
        box-shadow: 0 0 8px;
      }

      i {
        font-size: 1.5rem;
      }
    `,
  ],
})
export class GameOptionComponent {
  @Input() label = '';
  @Input() selected = false;
  @Input() selectable = true;
  @Input() icon = '';
  @Output() optionSelected = new EventEmitter<{ label: string, icon: string }>();

  selectOption() {
    if (this.selectable) {
      this.optionSelected.emit({ label: this.label, icon: this.icon });
    }
  }
}
