import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { GamesEntity } from './stone-paper-scissors.models';
import { Action, createReducer, on } from '@ngrx/store';
import * as StonePaperScissorsActions from './stone-paper-scissors.actions';

export const GAMES_FEATURE_KEY = 'games';

export interface StonePaperScissorsState extends EntityState<GamesEntity> {
  selectedId?: number;
  status: string;
  error?: string | null;
}

export const gamesAdapter: EntityAdapter<GamesEntity> =
  createEntityAdapter<GamesEntity>();

export const initialStonePaperScissorsState: StonePaperScissorsState =
  gamesAdapter.getInitialState({
    status: 'default',
  });

const reducer = createReducer(
  initialStonePaperScissorsState,
  on(StonePaperScissorsActions.loadGamesSuccess, (state) => ({
    ...state,
    status: 'loaded',
    error: null,
  })),
  on(StonePaperScissorsActions.loadGamesSuccess, (state, { games }) =>
    gamesAdapter.setAll(games, { ...state, loaded: true })
  ),
  on(StonePaperScissorsActions.loadGamesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function stonePaperScissorsReducer(
  state: StonePaperScissorsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
