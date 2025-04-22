import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { GamesEntity } from './stone-paper-scissors.models';
import { Action, createReducer, on } from '@ngrx/store';
import * as StonePaperScissorsActions from './stone-paper-scissors.actions';

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
    console.debug('loadGamesSuccess action triggered');
    return gamesAdapter.setAll(games, { ...state, loaded: true });
  }),
  on(StonePaperScissorsActions.loadGamesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(StonePaperScissorsActions.addGame, (state, { game }) => {
    console.debug('addGame action triggered');
    return gamesAdapter.addOne(game, state);
  }),
  on(StonePaperScissorsActions.setSelectedGame, (state, { gameId }) => {
    console.log('setSelectedGame action triggered');
    return {
      ...state,
      selectedId: gameId,
    };
  }),
  on(StonePaperScissorsActions.updateGame, (state, { gameId, updateGame }) => {
    console.log('updateGame action triggered');
    return gamesAdapter.updateOne(
      {
        id: gameId,
        changes: updateGame,
      },
      state
    );
  })
);

export function stonePaperScissorsReducer(
  state: StonePaperScissorsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
