import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../../src/app/components/page-title/page-title.component';
import { TabsModule } from 'primeng/tabs';
import { StonePaperScissorsFacade } from '../store/stone-paper-scissors.facade';
import { DataPageComponent } from './data-page.component';
import { MetricsPageComponent } from './metrics-page.component';
import { GamePageComponent } from './game-page.component';

@Component({
  selector: 'stone-paper-scissorcs-page',
  template: `
    <page-title
      [title]="'Stone Paper Scissors'"
      [description]="'Play the classic game of Stone Paper Scissors'"
    />
    <button (click)="load()">Load</button>

    <p-tabs value="0">
      <p-tablist>
        <p-tab value="0">Game</p-tab>
        <p-tab value="1">Metrics</p-tab>
        <p-tab value="2">Raw Data</p-tab>
      </p-tablist>
      <p-tabpanels>
        <p-tabpanel value="0">
          <game-page/>
        </p-tabpanel>
        <p-tabpanel value="1">
          <metrics-page />
        </p-tabpanel>
        <p-tabpanel value="2">
          <data-page [games]="games()"/>/>
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
export class StonePaperScissorsPageComponent {
  store = inject(StonePaperScissorsFacade);

  games = this.store.games;

  load() {
    this.store.load();
  }
}
