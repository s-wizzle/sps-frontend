import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesEntity } from '@sps-frontend/feature-stone-paper-scissors';

@Injectable({
  providedIn: 'root',
})
export class SpsGameApi {
  private baseUrl = 'http://localhost:8080/api/sps-games';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<GamesEntity[]>(this.baseUrl);
  }

  requestNewGame() {
    return this.http.post<GamesEntity>(this.baseUrl, {});
  }
}
