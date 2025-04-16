import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GamesApi {
  private baseUrl = 'http://localhost:8080/api/sps-game/game';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<any[]>(this.baseUrl);
  }
}
