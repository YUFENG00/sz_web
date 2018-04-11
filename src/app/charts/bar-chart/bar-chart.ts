import { Component, Input, Output, ViewChild, OnInit, EventEmitter} from '@angular/core';

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.html',
    styleUrls: ['./bar-chart.css']
  })
  export class BarChartComponent {

    chartOption: any;
    @Input() set chartData(data: any) {
      this.chartOption= data
            
    }
  }