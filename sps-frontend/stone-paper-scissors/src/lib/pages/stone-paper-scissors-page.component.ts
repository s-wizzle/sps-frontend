import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../../src/app/components/page-title/page-title.component';
import { TabsModule } from 'primeng/tabs';
import { StonePaperScissorsFacade } from '../store/stone-paper-scissors.facade';
import { DataPageComponent } from './data-page.component';
import { MetricsPageComponent } from './metrics-page.component';
import { GamePageComponent } from './game-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Choice, gameChoices } from '../utils/game-choices';
import { SpsGameApi } from '../store/sps-game.api';
import { GAME_MODE } from '@sps-frontend/feature-stone-paper-scissors';

@Component({
  selector: 'stone-paper-scissorcs-page',
  template: `
    <page-title
      [title]="'Stone Paper Scissors'"
      [description]="'Play the classic game of Stone Paper Scissors'"
    />
    <button (click)="load()">Load</button>

    <p-tabs [(value)]="tabIndex">
      <p-tablist>
        <p-tab [value]="0">Game</p-tab>
        <p-tab [value]="1">Metrics</p-tab>
        <p-tab [value]="2">Raw Data</p-tab>
      </p-tablist>
      <p-tabpanels>
        <p-tabpanel [value]="0">
          <game-page
            [selectedGame]="selectedGame()"
            (newGameEvent)="startGame()"
            (npcChoiceRequested)="handleNpcChoiceRequest($event)"
            (userSelectionChanged)="handleUserSelectionChanged($event)"
          />
        </p-tabpanel>
        <p-tabpanel [value]="1">
          <metrics-page />
        </p-tabpanel>
        <p-tabpanel [value]="2">
          <data-page [games]="games()" />
        </p-tabpanel>
      </p-tabpanels>
    </p-tabs>
  `,
  styles: ``,
  standalone: true,
  imports: [
    CommonModule,
    PageTitleComponent,
    TabsModule,
    DataPageComponent,
    MetricsPageComponent,
    GamePageComponent,
  ],
})
export class StonePaperScissorsPageComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(StonePaperScissorsFacade);
  api = inject(SpsGameApi);

  private _tabIndex = 0;

  games = this.store.games;
  selectedGame = this.store.selectedGame;

  load() {
    this.store.load();
  }

  startGame() {
    this.store.initGame();
  }

  handleUserSelectionChanged(payload: any) {
    this.store.updateGame(payload.gameId, payload.updatedGame);
  }

  handleNpcChoiceRequest(payload: any) {
    console.log('handleNpcChoiceRequest', payload);
    const { gameId, gameMode } = payload;
    const gameModeKey = Object.keys(GAME_MODE).find(
      (key) => GAME_MODE[key as keyof typeof GAME_MODE] === gameMode
    );

    if (gameModeKey) {
      this.api.getNpcChoice(gameModeKey).subscribe(({ choice }) => {
        const matched = this.findChoiceByLabel(choice, gameMode);
        if (matched) {
          this.store.updateGame(gameId, {
            npcChoice: choice,
            mode: gameMode,
          });

          const selectedGame = this.selectedGame();
          if (selectedGame) {
            this.api.updateResult(selectedGame).subscribe((response) => {
              console.log('Spielergebnis:', response);
              this.store.updateGame(gameId, { result: response.result });
            });
          }
        }
      });
    }
  }

  findChoiceByLabel(label: string, mode: string): Choice | undefined {
    let choices: Choice[];
    switch (mode) {
      case 'default':
        choices = gameChoices.filter((c) =>
          ['stone', 'paper', 'scissors'].includes(c.label)
        );
        break;
      case 'hard':
        choices = gameChoices.filter((c) =>
          ['stone', 'paper', 'scissors', 'lizard', 'spock'].includes(c.label)
        );
        break;
      case 'expert':
      default:
        choices = gameChoices;
    }
    return choices.find((c) => c.label === label);
  }

  get tabIndex() {
    return this._tabIndex;
  }

  set tabIndex(val: number) {
    this._tabIndex = val;
    this.onTabChange({ index: val });
  }

  onTabChange(event: any) {
    this.router.navigate([], {
      queryParams: { tab: this.tabIndex },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      const tab = parseInt(params['tab'], 10);
      if (!isNaN(tab)) {
        this.tabIndex = tab;
      }
    });
  }
}
