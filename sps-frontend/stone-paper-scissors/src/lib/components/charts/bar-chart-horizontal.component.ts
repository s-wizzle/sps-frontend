import { Component, Input, OnChanges } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { Result } from '@sps-frontend/feature-stone-paper-scissors';

@Component({
  selector: 'sps-bar-chart-horizontal',
  standalone: true,
  imports: [UIChart],
  template: `
    <p-chart type="bar" [data]="chartData" [options]="chartOptions"></p-chart>
  `,
  styles: [],
})
export class BarChartHorizontalComponent implements OnChanges {
  @Input() results: Result[] = [];

  chartData: any;
  chartOptions: any;

  ngOnChanges(): void {
    const resultCounts = {
      [Result.WIN]: 0,
      [Result.LOSS]: 0,
      [Result.DRAW]: 0,
    };

    this.results.forEach((r) => resultCounts[r]++);

    this.chartData = {
      labels: ['Win', 'Lose', 'Draw'],
      datasets: [
        {
          backgroundColor: ['#66BB6A', '#EF5350', '#FFA726'],
          data: [
            resultCounts[Result.WIN],
            resultCounts[Result.LOSS],
            resultCounts[Result.DRAW],
          ],
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    };
  }
}
