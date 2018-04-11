import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHandler } from './http-handler';


/*
  Generated class for the ApiHandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NetWorkHandler {
    headers = new Headers({ 'content-type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });


    constructor(public httpHandler: HttpHandler, public http: Http) {
      
    }
    
    getNetWorkList(url:string) {
        return this.httpHandler.get(url,"",false);
    }

    getXzl(url: string) {
        return this.httpHandler.get(url,"",false);
    }

    getXq(url: string) {
        return this.httpHandler.get(url,"",false);
    }

    nodePredict(url: string,adds: string,region:string,bank:string) {
        let tbody :any= { loc: adds, region: region, bank: bank }
        let body =JSON.stringify(tbody)
        return this.httpHandler.post(url, body,this.options ,false);
    }

    relativeTask(url: string,name: string) {
        let tbody :any= { name: name}
        let body =JSON.stringify(tbody)
        return this.httpHandler.post(url, body,this.options ,false);
    }
}