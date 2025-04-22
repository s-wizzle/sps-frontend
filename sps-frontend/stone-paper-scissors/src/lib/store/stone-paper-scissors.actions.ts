import { createAction, props } from '@ngrx/store';
import { GamesEntity } from './stone-paper-scissors.models';

export const loadGames = createAction('[Games] load');
export const loadGamesSuccess = createAction(
  '[Games] Load Games Success',
  props<{ games: GamesEntity[] }>()
);
export const loadGamesFailure = createAction(
  '[Games] Load Games Failure',
  props<{ error: any }>()
);
export const requestNewGame = createAction('[Gameplay] Request New Game');

export const requestNewGameFailure = createAction(
  '[Gameplay] Request New Game Failure',
  props<{ error: any }>()
);

export const initializeGame = createAction(
  '[Gameplay] Initialize Game',
  props<{ game: GamesEntity }>()
);

export const addGame = createAction(
  '[Gameplay] Add Game',
  props<{ game: GamesEntity }>()
);

export const updateGame = createAction(
  '[Gameplay] Update Game',
  props<{ gameId: number; updateGame: Partial<GamesEntity> }>()
);

export const setSelectedGame = createAction(
  '[Gameplay] Set Selected Game',
  props<{ gameId: number }>()
);
