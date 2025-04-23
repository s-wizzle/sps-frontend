import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StonePaperScissorsActions from './stone-paper-scissors.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { SpsGameApi } from './sps-game.api';

@Injectable()
export class StonePaperScissorsEffects {
  private actions$ = inject(Actions);
  private api = inject(SpsGameApi);

  onLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StonePaperScissorsActions.loadGames),
      switchMap(() => {
        return this.api
          .getGames()
          .pipe(
            map((data) =>
              StonePaperScissorsActions.loadGamesSuccess({ games: data })
            )
          );
      }),
      catchError((error) => {
        return of(StonePaperScissorsActions.loadGamesFailure({ error }));
      })
    )
  );

  onLoadSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StonePaperScissorsActions.loadGamesSuccess),
        map((action) => {
          let { games } = action;
        })
      ),
    { dispatch: false }
  );

  onLoadFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StonePaperScissorsActions.loadGamesFailure),
        map((action) => {
          let { error } = action;
        })
      ),
    { dispatch: false }
  );

  onRequestNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StonePaperScissorsActions.requestNewGame),
      switchMap(() => {
        return this.api
          .requestNewGame()
          .pipe(
            mergeMap((data) => [
              StonePaperScissorsActions.addGame({ game: data }),
              StonePaperScissorsActions.setSelectedGame({ gameId: data.id }),
            ])
          );
      }),
      catchError((error) => {
        return of(StonePaperScissorsActions.requestNewGameFailure({ error }));
      })
    )
  );

  deleteGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StonePaperScissorsActions.removeGame),
      switchMap((action) => {
        return this.api
          .deleteGame(action.gameId)
          .pipe(map(() => StonePaperScissorsActions.removeGameSuccess()));
      }),
      catchError((error) => {
        return of(StonePaperScissorsActions.removeGameFailure({ error }));
      })
    )
  );

  saveGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StonePaperScissorsActions.saveGame),
      switchMap((action) => {
        return this.api
          .putGame(action.game)
          .pipe(map(() => StonePaperScissorsActions.saveGameSuccess()));
      }),
      catchError((error) => {
        return of(StonePaperScissorsActions.saveGameFailure({ error }));
      })
    )
  );
}
