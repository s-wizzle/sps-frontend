import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GAMES_FEATURE_KEY,
  gamesAdapter,
  StonePaperScissorsState,
} from './stone-paper-scissors.reducer';
import { GamesEntity, Result } from './stone-paper-scissors.models';

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

export const selectTotalGamesPlayedPerDay = createSelector(
  selectAllGames,
  (games: GamesEntity[]) => {
    const totalGamesPlayed: { [key: string]: number } = {};
    const resultsPerDay: { [key: string]: number } = {};

    games.forEach((game) => {
      const gameDate = game.createdAt.split('T')[0];

      totalGamesPlayed[gameDate] = (totalGamesPlayed[gameDate] || 0) + 1;

      if (game.result === Result.WIN) {
        resultsPerDay[gameDate] = (resultsPerDay[gameDate] || 0) + 1;
      }
    });

    return { totalGamesPlayed, resultsPerDay };
  }
);

export const selectChoiceCounts = createSelector(
  selectAllGames,
  (games: GamesEntity[]) => {
    const playerCounts = {
      stone: 0,
      paper: 0,
      scissors: 0,
      lizard: 0,
      spock: 0,
      fire: 0,
      water: 0,
    };

    const npcCounts = {
      stone: 0,
      paper: 0,
      scissors: 0,
      lizard: 0,
      spock: 0,
      fire: 0,
      water: 0,
    };

    games.forEach((game) => {
      if (game.playerChoice in playerCounts) {
        playerCounts[game.playerChoice as keyof typeof playerCounts] += 1;
        npcCounts[game.npcChoice as keyof typeof npcCounts] += 1;
      }
    });

    return { playerCounts: playerCounts, npcCounts: npcCounts };
  }
);

export const selectResultCounts = createSelector(
  selectAllGames,
  (games: GamesEntity[]) => {
    return games.map((game) => game.result);
  }
);
