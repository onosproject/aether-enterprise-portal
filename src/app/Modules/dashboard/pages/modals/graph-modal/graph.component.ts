import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'aep-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @ViewChild('myCanvas', { static: true }) canvas: ElementRef;
  TabParentValue = ['bandwidth'];
  TabChildValue = ['1h'];
  lineChartData: ChartDataSets[] = [{ data: [12, 6, 9, 8, 0] }];

  lineChartLabels: Label[] = ['', '', '', '', ''];

  lineChartOptions: ChartOptions = {
    responsive: true,

    scales: {
      xAxes: [{ gridLines: { display: false } }],
      yAxes: [
        {
          gridLines: {
            color: '#97C1FF',
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 4,
          },
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    {
      borderColor: '#0063F7',
      pointRadius: 0,
    },
  ];
  lineChartLegend = false;
  lineChartType: ChartType = 'line';
  chartColors;
  canvasss;
  ctx;
  ngOnInit(): void {
    const gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(1, 'white');
    gradient.addColorStop(0, 'rgba(0, 99, 247, 0.4)');

    this.lineChartColors = [
      {
        ...this.lineChartColors[0],
        backgroundColor: gradient,
      },
    ];
  }
}
