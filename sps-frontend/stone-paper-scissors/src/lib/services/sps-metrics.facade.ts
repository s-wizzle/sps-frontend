import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllGames,
  selectChoiceCounts,
  selectResultCounts,
  selectTotalGamesPlayedPerDay,
} from '@sps-frontend/feature-stone-paper-scissors';

@Injectable({
  providedIn: 'root',
})
export class SpsMetricsFacade {
  store = inject(Store);

  games = this.store.selectSignal(selectAllGames);
  gamesPlayed = this.store.selectSignal(selectTotalGamesPlayedPerDay);
  choiceCounts = this.store.selectSignal(selectChoiceCounts);
  resultCounts = this.store.selectSignal(selectResultCounts);
}
