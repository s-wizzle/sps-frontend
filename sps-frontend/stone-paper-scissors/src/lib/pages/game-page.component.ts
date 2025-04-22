import { Component, computed, signal } from '@angular/core';
import { GameOptionComponent } from '../components/game-option.component';
import { NgForOf, NgIf } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { GameModeSelectorComponent } from '../components/game-mode-selection.component';
import { Choice, gameChoices } from '../utils/game-choices';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'game-page',
  template: `
    <game-mode-selector
      [selected]="selectedGameMode()"
      (modeChanged)="onGameModeChange($event)"
    >
    </game-mode-selector>

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

    <div class="button-container">
      <p-button
        class="reveal-button"
        label="Reveal"
        (onClick)="reveal()"
        [disabled]="!userSelection()"
      />
      <p-button
        class="reset-button"
        icon="pi pi-refresh"
        (onClick)="reset()"
        label="Zurücksetzen"
      />
    </div>

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
        *ngFor="let choice of choices()"
        [label]="choice.label"
        [selected]="userSelection() === choice"
        [icon]="choice.icon"
        (optionSelected)="select($event)"
      >
      </game-option>
    </div>

    <div class="log-toggle">
      <p-checkbox [(ngModel)]="isLoggingEnabled" />
      <label> Ergebnisse loggen</label>
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
      .button-container {
        display: flex;
        gap: 1rem;
        align-items: center; /* Align buttons vertically in the middle */
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
    GameModeSelectorComponent,
    Checkbox,
  ],
})
export class GamePageComponent {
  private _userSelection = signal<Choice | null>(null);
  private _npcSelection = signal<Choice | null>(null);
  private _revealed = signal(false);

  userSelection = this._userSelection.asReadonly();
  npcSelection = this._npcSelection.asReadonly();
  revealed = this._revealed.asReadonly();
  isLoggingEnabled = true;

  select(choice: Choice) {
    this._userSelection.set(choice);
  }

  reveal() {
    if (!this._revealed()) {
      const availableChoices = this.choices();
      const random =
        availableChoices[Math.floor(Math.random() * this.choices.length)];
      this._npcSelection.set(random);
      this._revealed.set(true);
    }
  }

  selectedGameMode = signal<{ label: string; value: string }>({
    label: 'Default',
    value: 'default',
  });

  readonly choices = computed(() => {
    switch (this.selectedGameMode().value) {
      case 'default':
        return gameChoices.filter((c) =>
          ['stone', 'paper', 'scissors'].includes(c.label)
        );
      case 'hard':
        return gameChoices.filter((c) =>
          ['stone', 'paper', 'scissors', 'lizard', 'spock'].includes(c.label)
        );
      case 'expert':
      default:
        return gameChoices;
    }
  });
  onGameModeChange(mode: { label: string; value: string }) {
    this.selectedGameMode.set(mode);
    this._userSelection.set(null);
    this._npcSelection.set(null);
    this._revealed.set(false);
  }

  reset() {
    this._userSelection.set(null);
    this._npcSelection.set(null);
    this._revealed.set(false);
  }
}
