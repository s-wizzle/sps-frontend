import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { GamesEntity } from './stone-paper-scissors.models';
import { Action, createReducer, on } from '@ngrx/store';
import * as StonePaperScissorsActions from './stone-paper-scissors.actions';
import { gameManagementTrace } from '../utils/sps-logger';

export const GAMES_FEATURE_KEY = 'games';

export interface StonePaperScissorsState extends EntityState<GamesEntity> {
  selectedId: number | null;
  status: string;
  error?: string | null;
}

export const gamesAdapter: EntityAdapter<GamesEntity> =
  createEntityAdapter<GamesEntity>();

export const initialStonePaperScissorsState: StonePaperScissorsState =
  gamesAdapter.getInitialState({
    selectedId: null,
    status: 'default',
  });

const reducer = createReducer(
  initialStonePaperScissorsState,
  on(StonePaperScissorsActions.loadGamesSuccess, (state, { games }) => {
    gameManagementTrace('update store - setAll');
    return gamesAdapter.setAll(games, { ...state, loaded: true });
  }),
  on(StonePaperScissorsActions.loadGamesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(StonePaperScissorsActions.addGame, (state, { game }) => {
    gameManagementTrace('update store - setAll');
    return gamesAdapter.addOne(game, state);
  }),
  on(StonePaperScissorsActions.setSelectedGame, (state, { gameId }) => {
    gameManagementTrace('update store - setSelected');
    return {
      ...state,
      selectedId: gameId,
    };
  }),
  on(StonePaperScissorsActions.updateGame, (state, { gameId, updateGame }) => {
    gameManagementTrace('update store - updateOne');
    return gamesAdapter.updateOne(
      {
        id: gameId,
        changes: updateGame,
      },
      state
    );
  }),
  on(StonePaperScissorsActions.removeGame, (state, { gameId }) => {
    gameManagementTrace('update store - removeOne');
    return gamesAdapter.removeOne(gameId, state);
  })
);

export function stonePaperScissorsReducer(
  state: StonePaperScissorsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
