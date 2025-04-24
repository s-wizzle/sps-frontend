import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { GameState, getButtonState } from '../../utils/game.state';

@Component({
  selector: 'game-action-bar',
  standalone: true,
  imports: [Button],
  template: `
    <div class="button-container">
      <p-button
        class="reveal-button"
        label="Reveal"
        (onClick)="reveal.emit()"
        [disabled]="buttonStates.revealDisabled"
      />

      <p-button
        class="reveal-button"
        label="New Game"
        (onClick)="init.emit()"
        [disabled]="buttonStates.newGameDisabled"
      />

      <p-button
        icon="pi pi-refresh"
        (onClick)="reset.emit()"
        label="Reset"
        [disabled]="buttonStates.resetDisabled"
      />
    </div>
  `,
  styles: [
    `
      .reveal-button {
        margin: 1rem 0;
      }

      .button-container {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
    `,
  ],
})
export class GameActionBarComponent {
  @Output() reveal = new EventEmitter<void>();
  @Output() init = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  private _state: GameState = GameState.DEFAULT;
  buttonStates = getButtonState(this._state);

  @Input()
  set state(value: GameState) {
    this._state = value;
    this.buttonStates = getButtonState(value);
  }

  get state(): GameState {
    return this._state;
  }
}
