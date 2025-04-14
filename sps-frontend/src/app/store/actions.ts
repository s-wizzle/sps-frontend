import {createAction, props} from '@ngrx/store';
import { SpsGameModel } from '../model/sps-game.model';

export const loadGames = createAction('[SpsGame] Load Games');
export const loadGamesSuccess = createAction(
    '[SpsGame] Load Games Success',
    props<{ games: SpsGameModel[] }>()
);
export const loadGamesFailure = createAction(
    '[SpsGame] Load Games Failure',
    props<{ error: string }>()
);