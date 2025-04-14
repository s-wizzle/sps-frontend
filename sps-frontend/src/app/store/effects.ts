import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { loadGames, loadGamesSuccess, loadGamesFailure } from './actions';
import {SpsGameApi} from "./sps-game.api";

@Injectable()
export class SpsGameEffects {
    constructor(
        private actions$: Actions,
        private spsGameApi: SpsGameApi
    ) {}
}