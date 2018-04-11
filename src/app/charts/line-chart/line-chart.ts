import { Component, Input, Output, ViewChild, OnInit, EventEmitter} from '@angular/core';

@Component({
    selector: 'line-chart',
    templateUrl: './line-chart.html',
    styleUrls: ['./line-chart.css']
  })
  export class LineChartComponent {
    chartOption :any;
    // chartOption = {
    //   title: {
    //     text: ''
    //   },
    //   tooltip : {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data:['中国银行','工商银行','农业银行','建设银行','招商银行']
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis : [
    //     {
    //       type : 'category',
    //       boundaryGap : false,
    //       data:[]
    //     }
    //   ],
    //   yAxis : [
    //     {
    //       type : 'value'
    //     }
    //   ],
    //   series : [
    //     {
    //       name:'中国银行',
    //       type:'line',
    //       stack: '总量',
    //       areaStyle: {normal: {}},
    //       data:[120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name:'工商银行',
    //       type:'line',
    //       stack: '总量',
    //       areaStyle: {normal: {}},
    //       data:[220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //       name:'农业银行',
    //       type:'line',
    //       stack: '总量',
    //       areaStyle: {normal: {}},
    //       data:[150, 232, 201, 154, 190, 330, 410]
    //     },
    //     {
    //       name:'建设银行',
    //       type:'line',
    //       stack: '总量',
    //       areaStyle: {normal: {}},
    //       data:[320, 332, 301, 334, 390, 330, 320]
    //     },
    //     {
    //       name:'招商银行',
    //       type:'line',
    //       stack: '总量',
    //       label: {
    //         normal: {
    //           show: true,
    //           position: 'top'
    //         }
    //       },
    //       areaStyle: {normal: {}},
    //       data:[820, 932, 901, 934, 1290, 1330, 1320]
    //     }
    //   ]
    // }
    
    @Input() set chartData(data: any) {
      // console.log(data);
      this.chartOption= data
      // this.chartOption.legend.data = data.legend;
      // this.chartOption.series.name = data.legend[0];
      // this.chartOption.series.data = data.ydata; 

    }
  }