import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GAME_MODE, GamesEntity} from '@sps-frontend/feature-stone-paper-scissors';

@Injectable({
  providedIn: 'root',
})
export class SpsGameApi {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<GamesEntity[]>(this.baseUrl + 'sps-games');
  }

  requestNewGame() {
    return this.http.post<GamesEntity>(this.baseUrl + 'sps-games', {});
  }

  deleteGame(gameId: number) {
    return this.http.delete<void>(this.baseUrl + 'sps-games/' + gameId);
  }

  putGame(game: GamesEntity) {
    return this.http.put<GamesEntity>(
      this.baseUrl + 'sps-games/' + game.id,
      game
    );
  }

  getNpcChoice(mode: string) {
    return this.http.get<{ choice: GAME_MODE }>(
      this.baseUrl + 'sps-gameplay/npc/choice',
      {
        params: { mode },
      }
    );
  }

  updateResult(game: GamesEntity) {
    return this.http.patch<GamesEntity>(
      this.baseUrl + 'sps-gameplay/round/result',
      game
    );
  }
}
