import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SpsGameModel} from "../model/sps-game.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SpsGameApi {
    private apiUrl = 'http://localhost:8080/api/v1/games';

    constructor(private http: HttpClient) {}

    getGames() {
        return this.http.get<SpsGameModel[]>(this.apiUrl);
    }
}