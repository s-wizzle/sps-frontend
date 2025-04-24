import { Component, inject } from '@angular/core';
import { PieChartComponent } from '../components/charts/pie-chart.component';
import { StonePaperScissorsFacade } from '../store/stone-paper-scissors.facade';
import { BarChartVerticalComponent } from '../components/charts/bar-chart-vertical.component';
import { BarChartHorizontalComponent } from '../components/charts/bar-chart-horizontal.component';
import { BarChartStackedComponent } from '../components/charts/bar-chart-stacked.component';
import { RadarChartComponent } from '../components/charts/radar-chart.component';
import { LineChartComponent } from '../components/charts/line-chart.component';
import { Card } from 'primeng/card';

@Component({
  selector: 'metrics-page',
  template: `
    <div class="charts-container">
      <div class="chart-item">
        <p-card class="chart-card" header="Game Results">
          <sps-bar-chart-vertical [results]="resultCounts()" />
        </p-card>
      </div>

      <div class="chart-item">
        <p-card class="chart-card" header="Game Results">
          <sps-bar-chart-horizontal [results]="resultCounts()" />
        </p-card>
      </div>

      <div class="chart-item">
        <p-card class="chart-card" header="Game Results">
          <sps-bar-chart-stacked [games]="games()" />
        </p-card>
      </div>

      <div class="chart-item">
        <p-card class="chart-card" header="Games Played">
          <sps-line-chart
            [totalGamesPlayed]="gamesPlayedCount().totalGamesPlayed"
            [resultsPerDay]="gamesPlayedCount().resultsPerDay"
          ></sps-line-chart>
        </p-card>
      </div>

      <div class="chart-item">
        <p-card class="chart-card" header="Choice Efficiency Radar">
          <sps-radar-chart
            [playerChoices]="choiceCounts().playerCounts"
            [npcChoices]="choiceCounts().npcCounts"
            [results]="resultCounts()"
          ></sps-radar-chart>
        </p-card>
      </div>

      <div class="chart-item">
        <p-card class="chart-card" header="User Choices">
          <sps-pie-chart [data]="choiceCounts().playerCounts" />
        </p-card>
      </div>

      <div class="chart-item">
        <p-card class="chart-card" header="NPC Choices">
          <sps-pie-chart [data]="choiceCounts().npcCounts" />
        </p-card>
      </div>
    </div>
  `,
  styles: [
    `
      .charts-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
        gap: 2rem;
        padding: 2rem;
        background-color: #f9f9f9;
      }

      .chart-item {
        display: flex;
        justify-content: center;
        align-items: stretch;
      }
    `,
  ],
  standalone: true,
  imports: [
    PieChartComponent,
    BarChartVerticalComponent,
    BarChartHorizontalComponent,
    BarChartStackedComponent,
    RadarChartComponent,
    LineChartComponent,
    Card,
  ],
})
export class MetricsPageComponent {
  store = inject(StonePaperScissorsFacade);

  games = this.store.games;
  gamesPlayedCount = this.store.gamesPlayed;
  choiceCounts = this.store.choiceCounts;
  resultCounts = this.store.resultCounts;
}
