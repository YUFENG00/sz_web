import { Component, OnInit } from '@angular/core';
import { LoginHandler } from '../../providers/http-handler/login-handler';
import { Md5 } from "ts-md5/dist/md5";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    "email": "",
    "password": ""
  }


  constructor(private loginHandler: LoginHandler, private router: Router) { }

  ngOnInit() {
  }
  gotoMain() {

    if (this.user.email != "" && this.user.password != "") {
      this.loginHandler.login(this.user.email, Md5.hashStr(this.user.password).toString()).then((res: any) => {
        if (res.result == "SUCCESS") {
          localStorage.setItem('userinfo', JSON.stringify(res.data))
          localStorage.setItem('logined', 'true')
          this.router.navigate(['main/dataAnalysis/totalfeature'])
        } else {
          alert("账号或者密码错误")
        }

      }, (err: any) => {
        alert("请检查网络连接状态")

      })

    } else {
      alert("账号或密码为空")
    }

  }

}
