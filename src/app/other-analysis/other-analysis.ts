import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'other-analysis',
    templateUrl: './other-analysis.html',
    styleUrls: ['./other-analysis.css']
  })
  export class OtherAnalysisComponent {
      selectIndex: number = 1;
      constructor(public Location: Location) {
        let hArray = location.href.split('/')
        switch(hArray[hArray.length - 1]) {
            case 'businesstype':
            this.selectIndex = 1;
            break;
        }
      }

      gotoBusinessType(): void {
        this.selectIndex = 1
      }

  }