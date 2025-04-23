import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StonePaperScissorsActions from './stone-paper-scissors.actions';
import {
  GamesEntity,
  selectAllGames,
  selectSelectedGame,
} from '@sps-frontend/feature-stone-paper-scissors';
import { generatedModuleName } from '@angular/compiler-cli/src/ngtsc/shims/src/util';

@Injectable({ providedIn: 'root' })
export class StonePaperScissorsFacade {
  store = inject(Store);

  dispatch(action: any) {
    this.store.dispatch(action);
  }

  games = this.store.selectSignal(selectAllGames);
  selectedGame = this.store.selectSignal(selectSelectedGame);
  status = this.store.selectSignal((state) => state.stonePaperScissors.status);
  error = this.store.selectSignal((state) => state.stonePaperScissors.error);

  load() {
    this.store.dispatch(StonePaperScissorsActions.loadGames());
  }

  initGame() {
    this.store.dispatch(StonePaperScissorsActions.requestNewGame());
  }

  updateGame(gameId: number, updatedGame: Partial<GamesEntity>) {
    this.store.dispatch(
      StonePaperScissorsActions.updateGame({ gameId, updateGame: updatedGame })
    );
  }

  resetGame(gameId: number) {
    this.store.dispatch(StonePaperScissorsActions.removeGame({ gameId }));
    this.store.dispatch(
      StonePaperScissorsActions.setSelectedGame({ gameId: null })
    );
  }

  saveGame(gameId: number) {
    const game = this.games().find((game) => game.id === gameId);
    if (game) {
      this.store.dispatch(StonePaperScissorsActions.saveGame({ game: game }));
    }
  }
}
