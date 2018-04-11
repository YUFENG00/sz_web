import { Component, OnInit, Input } from '@angular/core';
import { KylinHandler } from '../../../providers/http-handler/kylin-handler';
import { ENPublicFunction } from '../../../providers/en-public-function';
import { SqlString } from '../../../providers/sql-string';
import { Config } from '../../config';

@Component({
    selector: 'total-feature',
    templateUrl: './total-feature.html',
    styleUrls: ['./total-feature.css']
})
export class TotalFeatureComponent {
    primaryData: any = [new Date(2016, 10, 1), new Date(2016, 10, 30)];
    dateArray: Array<any> = []
    chartsShow: boolean = false;
    trendData: any
    constructor(private kylinHandler: KylinHandler,
        public eNPublicFunction: ENPublicFunction, public sqlString: SqlString) {

    }

    datePicker(dateArr: any) {
        this.dateArray = dateArr
        this.gettotaldata("'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'")

    }
    gettotaldata(daterange: string) {
        this.chartsShow = false;
        this.trendData = {
            title: {
                text: '业务总量趋势'
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
                {
                    name: '银行业务总量',
                    type: 'line',
                    stack: '总量',
                    areaStyle: { normal: {} },
                    data: []
                }
            ]
        }

        this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.totalSql(daterange), Config.kylinProject, 0, -1).
            then((res: any) => {
                if (res.results) {
                    let chartsData: Array<any> = res.results
                    this.trendData.xAxis[0].data = this.dateArray
                    for (let i = 0; i < this.dateArray.length; i++) {
                        let num = this.dateteturn(this.dateArray[i], chartsData)
                        this.trendData.series[0].data.push(num)
                    }
                }
                this.chartsShow = true
            }, (err: any) => {

            })
    }
    dateteturn(key: string, arr: Array<any>) {
        if (arr) {
            for (let m = 0; m < arr.length; m++) {
                if (key == arr[m][1]) {
                    return arr[m][0]

                }

            }
            return 0

        }
    }


}