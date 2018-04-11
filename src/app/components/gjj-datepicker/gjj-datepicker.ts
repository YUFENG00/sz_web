import { Component, Input, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/bs-moment';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { ENPublicFunction } from '../../../providers/en-public-function'

@Component({
  selector: 'gjj-datepicker',
  templateUrl: './gjj-datepicker.html',
  styleUrls: ['./gjj-datepicker.css']
})
export class GJJDatepickerComponent {

  bsValue: Date = new Date();
  bsRangeValue: any = [];
  //bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  chartOption: any;
  @Input() set primaryData(pdata: any) {
    this.bsRangeValue =pdata

  }
  @Output() datechange: EventEmitter<any> = new EventEmitter<any>();
  constructor(public eNPublicFunction: ENPublicFunction) {

  }
  test(date: any) {
    if (date&&date.length) {
      let mindate = Date.parse(date[0])
      let maxDate = Date.parse(date[1])
      let oneDate=24 * 60 * 60 * 1000
      let dateLength = (maxDate - mindate) / oneDate +1;
      let pickDateArr:Array<any>=[]
      for(let i=0;i<dateLength;i++){
        pickDateArr.push(this.eNPublicFunction.transformDate(mindate+i*(oneDate),''))
      }
      this.datechange.emit(pickDateArr)
    }

  }


}