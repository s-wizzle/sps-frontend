import { Component, signal } from '@angular/core';
import { GameOptionComponent } from '../components/game-option.component';
import { NgForOf, NgIf } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

type Choice = {
  label: string;
  icon: string;
};

@Component({
  selector: 'game-page',
  template: `
    <div class="selection">
      <ng-container *ngIf="npcSelection(); else noNpcChoice">
        <game-option
          [label]="npcSelection()?.label || ''"
          [selected]="true"
          [icon]="npcSelection()?.icon || ''"
        >
        </game-option>
      </ng-container>
      <ng-template #noNpcChoice>
        <p-card header="NPC Auswahl" class="user-selection">
          <i>?</i>
        </p-card>
      </ng-template>
    </div>

    <p-button
      class="reveal-button"
      label="Reveal"
      (onClick)="reveal()"
      [disabled]="!userSelection()"
    />

    <div class="selection">
      <ng-container *ngIf="userSelection(); else noUserChoice">
        <game-option
          [label]="userSelection()?.label || ''"
          [selected]="true"
          [icon]="userSelection()?.icon || ''"
        >
        </game-option>
      </ng-container>
      <ng-template #noUserChoice>
        <p-card header="Deine Auswahl" class="user-selection">
          <i>Bitte wähle eine Option</i>
        </p-card>
      </ng-template>
    </div>
    <p-divider />

    <div class="selection">
      <game-option
        *ngFor="let choice of choices"
        [label]="choice.label"
        [selected]="userSelection() === choice"
        [icon]="choice.icon"
        (optionSelected)="select($event)"
      >
      </game-option>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }

      .selection {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: auto;
        text-align: center;
        margin: 1rem 0;
      }

      .reveal-button {
        margin: 1rem 0;
      }
    `,
  ],
  standalone: true,
  imports: [
    GameOptionComponent,
    NgIf,
    NgForOf,
    Card,
    Button,
    Divider,
    DropdownModule,
    FormsModule,
  ],
})
export class GamePageComponent {
  choices: Choice[] = [
    { label: 'stone', icon: 'assets/icon_lizard.png' },
    { label: 'paper', icon: 'assets/icon_paper.png' },
    { label: 'scissors', icon: 'assets/icon_scissors.png' },
    { label: 'lizard', icon: 'assets/icon_lizard.png' },
    { label: 'spock', icon: 'assets/icon_spock.png' },
    { label: 'fire', icon: 'assets/icon_fire.png' },
    { label: 'water', icon: 'assets/icon_water.png' },
  ];

  private _userSelection = signal<Choice | null>(null);
  private _npcSelection = signal<Choice | null>(null);

  userSelection = this._userSelection.asReadonly();
  npcSelection = this._npcSelection.asReadonly();

  select(choice: Choice) {
    this._userSelection.set(choice);
  }

  reveal() {
    const random =
      this.choices[Math.floor(Math.random() * this.choices.length)];
    this._npcSelection.set(random);
  }
}
