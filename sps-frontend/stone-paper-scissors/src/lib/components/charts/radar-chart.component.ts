import { Component, Input, OnChanges } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { Result } from '@sps-frontend/feature-stone-paper-scissors';

@Component({
  selector: 'sps-radar-chart',
  standalone: true,
  imports: [UIChart],
  template: `
    <p-chart type="radar" [data]="chartData" [options]="chartOptions"></p-chart>
  `,
  styles: [],
})
export class RadarChartComponent implements OnChanges {
  @Input() playerChoices: { [key: string]: number } = {
    stone: 0,
    paper: 0,
    scissors: 0,
    lizard: 0,
    spock: 0,
    fire: 0,
    water: 0,
  };
  @Input() npcChoices: { [key: string]: number } = {
    stone: 0,
    paper: 0,
    scissors: 0,
    lizard: 0,
    spock: 0,
    fire: 0,
    water: 0,
  };
  @Input() results: Result[] = [];

  chartData: any;
  chartOptions: any;

  ngOnChanges(): void {
    const playerResultCounts = {
      [Result.WIN]: 0,
      [Result.LOSS]: 0,
      [Result.DRAW]: 0,
    };
    const npcResultCounts = {
      [Result.WIN]: 0,
      [Result.LOSS]: 0,
      [Result.DRAW]: 0,
    };

    this.results.forEach((result) => {
      if (result === Result.WIN) {
        playerResultCounts[Result.WIN]++;
        npcResultCounts[Result.LOSS]++;
      } else if (result === Result.LOSS) {
        playerResultCounts[Result.LOSS]++;
        npcResultCounts[Result.WIN]++;
      } else if (result === Result.DRAW) {
        playerResultCounts[Result.DRAW]++;
        npcResultCounts[Result.DRAW]++;
      }
    });

    this.chartData = {
      labels: Object.keys(this.playerChoices),
      datasets: [
        {
          label: 'Player Choice Frequency',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          borderColor: 'rgba(66, 165, 245, 1)',
          data: Object.values(this.playerChoices),
        },
        {
          label: 'NPC Choice Frequency',
          backgroundColor: 'rgba(255, 87, 34, 0.2)',
          borderColor: 'rgba(255, 87, 34, 1)',
          data: Object.values(this.npcChoices),
        },
        {
          label: 'Player Win Count',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderColor: 'rgba(76, 175, 80, 1)',
          data: Object.keys(this.playerChoices).map(
            () => playerResultCounts[Result.WIN]
          ),
        },
        {
          label: 'NPC Win Count',
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
          borderColor: 'rgba(244, 67, 54, 1)',
          data: Object.keys(this.npcChoices).map(
            () => npcResultCounts[Result.WIN]
          ),
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
    };
  }
}
