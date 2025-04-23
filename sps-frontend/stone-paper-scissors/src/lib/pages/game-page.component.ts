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
import { GameActionBarComponent } from '../components/game-action-bar.component';
import {determineGameState, GameState} from "../utils/game.state";

@Component({
  selector: 'game-page',
  template: `
    <game-mode-selector
        [selected]="selectedGameMode()"
        (modeChanged)="onGameModeChange($event)"
    />
    <p-divider/>

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

    <game-action-bar
        (reveal)="reveal()"
        (reset)="reset()"
        (init)="initGame()"
        [state]="determineGameState(selectedGame, revealed)"
    />

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
    <p-divider/>

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
      <p-checkbox [(ngModel)]="isLoggingEnabled"/>
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
    `,
  ],
  standalone: true,
  imports: [
    GameOptionComponent,
    NgIf,
    NgForOf,
    Card,
    Divider,
    DropdownModule,
    FormsModule,
    GameModeSelectorComponent,
    Checkbox,
    GameActionBarComponent,
  ],
})
export class GamePageComponent {
  @Output() newGameEvent = new EventEmitter<void>();
  @Output() evaluateGame = new EventEmitter<{
    gameId: number;
    gameMode: GAME_MODE;
  }>();
  @Output() resetGame = new EventEmitter<number>();

  revealed = false;

  initGame() {
    this.newGameEvent.emit();
    this.revealed = false;
  }

  reveal() {
    if (this.selectedGame) {
      this.evaluateGame.emit({
        gameId: this.selectedGame.id,
        gameMode: this.selectedGameMode().value,
      });
      this.revealed = true;
    }
  }

  reset() {
    if (this.selectedGame) {
      this.resetGame.emit(this.selectedGame.id);
      this.revealed = false;
    }
  }




  @Input() selectedGame: GamesEntity | null = null;

  @Output() userSelectionChanged = new EventEmitter<{
    gameId: number;
    updatedGame: Partial<GamesEntity>;
  }>();

  isLoggingEnabled = true;

  select(choice: Choice) {
    if (this.selectedGame) {
      this.userSelectionChanged.emit({
        gameId: this.selectedGame.id,
        updatedGame: { playerChoice: choice.label },
      });
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
    this.revealed = false;
  }



  protected readonly GameState = GameState;
  protected readonly determineGameState = determineGameState;
}
