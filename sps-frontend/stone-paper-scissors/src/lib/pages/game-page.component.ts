import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { GameOptionComponent } from '../components/gameplay/game-option.component';
import { NgForOf, NgIf } from '@angular/common';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { GameModeSelectorComponent } from '../components/gameplay/game-mode-selection.component';
import {
  Choice,
  gameChoices,
  getIconForChoice,
  modeChoicesMap,
} from '../utils/game-choices';
import { Checkbox } from 'primeng/checkbox';
import {
  GAME_MODE,
  GamesEntity,
  Result,
} from '@sps-frontend/feature-stone-paper-scissors';
import { GameActionBarComponent } from '../components/gameplay/game-action-bar.component';
import { determineGameState } from '../utils/game.state';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'game-page',
  template: `
    <game-mode-selector
      [selected]="selectedGameMode()"
      (modeChanged)="onGameModeChange($event)"
    />
    <p-divider />

    <div class="selection">
      <ng-container *ngIf="selectedGame?.npcChoice; else noNpcChoice">
        <game-option
          [label]="selectedGame?.npcChoice || ''"
          [selected]="true"
          [icon]="getIconForChoice(selectedGame?.npcChoice)"
          [isWinner]="winnerIsNpc()"
          [isTie]="isTie()"
        >
        </game-option>
      </ng-container>
      <ng-template #noNpcChoice>
        <p-card header="NPC Selection" class="user-selection">
          <i>?</i>
        </p-card>
      </ng-template>
    </div>

    <game-action-bar
      (reveal)="reveal()"
      (reset)="reset()"
      (init)="initGame()"
      [state]="determineState()"
    />

    <div class="selection">
      <ng-container *ngIf="selectedGame?.playerChoice; else noUserChoice">
        <game-option
          [label]="selectedGame?.playerChoice || ''"
          [selected]="true"
          [icon]="getIconForChoice(selectedGame?.playerChoice)"
          [isWinner]="winnerIsPlayer()"
          [isTie]="isTie()"
        >
        </game-option>
      </ng-container>
      <ng-template #noUserChoice>
        <p-card header="Selection" class="user-selection">
          <i>Make your choice</i>
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
        (optionSelected)="userSelect($event)"
      >
      </game-option>
    </div>

    <div class="log-toggle">
      <p-checkbox [(ngModel)]="isLoggingEnabled" />
      <label> Log Results</label>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #f9f9f9;
        padding: 8px 8px;
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
export class GamePageComponent implements OnChanges {
  @Input() selectedGame: GamesEntity | null = null;
  @Output() newGameEvent = new EventEmitter<void>();
  @Output() userSelectionChanged = new EventEmitter<{
    gameId: number;
    updatedGame: Partial<GamesEntity>;
  }>();
  @Output() evaluateGame = new EventEmitter<{
    gameId: number;
    gameMode: GAME_MODE;
  }>();
  @Output() resetGame = new EventEmitter<number>();

  notification = inject(NotificationService);

  revealed = false;
  isLoggingEnabled = true;
  private resultNotified = false;

  initGame() {
    this.newGameEvent.emit();
    this.resultNotified = false;
    this.revealed = false;
  }

  userSelect(choice: Choice) {
    if (this.selectedGame) {
      this.userSelectionChanged.emit({
        gameId: this.selectedGame.id,
        updatedGame: { playerChoice: choice.label },
      });
    }
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
      this.resultNotified = false;
      this.revealed = false;
    }
  }

  determineState() {
    return determineGameState(this.selectedGame, this.revealed);
  }

  selectedGameMode = signal<{ label: string; value: GAME_MODE }>({
    label: 'Default',
    value: GAME_MODE.DEFAULT,
  });

  readonly choices = computed(() => {
    return gameChoices.filter((choice) =>
      modeChoicesMap[this.selectedGameMode().value].includes(choice.label)
    );
  });

  getIconForChoice(choiceLabel: string | undefined): string {
    return getIconForChoice(choiceLabel || '', this.choices());
  }

  onGameModeChange(mode: { label: string; value: GAME_MODE }) {
    this.selectedGameMode.set(mode);
    this.revealed = false;
  }

  winnerIsPlayer(): boolean | null {
    if (!this.revealed || !this.selectedGame?.result) return null;
    return this.selectedGame.result === Result.WIN;
  }

  winnerIsNpc(): boolean | null {
    if (!this.revealed || !this.selectedGame?.result) return null;
    return this.selectedGame.result === Result.LOSS;
  }

  isTie(): boolean {
    return this.revealed && this.selectedGame?.result === Result.DRAW;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.revealed &&
      changes['selectedGame'] &&
      this.selectedGame?.result &&
      !this.resultNotified
    ) {
      this.resultNotified = true;
      this.notification.clearAll();

      switch (this.selectedGame.result) {
        case Result.WIN:
          this.notification.showSuccess('Win!', 'You won 🎉');
          break;
        case Result.LOSS:
          this.notification.showError('Lose!', 'You lost 😢');
          break;
        case Result.DRAW:
          this.notification.showInfo('Draw', 'It´s a draw 🤝');
          break;
      }
    }
  }
}
