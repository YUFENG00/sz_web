import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common'
import { NgxEchartsModule } from 'ngx-echarts';
import { PieChartComponent} from './pie-chart/pie-chart';
import { BarChartComponent} from './bar-chart/bar-chart';
import { LineChartComponent} from './line-chart/line-chart';
import { GJJDatepickerComponent } from '../components/gjj-datepicker/gjj-datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import  {FormsModule} from '@angular/forms'

@NgModule({
    declarations: [
        PieChartComponent,
        BarChartComponent,
        LineChartComponent,
        GJJDatepickerComponent 
    ],
    imports: [
        NgxEchartsModule,
        CommonModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
    ],
    exports: [
        PieChartComponent,
        BarChartComponent,
        LineChartComponent,
        GJJDatepickerComponent 
    ]
})

export class MyChartsModule {}