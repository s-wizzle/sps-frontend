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