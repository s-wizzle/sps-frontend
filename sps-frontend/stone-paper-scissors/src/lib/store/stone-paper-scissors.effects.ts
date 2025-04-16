import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StonePaperScissorsActions from './stone-paper-scissors.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { GamesApi } from './games.api';

@Injectable()
export class StonePaperScissorsEffects {
  private actions$ = inject(Actions);
  private api = inject(GamesApi);

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
}
