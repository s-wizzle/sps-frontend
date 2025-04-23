import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GAME_MODE,
  GamesEntity,
} from '@sps-frontend/feature-stone-paper-scissors';
import { gameApiTrace } from '../utils/sps-logger';

@Injectable({
  providedIn: 'root',
})
export class SpsGameApi {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getGames() {
    gameApiTrace(`send get request - ${this.baseUrl}sps-games`);
    return this.http.get<GamesEntity[]>(this.baseUrl + 'sps-games');
  }

  requestNewGame() {
    gameApiTrace(`send post request - ${this.baseUrl}sps-games`);
    return this.http.post<GamesEntity>(this.baseUrl + 'sps-games', {});
  }

  deleteGame(gameId: number) {
    gameApiTrace(`send delete request - ${this.baseUrl}sps-games/${gameId}`);
    return this.http.delete<void>(this.baseUrl + 'sps-games/' + gameId);
  }

  putGame(game: GamesEntity) {
    gameApiTrace(`send put request - ${this.baseUrl}sps-games/${game.id}`);
    return this.http.put<GamesEntity>(
      this.baseUrl + 'sps-games/' + game.id,
      game
    );
  }

  getNpcChoice(mode: string) {
    gameApiTrace(`send get request - ${this.baseUrl}sps-gameplay/npc/choice`);
    return this.http.get<{ choice: GAME_MODE }>(
      this.baseUrl + 'sps-gameplay/npc/choice',
      {
        params: { mode },
      }
    );
  }

  updateResult(game: GamesEntity) {
    gameApiTrace(
      `send patch request - ${this.baseUrl}sps-gameplay/round/result`
    );
    return this.http.patch<GamesEntity>(
      this.baseUrl + 'sps-gameplay/round/result',
      game
    );
  }
}
