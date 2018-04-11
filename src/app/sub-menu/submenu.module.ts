import { NgModule } from '@angular/core';
import { TotalFeatureComponent } from './total-feature/total-feature';
import { MyChartsModule } from '../charts/charts.module';
import { CommonModule } from '@angular/common';
import { BankDComponent } from './bank-dimension/bank-dimension';
import { NetDComponent } from './net-dimension/net-dimension';
import { DistDComponent } from './dist-dimension/dist-dimension';
import { TaskDComponent } from './task-dimension/task-dimension';
import { FirmDComponent } from './firm-dimension/firm-dimension';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms'
import { NetAnalysisComponent} from './net-analysis/net-analysis';
import { ModalModule} from 'ngx-bootstrap';
import { PredictNodeComponent} from './predict-node/predict-node'


@NgModule({
    declarations: [
        TotalFeatureComponent,
        BankDComponent,
        NetDComponent,
        DistDComponent,
        PredictNodeComponent,
        TaskDComponent,
        FirmDComponent,
        NetAnalysisComponent
    ],
    imports: [
        MyChartsModule,
        CommonModule,
       FormsModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),

    ],
    exports: [
        TotalFeatureComponent,
        BankDComponent,
        NetDComponent,
        DistDComponent,

        PredictNodeComponent,
        TaskDComponent,
        FirmDComponent,
        NetAnalysisComponent
    ]
})

export class SubMenuModule { }