import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHandler } from './http-handler';
import { Config } from './../../app/config'


/*
  Generated class for the ApiHandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginHandler {
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    constructor(public httpHandler: HttpHandler, public http: Http) {

    }
    register(email: string, password: string, nickname: string) {
        let url = Config.nodeUrl + Config.register;
        let tbody: any = { email: email, password: password, nickname: nickname }
        let body = JSON.stringify(tbody)
        return this.httpHandler.post(url, body, this.options, false)

    }
    login(email: string, password: string) {
        let url = Config.nodeUrl + Config.login;
        let tbody: any = { email: email, password: password }
        let body = JSON.stringify(tbody)
        return this.httpHandler.post(url, body, this.options, false)

    }
    changePassword(email:string,oldPassword:string,newPassword:string){
         let url = Config.nodeUrl + Config.changePassword;
        let tbody: any = { email: email, oldPassword: oldPassword,newPassword:newPassword }
        let body = JSON.stringify(tbody)
        return this.httpHandler.post(url, body, this.options, false)


    }

}