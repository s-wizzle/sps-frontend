import { createFeature, createReducer, on, StoreModule } from '@ngrx/store';
import { adapter, initialSpsGameState } from './state';
import * as SpsGameActions from './actions';

export const spsGameFeatureKey = 'spsGame';

export const spsGameFeature = createFeature({
  name: 'spsGame',
  reducer: createReducer(
    initialSpsGameState,
    on(SpsGameActions.loadGames, (state) => ({
      ...state,
      loading: true,
      error: '',
    })),

    on(SpsGameActions.loadGamesSuccess, (state, { games }) =>
      adapter.setAll(games, {
        ...state,
        loading: false,
      })
    ),

    on(SpsGameActions.loadGamesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    }))
  ),
});
