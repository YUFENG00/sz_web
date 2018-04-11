import { Component, Input, Output, ViewChild, OnInit, EventEmitter} from '@angular/core';

@Component({
    selector: 'pie-chart',
    templateUrl: './pie-chart.html',
    styleUrls: ['./pie-chart.css']
  })
  export class PieChartComponent {

  chartOption: any={
      title : {
        text: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        left: 'center',
        data: []
    },
    series : [
        {
            name: '',
            type: 'pie',
            radius : '65%',
            center: ['50%', '60%'],
            data:[
                // {value:335, name:'直接访问'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    } ;
    @Input() set chartData(data: any) {
      console.log(data);
      if(data && data.length && data[0].name) {
        for(let i = 0; i < data.length; i++) {
          this.chartOption.legend.data.push(data[i].name);
          let tmpData = {value:'',name:''};
          tmpData.value = data[i].bsum;
          tmpData.name = data[i].name;
          this.chartOption.series[0].data.push(tmpData);    
        }
      }
      if(data && data.res && data.res.length) {
          let title = data.title; 
          data = data.res;
          this.chartOption = {
            title : {
                text: '',
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                data: []
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                }
            ]
          }
          for(let i = 0; i < data.length; i++) {
              this.chartOption.title.text = title;
              this.chartOption.xAxis[0].data.push(data[i][1]);
              this.chartOption.legend.data.push(data[i][1]);
            //   let tmpData = {value: '',name:''};
            //   tmpData.value = data[i][0];
            //   tmpData.name = data[i][1];
              this.chartOption.series[0].data.push(data[i][0]);
          }
      }    
    }
  }