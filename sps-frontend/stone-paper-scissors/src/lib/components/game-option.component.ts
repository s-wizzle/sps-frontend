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
      [ngClass]="{
        selected: selected,
        winner: isWinner === true,
        loser: isWinner === false,
        tie: isTie
      }"
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

      .winner {
        border: 2px solid green;
        box-shadow: 0 0 8px green;
      }

      .loser {
        border: 2px solid red;
        box-shadow: 0 0 8px red;
      }

      .tie {
        border: 2px solid gold;
        box-shadow: 0 0 8px gold;
      }
    `,
  ],
})
export class GameOptionComponent {
  @Input() label = '';
  @Input() selected = false;
  @Input() selectable = true;
  @Input() icon = '';
  @Input() isWinner: boolean | null = null;
  @Input() isTie: boolean = false;
  @Output() optionSelected = new EventEmitter<{
    label: string;
    icon: string;
  }>();

  selectOption() {
    if (this.selectable) {
      this.optionSelected.emit({ label: this.label, icon: this.icon });
    }
  }
}
