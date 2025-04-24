import { Component, Input, OnChanges } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'sps-line-chart',
  standalone: true,
  imports: [UIChart],
  template: `
    <p-chart type="line" [data]="chartData" [options]="chartOptions"></p-chart>
  `,
  styles: [],
})
export class LineChartComponent implements OnChanges {
  @Input() resultsPerDay: { [key: string]: number } = {}; // Key is the date, value is the number of wins
  @Input() totalGamesPlayed: { [key: string]: number } = {}; // Key is the date, value is total games played that day

  chartData: any;
  chartOptions: any;

  ngOnChanges(): void {
    const labels = Object.keys(this.resultsPerDay);
    const winCounts = labels.map((date) => this.resultsPerDay[date]);
    const totalGames = labels.map((date) => this.totalGamesPlayed[date]);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Wins Per Day',
          data: winCounts,
          fill: false,
          borderColor: '#66BB6A',
          tension: 0.1,
        },
        {
          label: 'Total Games Per Day',
          data: totalGames,
          fill: false,
          borderColor: '#FFA726',
          tension: 0.1,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Count',
          },
        },
      },
    };
  }
}
