import { Component, OnInit, Input } from '@angular/core';
import { KylinHandler } from '../../../providers/http-handler/kylin-handler';
import { ENPublicFunction } from '../../../providers/en-public-function';
import { SqlString } from '../../../providers/sql-string';
import { Config } from '../../config';

@Component({
    selector: 'task-dimension',
    templateUrl: './task-dimension.html',
    styleUrls: ['./task-dimension.css']
})
export class TaskDComponent {
    primaryData: any = [new Date(2016, 10, 1), new Date(2016, 10, 30)];
    chartNames: Array<any> = ["业务量占比/排名", "总业务量趋势"]
    totalTaskProport: any;
    dateArray: Array<any> = []
    taskProport: any;
    taskProport2: any;
    proportShow: boolean = false;
    proportShow2: boolean = false;
    totalTaskTrendShow: boolean = false;
    totalTaskTrend: any;
    pickChart: number = 0;
    task1List: any = []
    task2List: any = []
    task1Picker: string;

    constructor(private kylinHandler: KylinHandler, public sqlString: SqlString) {


    }
    datePicker(dateArr: any) {
        this.dateArray = dateArr
        this.initGraph()

    }
    diffChart(i: number) {
        this.pickChart = i;
        this.initGraph()


    }
    diffBankMarket(task1: any) {
        this.task1Picker = task1.name;
        this.initGraph()
    }
    initGraph() {
        this.proportShow = false;
        this.proportShow2 = false;
        this.totalTaskTrendShow = false;
        if (this.pickChart == 1) {
            if (!this.task1Picker) {
                this.task1Picker = this.task1List[0].name

            }
            this.drawTotalTaskTrend()

        }
        if (this.pickChart == 0) {
            this.drawGraph()
        }

    }
    drawGraph() {
        this.proportShow = false;
        let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'"

        this.taskProport = {
            title: {
                text: '业务1的不同类型业务占比',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [
                {
                    name: '业务量占比',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
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
        };
        this.taskProport2 = {
            title: {
                text: '业务2的不同类型业务占比',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [
                {
                    name: '业务量占比',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
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
        };
        this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.totalTaskSql(timeRange), Config.kylinProject).then((res: any) => {
            if (res.results) {
                let chartsData = res.results;
                for (let i = 0; i < chartsData.length; i++) {
                    let tname = this.removeAllSpace(chartsData[i][1])
                    let tObj = { "value": chartsData[i][0], "name": tname }
                    this.taskProport.legend.data.push(tname)
                    this.taskProport.series[0].data.push(tObj)
                }
                this.task1List = this.taskProport.series[0].data
                this.proportShow = true;


            }
        }, (err: any) => {

        })
        this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.totalTask2Sql(timeRange), Config.kylinProject).then((res: any) => {
            if (res.results) {
                let chartsData = res.results;
                for (let i = 0; i < chartsData.length; i++) {
                    let tname = this.removeAllSpace(chartsData[i][1])
                    if (tname) {
                        let tObj = { "value": chartsData[i][0], "name": tname }
                        this.taskProport2.legend.data.push(tname)
                        this.taskProport2.series[0].data.push(tObj)

                    }

                }
                this.task2List = this.taskProport2.series[0].data
                this.proportShow2 = true;


            }
        }, (err: any) => {

        })

    }
    removeAllSpace(str) {
        return str.replace(/\s+/g, "");
    }

    drawTotalTaskTrend() {
        this.totalTaskTrend = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
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
                    boundaryGap: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [{
                name: "业务量",
                type: 'line',
                stack: '总量',
                // areaStyle: { normal: {} },
                data: []
            }

            ]
        }
        let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'"
        this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.totalTaskTrendSql(this.task1Picker, timeRange), Config.kylinProject).then((res: any) => {
            if (res.results) {
                let chartsData = res.results;
                this.totalTaskTrend.xAxis[0].data = this.dateArray;
                this.totalTaskTrend.legend.data = [this.task1Picker]
                for (let i = 0; i < this.dateArray.length; i++) {
                    let tnum = this.dateteturn(this.dateArray[i], chartsData)
                    this.totalTaskTrend.series[0].data.push(tnum);
                }
                this.totalTaskTrendShow = true;
            }
        }, (err: any) => {

        })

    }
    dateteturn(key1: string, arr: Array<any>) {
        if (arr) {
            for (let m = 0; m < arr.length; m++) {
                if (key1 == arr[m][1]) {
                    return arr[m][0]
                }

            }
            return 0

        }
    }
}