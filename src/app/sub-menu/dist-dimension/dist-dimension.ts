import { Component, OnInit, Input } from '@angular/core';
import { KylinHandler } from '../../../providers/http-handler/kylin-handler';
import { ENPublicFunction } from '../../../providers/en-public-function';
import { SqlString } from '../../../providers/sql-string';
import { Config } from '../../config';

@Component({
    selector: 'dist-dimension',
    templateUrl: './dist-dimension.html',
    styleUrls: ['./dist-dimension.css']
})
export class DistDComponent {
    primaryData: any = [new Date(2016, 10, 1), new Date(2016, 10, 30)];
    dateArray: Array<any> = []
    totalTaskTrend: any;
    taskRank: any;
    taskRankTrend: any;
    taskAveRankTrend: any;
    chartNames: Array<any> = ["总业务量趋势", "业务量排名"]
    pickChart: any = 0;
    regionPicker: any;
    originRegionData: Array<any> = [];
    regionNameArr: Array<any> = [];
    totalTaskTrendShow: boolean = false;
    taskRegionTrendShow: boolean = false;
    taskAveRegionTrendShow: boolean = false;
    regionArray: Array<any> = []
    constructor(private kylinHandler: KylinHandler, public sqlString: SqlString) {
        kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.regionNameSql(), Config.kylinProject).then((res: any) => {
            if (res.results) {
                this.originRegionData = [];
                this.regionNameArr = []

                this.regionNameArr.push('全部')
                for (let i = 0; i < res.results.length; i++) {

                    this.originRegionData.push(res.results[i][0])
                    this.regionNameArr.push(res.results[i][0])

                }
                this.regionPicker = "全部";
                this.drawGraph()

            }
        }, (err: any) => {

        })

    }
    diffChart(i: number) {
        this.pickChart = i;
        this.drawGraph()


    }
    datePicker(dateArr: any) {
        this.dateArray = dateArr
        this.drawGraph()

    }

    drawGraph() {
        this.totalTaskTrendShow = false;
        this.taskRegionTrendShow = false;
        this.taskAveRegionTrendShow = false;
        if (this.pickChart == 0) {
            this.diffRegionMarket(this.regionPicker)

        }
        if (this.pickChart == 1) {
            let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'"
            this.getRegionRankData(timeRange)

        }

    }
    diffRegionMarket(region: string) {
        this.regionPicker = region;
        if (this.regionPicker == "全部") {
            let temRegionRange = this.getSqlNetRangeString(this.originRegionData)
            this.regionArray = []
            for (let i = 0; i < this.originRegionData.length; i++) {
                this.regionArray.push(this.originRegionData[i])
            }
            let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'";
            this.getDiffRegionData(temRegionRange, timeRange)
        } else {
            let temRegionRange = "'" + this.regionPicker + "'"
            this.regionArray = [this.regionPicker]
            let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'";
            this.getDiffRegionData(temRegionRange, timeRange)
        }
    }

    getDiffRegionData(regionRange: string, timeRange: string) {
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
            series: [

            ]
        }

        this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.diffRegionSql(regionRange, timeRange), Config.kylinProject, 0, -1).
            then((res: any) => {
                if (res.results && res.results.length) {
                    let chartsData: Array<any> = res.results
                    this.totalTaskTrend.xAxis[0].data = this.dateArray;
                    this.totalTaskTrend.legend.data = this.regionArray;
                    for (let y = 0; y < this.regionArray.length; y++) {
                        let temSeries = {
                            name: this.regionArray[y],
                            type: 'line',
                            stack: '总量',
                            // areaStyle: { normal: {} },
                            data: []
                        }
                        for (let i = 0; i < this.dateArray.length; i++) {
                            let num = this.dateteturn(this.dateArray[i], this.regionArray[y], chartsData)
                            temSeries.data.push(num)
                        }
                        this.totalTaskTrend.series.push(temSeries)

                    }
                    this.totalTaskTrendShow = true
                }


            }, (err: any) => {

            })

    }
    dateteturn(key1: string, key2: string, arr: Array<any>) {
        if (arr) {
            for (let m = 0; m < arr.length; m++) {
                if (key1 == arr[m][1] && key2 == arr[m][2]) {
                    return arr[m][0]
                }

            }
            return 0

        }
    }

    getSqlNetRangeString(tarr: Array<string>) {
        let tSql = '';
        if (tarr.length) {
            if (tarr.length == 1) {
                tSql += tarr[0]
            } else {
                for (let i = 0; i < tarr.length; i++) {
                    if (i == (tarr.length - 1)) {
                        tSql += "'" + tarr[i] + "'"

                    } else {
                        tSql += "'" + tarr[i] + "',"
                    }
                }

            }

        }
        return tSql
    }

    getRegionRankData(timeRange: string) {
        this.taskRankTrend = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                    name: '业务量',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                }
            ]
        };
        this.taskAveRankTrend = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                    name: '平均业务量',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                }
            ]
        };
        this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.totalRegionRankSql(timeRange), Config.kylinProject, 0, -1).
            then((res: any) => {
                if (res.results) {
                    let chartsData: Array<any> = res.results;
                    this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.diffRegionNetSumSql(), Config.kylinProject, 0, -1).
                        then((rest: any) => {
                            if (rest.results) {
                                let temBankNetAveRank: Array<any> = []
                                let bankSumData = rest.results;
                                for (let i = 0; i < bankSumData.length; i++) {
                                    let tSum = "" + this.rankdatereturn(bankSumData[i][1], chartsData) / bankSumData[i][0] + ""
                                    let tObj = {
                                        "name": bankSumData[i][1],
                                        "sum": parseInt(tSum)
                                    }
                                    temBankNetAveRank.push(tObj)
                                }
                                temBankNetAveRank.sort(function (a, b) { return a.sum - b.sum })
                                for (let i = 0; i < temBankNetAveRank.length; i++) {
                                    this.taskAveRankTrend.xAxis[0].data.push(temBankNetAveRank[i].name);
                                    this.taskAveRankTrend.series[0].data.push(temBankNetAveRank[i].sum)


                                }
                                this.taskAveRegionTrendShow = true
                            }
                        })

                    for (let i = 0; i < chartsData.length; i++) {
                        if (chartsData[i][1]) {
                            this.taskRankTrend.xAxis[0].data.push(chartsData[i][1])
                            let num = this.rankdatereturn(chartsData[i][1], chartsData)
                            this.taskRankTrend.series[0].data.push(num)
                        }
                    }
                    this.taskRegionTrendShow = true;
                }
            }, (err: any) => {

            })

    }
    rankdatereturn(key1: string, arr: Array<any>) {
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