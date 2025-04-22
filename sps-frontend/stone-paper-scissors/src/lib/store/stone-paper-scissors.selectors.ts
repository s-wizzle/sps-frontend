import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GAMES_FEATURE_KEY,
  gamesAdapter,
  StonePaperScissorsState,
} from './stone-paper-scissors.reducer';
import { GamesEntity } from './stone-paper-scissors.models';

export const selectStonePaperScissorsState =
  createFeatureSelector<StonePaperScissorsState>(GAMES_FEATURE_KEY);

const { selectAll, selectEntities } = gamesAdapter.getSelectors();

export const selectStonePaperScissorsStatus = createSelector(
  selectStonePaperScissorsState,
  (state: StonePaperScissorsState) => state.status
);

export const selectStonePaperScissorsError = createSelector(
  selectStonePaperScissorsState,
  (state: StonePaperScissorsState) => state.error
);

export const selectAllGames = createSelector(
  selectStonePaperScissorsState,
  (state: StonePaperScissorsState) => selectAll(state) as GamesEntity[]
);

export const selectSelectedGame = createSelector(
  selectStonePaperScissorsState,
  (state: StonePaperScissorsState) => {
    const selectedId = state.selectedId;

    if (selectedId) {
      const selectedGame = state.entities[selectedId];
      return selectedGame ? selectedGame : null;
    }
    return null;
  }
);