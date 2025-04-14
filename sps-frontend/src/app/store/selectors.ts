import { createFeatureSelector, createSelector} from "@ngrx/store";
import {adapter, SpsGameState} from "./state";

export const selectSpsGameState = createFeatureSelector<SpsGameState>('spsGames');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllGames = createSelector(
    selectSpsGameState,
    selectAll
);

export const selectGamesLoading = createSelector(
    selectSpsGameState,
    (state) => state.status
);

export const selectGamesError = createSelector(
    selectSpsGameState,
    (state) => state.error
);