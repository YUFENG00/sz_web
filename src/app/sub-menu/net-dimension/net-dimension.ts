import { Component, OnInit, Input } from '@angular/core';
import { KylinHandler } from '../../../providers/http-handler/kylin-handler';
import { ENPublicFunction } from '../../../providers/en-public-function';
import { SqlString } from '../../../providers/sql-string';
import { Config } from '../../config';




@Component({
    selector: 'net-dimension',
    templateUrl: './net-dimension.html',
    styleUrls: ['./net-dimension.css']
})
export class NetDComponent {
    primaryData: any = [new Date(2016, 10, 1), new Date(2016, 10, 30)];
    dateArray: Array<any> = []
    netWorkNodeArray: Array<any> = []
    regionPicker: any;
    bankPicker: any;
    originNetData: any;
    bankName: Array<any> = [];
    regionName: Array<any> = [];
    // bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
    totalTaskTrendShow: boolean = false;
    taskRankTrendShow: boolean = false;
    totalTaskTrend: any;
    taskProportion: any;
    taskRankTrend: any;
    chartNames: Array<any> = ["总业务量趋势", "业务量排名", "业务类别比例"]
    pickChart: number = 0;
    toptableList: Array<any> = [];
    lasttableList: Array<any> = [];
    netNameIndexArray: Array<any> = [];
    netTask1ProportShow: any = false;
    netTask1Proport: any;
    netTask2ProportShow: any = false;
    netTask2Proport: any;
    netTaskPicker: any;
    constructor(private kylinHandler: KylinHandler, public sqlString: SqlString) {
        kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.netWorkNodeSql(), Config.kylinProject).then((res: any) => {
            if (res.results) {
                this.originNetData = res.results;
                let tNetData = this.originNetData;
                this.bankName = [];
                this.regionName = []
                //0 网点名称 1 银行 2 地区
                for (let i = 0; i < tNetData.length; i++) {
                    if (!this.inArray(tNetData[i][2], this.bankName)) {
                        this.bankName.push(tNetData[i][2])
                    }
                    if (!this.inArray(tNetData[i][3], this.regionName)) {
                        this.regionName.push(tNetData[i][3])
                    }
                }
                this.regionPicker = this.regionName[0];
                this.bankPicker = this.bankName[0];
                this.getNetIndex()

            }
        }, (err: any) => {

        })
    }

    diffChart(i) {
        this.pickChart = i;
        if (this.pickChart == 0) {
            this.getNetIndex()
        }
        if (this.pickChart == 1) {
            this.toptableList = [];
            this.lasttableList = [];
            let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'"
            this.getDiffNetWorkNodeRankData(timeRange)

        }
        if (this.pickChart == 2) {
            if (this.netTaskPicker) {
                this.drawDiffNetTaskGraph()
            }

        }
    }

    datePicker(dateArr: any) {
        this.dateArray = dateArr
        this.getNetIndex()
        if (this.pickChart == 2) {
            if (this.netTaskPicker) {
                this.drawDiffNetTaskGraph()
            }
        }
    }
    getDiffNetWorkNodeData(netRange: string, timeRange: string) {
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

        this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.diffNetWorkNodeSql(netRange, timeRange), Config.kylinProject, 0, -1).
            then((res: any) => {
                if (res.results && res.results.length) {
                    let chartsData: Array<any> = res.results
                    this.totalTaskTrend.xAxis[0].data = this.dateArray;
                    this.totalTaskTrend.legend.data = this.netWorkNodeArray;
                    for (let y = 0; y < this.netWorkNodeArray.length; y++) {
                        let temSeries = {
                            name: this.netWorkNodeArray[y],
                            type: 'line',
                            stack: '总量',
                            // areaStyle: { normal: {} },
                            data: []
                        }
                        for (let i = 0; i < this.dateArray.length; i++) {
                            let num = this.dateteturn(this.dateArray[i], this.netWorkNodeArray[y], chartsData)
                            temSeries.data.push(num)
                        }
                        this.totalTaskTrend.series.push(temSeries)

                    }
                }
                this.totalTaskTrendShow = true
            }, (err: any) => {

            })

    }

    dateteturn(key1: string, key2: string, arr: Array<any>) {
        if (arr) {
            for (let m = 0; m < arr.length; m++) {
                if (key1 == arr[m][1] && key2 == this.removeAllSpace(arr[m][2])) {
                    return arr[m][0]
                }

            }
            return 0

        }
    }


    diffRegionMarket(region) {
        this.regionPicker = region;
        this.getNetIndex()

    }
    diffBankMarket(bank) {
        this.bankPicker = bank;
        this.getNetIndex()

    }
    getNetIndex() {
        this.netTask1ProportShow = false;
        this.netTask2ProportShow = false;
        this.totalTaskTrendShow = false;
        this.taskRankTrendShow = false;
        this.netWorkNodeArray = []
        this.netNameIndexArray = []
        let temNetNameArray: Array<any> = []
        let tNetData = this.originNetData;
        let tRegion = this.regionPicker;
        let tBank = this.bankPicker;
        if (tRegion && tBank && this.dateArray) {
            for (let i = 0; i < tNetData.length; i++) {
                if (tNetData[i][2] == tBank && tNetData[i][3] == tRegion) {
                    temNetNameArray.push(parseInt(tNetData[i][0]))
                    this.netWorkNodeArray.push(tNetData[i][1])
                    this.netNameIndexArray.push(tNetData[i][1])
                }
            }
            let temNetWorkRange = ""
            if (temNetNameArray.length) {
                temNetWorkRange = this.getSqlNetRangeString(temNetNameArray)
                let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'";
                this.getDiffNetWorkNodeData(temNetWorkRange, timeRange)
            }
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
                        tSql += tarr[i]

                    } else {
                        tSql += tarr[i] + ","
                    }
                }

            }

        }
        return tSql
    }



    removeAllSpace(str) {
        return str.replace(/\s+/g, "");
    }
    inArray(tkey: any, tarr: Array<any>) {
        if (tarr) {
            for (let i in tarr) {
                if (tarr[i] == tkey) {
                    return true
                }
            }
            return false
        } else {
            return false
        }

    }
    inObject(tkey: any, tObj: any) {
        if (tObj) {
            for (let i in tObj) {
                if (i == tkey) {
                    return true
                }
            }
            return false
        } else {
            return false
        }

    }

    getDiffNetWorkNodeRankData(timeRange: string) {
        this.taskRankTrendShow = false

        this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.totalNetWorkNodeRankSql(timeRange), Config.kylinProject, 0, -1).
            then((res: any) => {
                if (res.results && res.results.length) {
                    let chartsData: Array<any> = res.results
                    let tlength = res.results.length - 21;
                    for (let i = 0; i < chartsData.length; i++) {
                        if (i <= 19) {
                            let tobj = { name: chartsData[i][1], num: chartsData[i][0] }
                            this.lasttableList.push(tobj)
                        }
                        if (i > tlength) {
                            let tobj = { name: chartsData[i][1], num: chartsData[i][0] }
                            this.toptableList.push(tobj)
                        }
                    }
                    this.toptableList = this.toptableList.reverse()
                    this.taskRankTrendShow = true
                }

            }, (err: any) => {

            })

    }
    diffNetTask(netName: string) {
        this.netTaskPicker = netName;
        this.drawDiffNetTaskGraph()

    }

    drawDiffNetTaskGraph() {
        this.totalTaskTrendShow = false;
        this.taskRankTrendShow = false;
        this.netTask1ProportShow = false;
        this.netTask2ProportShow = false;
        let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'"

        this.netTask1Proport = {
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
        this.netTask2Proport = {
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
        this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.totalNetTask1Sql(this.netTaskPicker, timeRange), Config.kylinProject).then((res: any) => {
            if (res.results) {
                let chartsData = res.results;
                for (let i = 0; i < chartsData.length; i++) {
                    let tname = this.removeAllSpace(chartsData[i][1])
                    let tObj = { "value": chartsData[i][0], "name": tname }
                    this.netTask1Proport.legend.data.push(tname)
                    this.netTask1Proport.series[0].data.push(tObj)
                }
                this.netTask1ProportShow = true;


            }
        }, (err: any) => {

        })
        this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.totalNetTask2Sql(this.netTaskPicker, timeRange), Config.kylinProject).then((res: any) => {
            if (res.results) {
                let chartsData = res.results;
                for (let i = 0; i < chartsData.length; i++) {
                    let tname = this.removeAllSpace(chartsData[i][1])
                    let tObj = { "value": chartsData[i][0], "name": tname }
                    this.netTask2Proport.legend.data.push(tname)
                    this.netTask2Proport.series[0].data.push(tObj)
                }
                this.netTask2ProportShow = true;


            }
        }, (err: any) => {

        })


    }





}