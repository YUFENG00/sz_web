import { Injectable } from '@angular/core';
import { ENPublicFunction } from './en-public-function'

/*
  Generated class for the ApiHandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SqlString {
    originData: string = "SZGJJ.ORIGINAL_DATA";
    bankData: string = "SZGJJ.BANKDATA"

    constructor(public eNPublicFunction: ENPublicFunction) {

    }

    //总体特征统计
    totalSql(timeRange: string) {
        let s = "COUNT(*),ORIGINAL_DATA.TASK_HANDLE_TIME";
        let f = this.originData;
        let w = "ORIGINAL_DATA.TASK_HANDLE_TIME BETWEEN " + timeRange + " GROUP BY ORIGINAL_DATA.TASK_HANDLE_TIME ORDER BY ORIGINAL_DATA.TASK_HANDLE_TIME";
        return this.eNPublicFunction.sqlString(s, f, w)

    }

    //银行维度
    //获取银行
    bankNameSql() {
        let s = "DISTINCT bankname";
        let f = this.bankData;
        let w = "";
        return this.eNPublicFunction.sqlString(s, f, w)
    }

    //银行维度总业务量趋势
    diffBankSql(bankRange: string, timeRange: string) {
        let s = "COUNT(*),task_handle_time,bankname";
        let f = this.originData + " LEFT JOIN bankdata ON original_data.bank_index =bankdata.index";
        let w = "bankname IN (" + bankRange + ") AND task_handle_time BETWEEN" + timeRange + "GROUP BY task_handle_time,bankname  ORDER BY task_handle_time ASC";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
    //银行的网点数
    diffBankNetSumSql() {
        let s = "COUNT(*),bankname";
        let f = this.bankData + " GROUP BY bankname";
        let w = "";
        return this.eNPublicFunction.sqlString(s, f, w)

    }
    //银行维度业务量排名
    totalBankRankSql(timeRange: string) {
        let s = "COUNT(*) as businessCount,bankname";
        let f = this.originData + " LEFT JOIN bankdata  ON original_data.bank_index =bankdata.index";
        let w = "task_handle_time BETWEEN " + timeRange + "GROUP BY bankname ORDER BY businessCount";
        return this.eNPublicFunction.sqlString(s, f, w)

    }
    //银行维度业务类别1比例
     totalBankTask1Sql(bankname:string,timeRange: string) {
        let s = "COUNT(*) AS  businessCount, task_name1";
        let f = this.originData + " LEFT JOIN bankdata  ON original_data.bank_index=bankdata.index";
        let w ="bankname='"+bankname+"' AND task_handle_time BETWEEN " + timeRange + "GROUP BY task_name1 ORDER BY businessCount DESC";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
     //银行维度业务类别2比例
     totalBankTask2Sql(bankname:string,timeRange: string) {
        let s = "COUNT(*) AS  businessCount, task_name2";
        let f = this.originData + " LEFT JOIN bankdata  ON original_data.bank_index=bankdata.index";
        let w ="bankname='"+bankname+"' AND task_handle_time BETWEEN " + timeRange + "GROUP BY task_name2 ORDER BY businessCount DESC";
        return this.eNPublicFunction.sqlString(s, f, w)
    }


    //网点维度  
    //获取网点数据
    netWorkNodeSql() {
        let s = "INDEX,NAME,BANKNAME,REGION";
        let f = this.bankData;
        let w = "";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
    //总业务量趋势
    diffNetWorkNodeSql(netRange: string, timeRange: string) {
        let s = "COUNT(*),TASK_HANDLE_TIME,STATION_NAME";
        let f = this.originData;
        let w = "BANK_INDEX IN (" + netRange + ") AND TASK_HANDLE_TIME BETWEEN" + timeRange + "GROUP BY STATION_NAME,TASK_HANDLE_TIME ORDER BY TASK_HANDLE_TIME";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
    //业务量排名
    totalNetWorkNodeRankSql(timeRange: string) {
        let s = "COUNT(*),STATION_NAME";
        let f = this.originData;
        let w = "TASK_HANDLE_TIME BETWEEN " + timeRange + "GROUP BY STATION_NAME ORDER BY COUNT(*)";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
    //网点维度业务类别1比例
     totalNetTask1Sql(stationName:string,timeRange: string) {
        let s = "COUNT(*) AS  businessCount, task_name1";
        let f = this.originData ;
        let w ="station_name LIKE '%"+stationName+"%' AND task_handle_time BETWEEN " + timeRange + "GROUP BY task_name1 ORDER BY businessCount DESC";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
     //网点维度业务类别2比例
     totalNetTask2Sql(stationName:string,timeRange: string) {
        let s = "COUNT(*) AS  businessCount, task_name2";
        let f = this.originData ;
        let w ="station_name LIKE '%"+stationName+"%' AND task_handle_time BETWEEN " + timeRange + "GROUP BY task_name2 ORDER BY businessCount DESC";
        return this.eNPublicFunction.sqlString(s, f, w)
    }


    //区域维度
    //获取地区
    regionNameSql() {
        let s = "DISTINCT region";
        let f = this.bankData;
        let w = "";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
    //地区维度总业务量趋势
    diffRegionSql(regionRange: string, timeRange: string) {
        let s = "COUNT(*),task_handle_time,region";
        let f = this.originData + " LEFT JOIN bankdata ON original_data.bank_index =bankdata.index";
        let w = "region IN (" + regionRange + ") AND task_handle_time BETWEEN" + timeRange + "GROUP BY task_handle_time,region  ORDER BY task_handle_time ASC";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
    //地区的网点数
    diffRegionNetSumSql() {
        let s = "COUNT(*),region";
        let f = this.bankData + " GROUP BY region";
        let w = "";
        return this.eNPublicFunction.sqlString(s, f, w)

    }

    //地区维度业务量排名
    totalRegionRankSql(timeRange: string) {
        let s = "COUNT(*) as businessCount,region";
        let f = this.originData + " LEFT JOIN bankdata  ON original_data.bank_index =bankdata.index";
        let w = "task_handle_time BETWEEN " + timeRange + "GROUP BY region ORDER BY businessCount";
        return this.eNPublicFunction.sqlString(s, f, w)

    }

    //业务2维度业务量占比
    totalTaskSql(timeRange: string) {
        let s = "COUNT(*) AS  businessCount,TASK_NAME1";
        let f = this.originData;
        let w = "task_handle_time BETWEEN " + timeRange + " GROUP BY TASK_NAME1 ORDER BY businessCount DESC";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
    //业务2维度业务量占比
    totalTask2Sql(timeRange: string) {
        let s = "COUNT(*) AS  businessCount,TASK_NAME2";
        let f = this.originData;
        let w = "task_handle_time BETWEEN " + timeRange + " GROUP BY TASK_NAME2 ORDER BY businessCount DESC";
        return this.eNPublicFunction.sqlString(s, f, w)
    }
    //业务1维度总业务量趋势
    totalTaskTrendSql(task1name:string,timeRange:string){
        let s = "COUNT(*) AS  businessCount,task_handle_time";
        let f = this.originData;
        let w = "TASK_NAME1 LIKE '%"+task1name+"%' AND task_handle_time BETWEEN " + timeRange + " GROUP BY TASK_NAME1,task_handle_time ORDER BY businessCount DESC";
        return this.eNPublicFunction.sqlString(s, f, w)

    }

    //单位维度
    totalFirmRankSql(timeRange:string){
        let s = "COUNT(GJJ_NUM) AS businessCount,FIRM_NAME";
        let f = this.originData;
        let w = "task_handle_time BETWEEN " + timeRange + " GROUP BY FIRM_NAME ORDER BY businessCount DESC";
        return this.eNPublicFunction.sqlString(s, f, w)

    }

    //网点客户年龄分布
    ageRangeSql(name: any) {
        let s = "count(t1.gjj_num) as total, t1.agerange";
        let f = "(select distinct gjj_num,case when age BETWEEN 0 AND 20  then '0-20' when age BETWEEN 20 AND 30  then '20-30' when age BETWEEN 30 AND 40  then '30-40' when age BETWEEN 40 AND 50  then '40-50' when age BETWEEN 50 AND 60  then '50-60' else '>60' end as agerange FROM szgjj.original_data WHERE station_name like '%"+ name +"%') as t1 group by t1.agerange";
        let w = "";
        return this.eNPublicFunction.sqlString(s, f, w)
    }

    //网点客户月缴存额分布
    saveRangeSql(name: any) {
        let s = "count(*) as total, t1.amount_range";
        let f = "(select distinct gjj_num,case when month_save BETWEEN 0 AND 1000  then 'a.0-1000元' when month_save BETWEEN 1000 AND 2000  then 'b.1000-2000元' when month_save BETWEEN 2000 AND 3000  then 'c.2000-3000元' when month_save BETWEEN 3000 AND 4000  then 'd.3000-4000元' when month_save BETWEEN 4000 AND 5000  then 'e.4000-5000元' when month_save BETWEEN 5000 AND 6000  then 'f.5000-6000元' when month_save BETWEEN 6000 AND 7000  then 'g.6000-7000元' when month_save BETWEEN 7000 AND 8000  then 'h.7000-8000元' when month_save BETWEEN 8000 AND 9000  then 'i.8000-9000元' when month_save BETWEEN 9000 AND 10000  then 'j.9000-100000元' else 'k.>10000元' end as amount_range FROM szgjj.original_data where station_name like '%"+name+"%') as t1 group by t1.amount_range order by t1.amount_range";
        let w = ""
        return this.eNPublicFunction.sqlString(s, f, w)
    }



}