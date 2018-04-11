import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import  {FormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MyChartsModule} from './charts/charts.module';


import {AppComponent} from './app.component';
import {TabOneComponent} from  './tabone/tab-one.component'
import  {HeroDetailComponent} from './tabdetial/hero-detail.component'
import { HeroService } from './diff-class/hero.service'
import { BaiduMapModule } from 'angular2-baidu-map';
import { HttpHandler } from '../providers/http-handler/http-handler';
import { NetWorkHandler } from '../providers/http-handler/network-handler';
import { ENPublicFunction } from '../providers/en-public-function';
import { SqlString} from '../providers/sql-string'
import { KylinHandler } from '../providers/http-handler/kylin-handler';
import { HeatmapComponent} from './heatmap/heatmap';
import { PreAnalysisComponent} from './pre-analysis/pre-analysis';
import { DataAnalysisComponent} from './data-analysis/data-analysis';
import { OtherAnalysisComponent} from './other-analysis/other-analysis';
 import { AppRoutingModule }     from './app-router.module';
import { SubMenuModule} from './sub-menu/submenu.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LoginHandler } from '../providers/http-handler/login-handler'


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MyChartsModule,
         AppRoutingModule,
        SubMenuModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [
        AppComponent,
        TabOneComponent,
        HeroDetailComponent,
        HeatmapComponent,
        PreAnalysisComponent,
        DataAnalysisComponent,
        OtherAnalysisComponent,
        LoginComponent,
        MainComponent,   
    ],
    providers: [
        HeroService,
        HttpHandler,
        NetWorkHandler,
        KylinHandler,
        ENPublicFunction,
        SqlString,
        LoginHandler,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
