import { Component, OnInit, Input } from '@angular/core';
import { KylinHandler } from '../../../providers/http-handler/kylin-handler';
import { ENPublicFunction } from '../../../providers/en-public-function';
import { SqlString } from '../../../providers/sql-string';
import { Config } from '../../config';
@Component({
    selector: 'bank-dimension',
    templateUrl: './bank-dimension.html',
    styleUrls: ['./bank-dimension.css']
})
export class BankDComponent {
    primaryData: any = [new Date(2016, 10, 1), new Date(2016, 10, 30)];
    dateArray: Array<any> = []
    bankArray: Array<any> = []
    taskProportion: any;
    totalTaskTrend: any;
    taskRankTrend: any;
    taskAveRankTrend: any;
    chartNames: Array<any> = ["总业务量趋势", "业务量排名", "业务类别比例"]
    pickChart: number = 0;
    originBankData: Array<any>
    bankNameArr: Array<any> = [];
    bankPicker: string = "全部";
    totalTaskTrendShow: any = false;
    taskRankTrendShow: any = false;
    taskAveRankTrendShow: any = false;
    bankTaskPicker: any;
    bankTask1ProportShow: any = false;
    bankTask1Proport: any;
    bankTask2ProportShow: any = false;
    bankTask2Proport: any;

    constructor(private kylinHandler: KylinHandler, public sqlString: SqlString) {
        kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.bankNameSql(), Config.kylinProject).then((res: any) => {
            if (res.results) {
                this.originBankData = [];
                this.bankArray = [];

                this.bankNameArr.push('全部')
                for (let i = 0; i < res.results.length; i++) {
                    this.originBankData.push(res.results[i][0])

                    this.bankNameArr.push(res.results[i][0]);

                }
                this.bankPicker = "全部"
                this.drawGraph()

            }
        }, (err: any) => {

        })

    }
    diffChart(i: number) {
        this.pickChart = i;
        this.drawGraph()


    }

    drawGraph() {
        this.totalTaskTrendShow = false;
        this.taskRankTrendShow = false;
        this.taskAveRankTrendShow = false;
        if (this.pickChart == 0) {
            this.diffBankMarket(this.bankPicker)

        }
        if (this.pickChart == 1) {
            let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'"
            this.getBankRankData(timeRange)

        }
        if(this.pickChart==2){
            if(!this.bankTaskPicker){
                this.bankTaskPicker=this.originBankData[0]
            }
             this.drawDiffBankTask1Graph()
        }

    }

    datePicker(dateArr: any) {
        this.dateArray = dateArr
        this.drawGraph()

    }
    diffBankMarket(bankname: any) {
        this.bankPicker = bankname
        if (bankname == "全部" && this.originBankData) {
            let temBankRange = this.getSqlNetRangeString(this.originBankData)
            this.bankArray = []
            for (let i = 0; i < this.originBankData.length; i++) {
                this.bankArray.push(this.originBankData[i])
            }
            let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'";
            this.getDiffBankData(temBankRange, timeRange)
        } else {
            this.bankArray = [bankname]
            let temBankRange = "'" + bankname + "'"
            let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'";
            this.getDiffBankData(temBankRange, timeRange)

        }

    }

    getDiffBankData(bankRange: string, timeRange: string) {
        this.totalTaskTrendShow = false
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

        this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.diffBankSql(bankRange, timeRange), Config.kylinProject, 0, -1).
            then((res: any) => {
                if (res.results && res.results.length) {
                    let chartsData: Array<any> = res.results

                    this.totalTaskTrend.xAxis[0].data = this.dateArray;
                    this.totalTaskTrend.legend.data = this.bankArray;
                    for (let y = 0; y < this.bankArray.length; y++) {
                        let temSeries = {
                            name: this.bankArray[y],
                            type: 'line',
                            stack: '总量',
                            // areaStyle: { normal: {} },
                            data: []
                        }
                        for (let i = 0; i < this.dateArray.length; i++) {
                            let num = this.dateteturn(this.dateArray[i], this.bankArray[y], chartsData)
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
        if (tarr && tarr.length) {
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

    getBankRankData(timeRange: string) {
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
        this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.totalBankRankSql(timeRange), Config.kylinProject, 0, -1).
            then((res: any) => {
                if (res.results) {
                    let chartsData: Array<any> = res.results;
                    this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.diffBankNetSumSql(), Config.kylinProject, 0, -1).
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
                                this.taskAveRankTrendShow = true


                            }


                        })

                    for (let i = 0; i < chartsData.length; i++) {
                        if (chartsData[i][1]) {
                            this.taskRankTrend.xAxis[0].data.push(chartsData[i][1])
                            let num = this.rankdatereturn(chartsData[i][1], chartsData)
                            this.taskRankTrend.series[0].data.push(num)

                        }


                    }
                    this.taskRankTrendShow = true;
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
    diffBankTaskMarket(bank) {
        this.bankTaskPicker = bank;
        this.drawDiffBankTask1Graph()
    }
    drawDiffBankTask1Graph() {

        this.bankTask1ProportShow = false;
        this.bankTask2ProportShow = false;
        let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'"

        this.bankTask1Proport = {
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
        this.bankTask2Proport = {
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
          this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.totalBankTask1Sql(this.bankTaskPicker, timeRange), Config.kylinProject).then((res: any) => {
            if (res.results) {
                let chartsData = res.results;
                for (let i = 0; i < chartsData.length; i++) {
                    let tname = this.removeAllSpace(chartsData[i][1])
                    let tObj = { "value": chartsData[i][0], "name": tname }
                    this.bankTask1Proport.legend.data.push(tname)
                    this.bankTask1Proport.series[0].data.push(tObj)
                }
                this.bankTask1ProportShow = true;


            }
        }, (err: any) => {

        })
        this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.totalBankTask2Sql(this.bankTaskPicker, timeRange), Config.kylinProject).then((res: any) => {
            if (res.results) {
                let chartsData = res.results;
                for (let i = 0; i < chartsData.length; i++) {
                    let tname = this.removeAllSpace(chartsData[i][1])
                    let tObj = { "value": chartsData[i][0], "name": tname }
                    this.bankTask2Proport.legend.data.push(tname)
                    this.bankTask2Proport.series[0].data.push(tObj)
                }
                this.bankTask2ProportShow = true;


            }
        }, (err: any) => {

        })


    }
    removeAllSpace(str) {
        return str.replace(/\s+/g, "");
    }
}