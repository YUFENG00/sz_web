import { Component, OnInit, Input } from '@angular/core';
import { KylinHandler } from '../../../providers/http-handler/kylin-handler';
import { ENPublicFunction } from '../../../providers/en-public-function';
import { SqlString } from '../../../providers/sql-string';
import { Config } from '../../config';

@Component({
    selector: 'firm-dimension',
    templateUrl: './firm-dimension.html',
    styleUrls: ['./firm-dimension.css']
})
export class FirmDComponent {
    primaryData: any = [new Date(2016, 10, 1), new Date(2016, 10, 30)];
    dateArray: Array<any> = []
    chartNames: Array<any> = ["业务量排名"];
    pickChart: any = 0;
    firmList: Array<any> = []
    firmRankShow = false;
    constructor(private kylinHandler: KylinHandler, public sqlString: SqlString) {
    }
    datePicker(dateArr: any) {
        this.dateArray = dateArr
        this.drawFirmRank()
    }
    drawFirmRank() {
        this.firmRankShow = false;
        this.firmList = [];
        let timeRange = "'" + this.dateArray[0] + "' AND '" + this.dateArray[this.dateArray.length - 1] + "'"
        this.kylinHandler.postQuery(Config.kylinBaseurl + Config.query, this.sqlString.totalFirmRankSql(timeRange), Config.kylinProject, 0, 20).
            then((res: any) => {
                if (res.results && res.results.length) {
                    let chartsData: Array<any> = res.results
                    for (let i = 0; i < chartsData.length; i++) {
                        let tObj = { "value": chartsData[i][0], "name": this.removeAllSpace(chartsData[i][1]) }
                        this.firmList.push(tObj)
                    }
                    this.firmRankShow = true;
                }
            }, (err: any) => {

            })
    }
    removeAllSpace(str) {
        return str.replace(/\s+/g, "");
    }




}