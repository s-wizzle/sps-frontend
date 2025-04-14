import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as SpsGameActions from './actions';
import {SpsGameState} from "./state";
import {spsGameFeature} from "./reducer";

@Injectable({
    providedIn: 'root'
})
export class SpsGameFacade {
    store = inject<Store<SpsGameState>>(Store);

    games = this.store.selectSignal(spsGameFeature.selectEntities);
    //status = this.store.selectSignal(spsGameFeature.selectStatus);
    //error = this.store.selectSignal(spsGameFeature.selectError);

    dispatch(action: any) {
        this.store.dispatch(action);
    }

    load() {
        this.dispatch(SpsGameActions.loadGames());
    }
}