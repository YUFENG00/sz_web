import { Component } from '@angular/core';
import { KylinHandler } from '../providers/http-handler/kylin-handler';
import { Config } from './config';
import { Router, NavigationStart } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private kylinHandler: KylinHandler, private router: Router) {
    let tokenKey = btoa(Config.kylinUsername + ":" + Config.kylinPassword);
    localStorage.setItem('token', tokenKey)

  }



}
