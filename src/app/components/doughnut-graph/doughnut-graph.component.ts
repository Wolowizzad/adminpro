import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styles: [
  ]
})
export class DoughnutGraphComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input("nombre") leyenda: string = '';
  @Input("data") doughnutChartData: MultiDataSet = [];
  @Input("labels") doughnutChartLabels: Label = [];
  @Input("type") doughnutChartType: ChartType = 'doughnut';  

  constructor() { }

  ngOnInit(): void {
  }

}
