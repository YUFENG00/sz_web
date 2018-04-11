import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabOneComponent } from './tabone/tab-one.component'
import { HeroService } from './diff-class/hero.service'
import { BaiduMapModule } from 'angular2-baidu-map';
import { HttpHandler } from '../providers/http-handler/http-handler';
import { NetWorkHandler } from '../providers/http-handler/network-handler';
import { PredictNodeComponent} from './sub-menu/predict-node/predict-node'
import { HeatmapComponent } from './heatmap/heatmap';
import { PreAnalysisComponent } from './pre-analysis/pre-analysis';
import { DataAnalysisComponent } from './data-analysis/data-analysis';
import { OtherAnalysisComponent } from './other-analysis/other-analysis';
import { TotalFeatureComponent } from './sub-menu/total-feature/total-feature';
import { BankDComponent } from './sub-menu/bank-dimension/bank-dimension';
import { NetDComponent } from './sub-menu/net-dimension/net-dimension';
import { DistDComponent } from './sub-menu/dist-dimension/dist-dimension';
import { TaskDComponent } from './sub-menu/task-dimension/task-dimension';
import { FirmDComponent } from './sub-menu/firm-dimension/firm-dimension';
import { NetAnalysisComponent } from './sub-menu/net-analysis/net-analysis';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'main',
                component: MainComponent
            }
        ],{ useHash: true }),
        RouterModule.forChild([
            {
                path: "main",
                component: MainComponent,
                children: [
                    { path: '', redirectTo: 'dataAnalysis', pathMatch: 'full' },
                    {
                        path: 'dataAnalysis',
                        component: DataAnalysisComponent,
                        children:
                        [
                            { path: '', redirectTo: 'totalfeature', pathMatch: 'full' },
                            { path: 'totalfeature', component: TotalFeatureComponent },
                            { path: 'bankd', component: BankDComponent },
                            { path: 'netd', component: NetDComponent },
                            { path: 'distd', component: DistDComponent },
                            { path: 'businessd', component: TaskDComponent },
                            { path: 'firmd', component: FirmDComponent }
                        ]
                    },
                    {
                        path: 'preAnalysis',
                        component: PreAnalysisComponent,
                        children: [
                            { path: '', redirectTo: 'netmap', pathMatch: 'full' },
                            { path: 'netmap', component: TabOneComponent },
                            { path: 'heatmap', component: HeatmapComponent },
                            { path: 'netanalysis', component: NetAnalysisComponent },
                            {path: 'predictnode', component: PredictNodeComponent}
                        ]

                    },
                    {
                        path: 'otherAnalysis',
                        component: OtherAnalysisComponent,
                        children: [
                            { path: '', redirectTo: 'businesstype', pathMatch: 'full' },
                        ]
                    }
                ]
            }
        ]),
        BaiduMapModule.forRoot({ ak: "nQG3uwNP9Fmj281pmpgd24oOrLeCFjHk" }),
    ],

    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }