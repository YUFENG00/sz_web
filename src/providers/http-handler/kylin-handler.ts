import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHandler } from './http-handler';


/*
  Generated class for the ApiHandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class KylinHandler {


    constructor(public httpHandler: HttpHandler, public http: Http) {

    }

    getlist(url: string) {
        return this.httpHandler.get(url,"", true);
    }
    postQuery(url: string, sql: string, project: string, offset: number, limit: number) {
         let tbody :any= { sql: sql, offset: offset, acceptPartial: false, project: project }
        if(limit!=-1){
            tbody.limit=limit
        }     
        let body =JSON.stringify(tbody)
        return this.httpHandler.post(url, body,"", true)

    }
    postQueryBankname(url: string, sql: string, project: string){
        console.log(sql);
         let tbody :any= { sql: sql, project: project }
         let body =JSON.stringify(tbody)
        return this.httpHandler.post(url, body,"", true)

    }

}