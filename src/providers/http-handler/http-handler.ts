import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HttpHandler {

    constructor(public http: Http) {
    }

    get(url: string, options: any,token:boolean) {

        let that = this;
        return new Promise(async function (resolve, reject) {
            if (token) {
                let tokenKey = localStorage.getItem('token')
                let headers = new Headers({ 'Authorization': 'Basic ' + tokenKey });
                options = new RequestOptions({ headers: headers });
            }
            that.http.get(url, options)
                .map(res => { if (res) return res.json() })
                .subscribe(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                    console.log(error);
                }
                )
        })

    }

    post(url: string, body: any, options: any, token:boolean) {
        let that = this;
        return new Promise(async function (resolve, reject) {
            if (token) {
                let tokenKey = localStorage.getItem('token')
                let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + tokenKey });
                options = new RequestOptions({ headers: headers });
            }
            that.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                }
                )

        })
    }

}