import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { GameOptionComponent } from '../components/game-option.component';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { GameModeSelectorComponent } from '../components/game-mode-selection.component';
import { Choice, gameChoices } from '../utils/game-choices';
import { Checkbox } from 'primeng/checkbox';
import {
  GAME_MODE,
  GamesEntity,
} from '@sps-frontend/feature-stone-paper-scissors';

@Component({
  selector: 'game-page',
  template: `
    <game-mode-selector
      [selected]="selectedGameMode()"
      (modeChanged)="onGameModeChange($event)"
    >
    </game-mode-selector>

    <div class="selection">
      <ng-container *ngIf="selectedGame?.npcChoice; else noNpcChoice">
        <game-option
          [label]="selectedGame?.npcChoice || ''"
          [selected]="true"
          [icon]="getIconForChoice(selectedGame?.npcChoice)"
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
        [disabled]="!selectedGame?.playerChoice"
      />
      <p-button
        class="reveal-button"
        label="New Game"
        (onClick)="initGame()"
        [disabled]="selectedGame?.playerChoice"
      />
      <p-button
        icon="pi pi-refresh"
        (onClick)="reset()"
        [disabled]="!selectedGame?.playerChoice"
        label="Zurücksetzen"
      />
    </div>

    <div class="selection">
      <ng-container *ngIf="selectedGame?.playerChoice; else noUserChoice">
        <game-option
          [label]="selectedGame?.playerChoice || ''"
          [selected]="true"
          [icon]="getIconForChoice(selectedGame?.playerChoice)"
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
        [selected]="selectedGame?.playerChoice === choice.label"
        [icon]="choice.icon"
        (optionSelected)="select($event)"
      >
      </game-option>
    </div>

    <div class="log-toggle">
      <p-checkbox [(ngModel)]="isLoggingEnabled" />
      <label> Ergebnisse loggen</label>
    </div>

    {{ selectedGame | json }}
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
    JsonPipe,
  ],
})
export class GamePageComponent implements OnChanges {
  private _revealed = signal(false);

  @Output() newGameEvent = new EventEmitter<void>();
  @Input() npcChoice: Choice | null = null;
  @Output() npcChoiceRequested = new EventEmitter<{
    gameId: number;
    gameMode: GAME_MODE;
  }>();
  @Input() selectedGame: GamesEntity | null = null;

  @Output() userSelectionChanged = new EventEmitter<{
    gameId: number;
    updatedGame: Partial<GamesEntity>;
  }>();

  revealed = this._revealed.asReadonly();
  isLoggingEnabled = true;

  select(choice: Choice) {
    if (this.selectedGame) {
      this.userSelectionChanged.emit({
        gameId: this.selectedGame.id,
        updatedGame: { playerChoice: choice.label },
      });
    }
  }

  reveal() {
    if (!this._revealed() && this.selectedGame) {
      this.npcChoiceRequested.emit({
        gameId: this.selectedGame.id,
        gameMode: this.selectedGameMode().value,
      });

      this._revealed.set(true);
    }
  }

  selectedGameMode = signal<{ label: string; value: GAME_MODE }>({
    label: 'Default',
    value: GAME_MODE.DEFAULT,
  });

  readonly choices = computed(() => {
    switch (this.selectedGameMode().value) {
      case GAME_MODE.DEFAULT:
        return gameChoices.filter((c) =>
          ['stone', 'paper', 'scissors'].includes(c.label)
        );
      case GAME_MODE.HARD:
        return gameChoices.filter((c) =>
          ['stone', 'paper', 'scissors', 'lizard', 'spock'].includes(c.label)
        );
      case GAME_MODE.EXPERT:
      default:
        return gameChoices;
    }
  });

  getIconForChoice(choiceLabel: string | undefined): string {
    if (!choiceLabel) return ''; // Wenn keine Wahl getroffen wurde, kein Icon
    const choice = this.choices().find((c) => c.label === choiceLabel);
    return choice ? choice.icon : ''; // Gib das Icon des gewählten Choices zurück
  }

  onGameModeChange(mode: { label: string; value: GAME_MODE }) {
    this.selectedGameMode.set(mode);
    this._revealed.set(false);
  }

  reset() {
    this._revealed.set(false);
  }

  initGame() {
    this.newGameEvent.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['npcChoice'] && this.npcChoice) {
      this._revealed.set(true);
    }
  }
}
