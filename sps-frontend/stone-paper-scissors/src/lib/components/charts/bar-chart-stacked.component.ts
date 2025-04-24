import { Component, Input, OnChanges } from '@angular/core';
import { UIChart } from 'primeng/chart';
import {
  GAME_MODE,
  GamesEntity,
  Result,
} from '@sps-frontend/feature-stone-paper-scissors';

@Component({
  selector: 'sps-bar-chart-stacked',
  standalone: true,
  imports: [UIChart],
  template: `
    <p-chart type="bar" [data]="chartData" [options]="chartOptions"></p-chart>
  `,
  styles: [],
})
export class BarChartStackedComponent implements OnChanges {
  @Input() games: GamesEntity[] = [];

  chartData: any;
  chartOptions: any;

  ngOnChanges(): void {
    const modes = Object.values(GAME_MODE);
    const countsByMode: Record<GAME_MODE, Record<Result, number>> = {
      [GAME_MODE.DEFAULT]: { win: 0, lose: 0, draw: 0 },
      [GAME_MODE.HARD]: { win: 0, lose: 0, draw: 0 },
      [GAME_MODE.EXPERT]: { win: 0, lose: 0, draw: 0 },
    };

    this.games.forEach((game) => {
      countsByMode[game.mode][game.result]++;
    });

    this.chartData = {
      labels: modes,
      datasets: [
        {
          label: 'Win',
          backgroundColor: '#66BB6A',
          data: modes.map((mode) => countsByMode[mode].win),
        },
        {
          label: 'Lose',
          backgroundColor: '#EF5350',
          data: modes.map((mode) => countsByMode[mode].lose),
        },
        {
          label: 'Draw',
          backgroundColor: '#FFA726',
          data: modes.map((mode) => countsByMode[mode].draw),
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    };
  }
}
