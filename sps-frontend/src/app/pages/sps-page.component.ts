import {Component, inject} from '@angular/core';
import { PageTitleComponent } from '../components/page-title/page-title.component';
import { SpsGamePageComponent } from './sps-game-page.component';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { SpsMetricsPageComponent } from './sps-metrics-page.component';
import { SpsDataPageComponent } from './sps-data-page.component';
import {SpsGameFacade} from "../store/sps-game.facade";

@Component({
  selector: 'sps-page',
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
          <sps-game-page />
        </p-tabpanel>
        <p-tabpanel value="1">
          <sps-metrics-page />
        </p-tabpanel>
        <p-tabpanel value="2">
          <sps-data-page />
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
    SpsGamePageComponent,
    SpsMetricsPageComponent,
    SpsDataPageComponent,
  ],
})
export class SpsPageComponent {
  store = inject(SpsGameFacade);

  load() {
    this.store.load();
  }

}
