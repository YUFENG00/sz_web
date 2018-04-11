import { Injectable } from '@angular/core';

/*
  Generated class for the ApiHandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ENPublicFunction {

  constructor() {

  }
  sqlString(select: string, from: string, where: string) {
    let tSql = "SELECT " + select + " FROM " + from;
    if (where != "") {
      tSql += " WHERE " + where;
    }
    return tSql
  }
  transformDate(value: number, format: string) {

    if (value <= 0 || typeof (value) == 'undefined')
      return "";

    if (value <= 9999999999) {
      value = value * 1000;
    }

    if (format == null || format == '') {
      format = "yyyy-MM-dd";
    }

    let date: Date = new Date(value);

    let o: any = {
      "M+": date.getMonth() + 1,                 //月份 
      "d+": date.getDate(),                    //日 
      "h+": date.getHours(),                   //小时 
      "m+": date.getMinutes(),                 //分 
      "s+": date.getSeconds(),                 //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }

    return format;
  }



}