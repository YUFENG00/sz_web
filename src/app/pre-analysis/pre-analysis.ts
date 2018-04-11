import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pre-analysis',
  templateUrl: './pre-analysis.html',
  styleUrls: ['./pre-analysis.css']
})
export class PreAnalysisComponent {
  selectIndex: number = 1;
  constructor(private router: Router) {
    let hArray = this.router.url.split('/')
    switch (hArray[hArray.length - 1]) {
      case 'netmap':
        this.selectIndex = 1;
        break;

      case 'heatmap':
        this.selectIndex = 2;
        break;

      case 'netanalysis':
        this.selectIndex = 3;
        break;

      case 'predictnode':
        this.selectIndex = 4;
        break;
    }
  }

  gotoTabOne(): void {
    this.selectIndex = 1
  }

  gotoHeatmap(): void {
    this.selectIndex = 2;
  }




  gotoNetAnalysis(): void {
    this.selectIndex = 3;
  }

  gotoPredictNode(): void {
    this.selectIndex = 4;
  }

}
