import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesEntity } from '@sps-frontend/feature-stone-paper-scissors';

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

  getNpcChoice(mode: string) {
    return this.http.get<{ choice: string }>(
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

  deleteGame(gameId: number) {
    return this.http.delete<void>(this.baseUrl + 'sps-games/' + gameId);
  }
}
