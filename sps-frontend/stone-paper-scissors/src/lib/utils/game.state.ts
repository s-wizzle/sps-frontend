import { GamesEntity } from '@sps-frontend/feature-stone-paper-scissors';

export enum GameState {
  DEFAULT = 'default',
  STARTED = 'started',
  PLAYER_SELECTED = 'player_selected',
  FINISHED = 'finished',
}

export type GameButtonState = {
  revealDisabled: boolean;
  newGameDisabled: boolean;
  resetDisabled: boolean;
};

export function getButtonState(state: GameState): GameButtonState {
  switch (state) {
    case GameState.DEFAULT:
      return {
        revealDisabled: true,
        newGameDisabled: false,
        resetDisabled: true,
      };
    case GameState.STARTED:
      return {
        revealDisabled: true,
        newGameDisabled: true,
        resetDisabled: false,
      };
    case GameState.PLAYER_SELECTED:
      return {
        revealDisabled: false,
        newGameDisabled: true,
        resetDisabled: false,
      };
    case GameState.FINISHED:
      return {
        revealDisabled: true,
        newGameDisabled: false,
        resetDisabled: true,
      };
    default:
      return {
        revealDisabled: true,
        newGameDisabled: true,
        resetDisabled: true,
      };
  }
}

export function determineGameState(
  game: GamesEntity | null,
  revealed: boolean
): GameState {
  if (!game) return GameState.DEFAULT;
  if (revealed) return GameState.FINISHED;
  if (game.playerChoice) return GameState.PLAYER_SELECTED;
  return GameState.STARTED;
}
