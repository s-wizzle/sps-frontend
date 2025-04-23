import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../../src/app/components/page-title/page-title.component';
import { TabsModule } from 'primeng/tabs';
import { StonePaperScissorsFacade } from '../store/stone-paper-scissors.facade';
import { DataPageComponent } from './data-page.component';
import { MetricsPageComponent } from './metrics-page.component';
import { GamePageComponent } from './game-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SpsGameApi } from '../store/sps-game.api';
import { EMPTY, switchMap, tap } from 'rxjs';
import { Toast } from 'primeng/toast';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'stone-paper-scissorcs-page',
  template: `
    <p-toast></p-toast>

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
            (evaluateGame)="handleEvaluateGame($event)"
            (userSelectionChanged)="handleUserSelectionChanged($event)"
            (resetGame)="handleResetGame($event)"
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
    Toast,
  ],
})
export class StonePaperScissorsPageComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(StonePaperScissorsFacade);
  api = inject(SpsGameApi);
  notification = inject(NotificationService);

  private _tabIndex = 0;

  games = this.store.games;
  selectedGame = this.store.selectedGame;

  load() {
    this.store.load();
    this.notification.showSuccess('Games loaded successfully');
  }

  startGame() {
    this.store.initGame();
    this.notification.showInfo('New game started');
  }

  handleUserSelectionChanged(payload: any) {
    this.store.updateGame(payload.gameId, payload.updatedGame);
  }

  handleResetGame(gameId: number) {
    this.store.resetGame(gameId);
    this.notification.showInfo('Latest game cleared');
  }

  handleEvaluateGame(payload: any) {
    const { gameId, gameMode } = payload;

    this.api
      .getNpcChoice(gameMode)
      .pipe(
        switchMap(({ choice: npcChoice }) => {
          this.store.updateGame(gameId, {
            npcChoice,
            mode: gameMode,
          });

          const selectedGame = this.selectedGame();
          if (selectedGame) {
            this.api.updateResult(selectedGame).subscribe((response) => {
              this.store.updateGame(gameId, { result: response.result });
              this.store.saveGame(gameId);
            });
          }

          return EMPTY;
        })
      )
      .subscribe();
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
