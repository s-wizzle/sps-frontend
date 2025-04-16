import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as StonePaperScissorsActions from './stone-paper-scissors.actions';
import {selectAllGames} from "@sps-frontend/feature-stone-paper-scissors";

@Injectable({ providedIn: 'root' })
export class StonePaperScissorsFacade {
    store = inject(Store);

    dispatch(action: any) {
        this.store.dispatch(action);
    }

    games = this.store.selectSignal(selectAllGames);
    status = this.store.selectSignal((state) => state.stonePaperScissors.status);
    error = this.store.selectSignal((state) => state.stonePaperScissors.error);

    load() {
        this.store.dispatch(StonePaperScissorsActions.loadGames());
    }
}