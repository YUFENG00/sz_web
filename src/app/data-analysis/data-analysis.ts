import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'data-analysis',
    templateUrl: './data-analysis.html',
    styleUrls: ['./data-analysis.css']
  })
  export class DataAnalysisComponent {
      selectIndex: number = 0;
      subMenuArray:Array<any>=[
        {
          routerLink:"totalfeature",
          name:"总体特征统计"
        },
         {
          routerLink:"bankd",
          name:"银行维度统计"
        },
         {
          routerLink:"netd",
          name:"网点维度统计"
        },
         {
          routerLink:"distd",
          name:"区域维度统计"
        },
         {
          routerLink:"businessd",
          name:"业务维度统计"
        }
        //,
        //  {
        //   routerLink:"persond",
        //   name:"个人维度"
        // },
        //  {
        //   routerLink:"firmd",
        //   name:"单位维度"
        // },
        //  {
        //   routerLink:"crossd",
        //   name:"交叉维度"
        // },
      ]
      constructor(private router: Router) {
        let hArray = this.router.url.split('/')
        switch(hArray[hArray.length-1]) {
            case 'totalfeature':
            this.selectIndex =0;
            break;
            case 'bankd':
            this.selectIndex =1;
            break;

            case 'netd':
            this.selectIndex =2;
            break;

            case 'distd':
            this.selectIndex =3;
            break;

            case 'businessd':
            this.selectIndex =4;
            break;

            case 'persond':
            this.selectIndex =5;
            break;

            case 'firmd':
            this.selectIndex =6;
            break;

            case 'crossd':
            this.selectIndex =7;
            break;
        }
      }
      goto(i:number): void {
        this.selectIndex = i;
      }

  }