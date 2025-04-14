import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StonePaperScissorsActions from './stone-paper-scissors.actions';
import { catchError, of, switchMap } from 'rxjs';

@Injectable()
export class StonePaperScissorsEffects {
  private actions$ = inject(Actions);

  onLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StonePaperScissorsActions.loadGames),
      switchMap(() =>
        of(StonePaperScissorsActions.loadGamesSuccess({ games: [] }))
      ),
      catchError((error) => {
        return of(StonePaperScissorsActions.loadGamesFailure({ error }));
      })
    )
  );
}