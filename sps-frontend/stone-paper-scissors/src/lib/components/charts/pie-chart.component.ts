import { Component, Input, OnChanges } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'sps-pie-chart',
  standalone: true,
  imports: [UIChart],
  template: ` <p-chart type="pie" [data]="chartData"></p-chart> `,
  styles: [],
})
export class PieChartComponent implements OnChanges {
  @Input() data: {
    stone: number;
    paper: number;
    scissors: number;
    lizard: number;
    spock: number;
    fire: number;
    water: number;
  } = {
    stone: 0,
    paper: 0,
    scissors: 0,
    lizard: 0,
    spock: 0,
    fire: 0,
    water: 0,
  };

  chartData: any = {};

  ngOnChanges() {
    this.chartData = {
      labels: Object.keys(this.data),
      datasets: [
        {
          data: Object.values(this.data),
          backgroundColor: [
            '#42A5F5',
            '#66BB6A',
            '#FFA726',
            '#AB47BC',
            '#FF7043',
            '#26C6DA',
            '#D4E157',
          ],
        },
      ],
    };
  }
}
