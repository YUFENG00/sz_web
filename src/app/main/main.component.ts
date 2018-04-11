import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from "ts-md5/dist/md5";
import { LoginHandler } from '../../providers/http-handler/login-handler';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(ModalDirective) parentModal: ModalDirective;
  selectIndex: number = 1;
  password: any = {
    "old": "",
    "new": "",
    "new1": ""
  }
  userinfo: any;
  nickname: any;
  constructor(private loginHandler: LoginHandler, private router: Router) {
    if (localStorage.getItem("logined")) {

    } else {
      router.navigate(['login'])
    }
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"))
    if (this.userinfo) {
      this.nickname = this.userinfo.nickname;
    }
    let hArray = this.router.url.split('/')
    switch (hArray[hArray.length - 2]) {
      case 'dataAnalysis':
        this.selectIndex = 1;
        break;

      case 'preAnalysis':
        this.selectIndex = 2;
        break;

      case 'otherAnalysis':
        this.selectIndex = 3;
        break;
    }
  }

  ngOnInit() {

  }
  gotoDataAnalysis(): void {
    this.selectIndex = 1
  }

  gotoPreAnalysis(): void {
    this.selectIndex = 2
  }

  gotoOtherAnalysis(): void {
    this.selectIndex = 3
  }

  changePassword() {
    let email = this.userinfo.email;
    if (email && this.password.old != "" && this.password.new != "" && (this.password.new == this.password.new1)) {
      let oldPassword = Md5.hashStr(this.password.old).toString();
      let newPassword = Md5.hashStr(this.password.new).toString();

      this.loginHandler.changePassword(email, oldPassword, newPassword).then((res: any) => {
        if (res.result == "SUCCESS") {
          alert('修改密码成功')
          this.parentModal.hide();
          this.password = { "old": "", "new": "", "new1": "" }
        } else {
          alert("修改密码失败，请重新输入")
        }
      }, (err: any) => {
        alert("请检查网络连接状态")
      })

    }
  }
  loginOut() {
    localStorage.removeItem('userinfo');
    localStorage.removeItem('logined');
    this.router.navigate(['login'])
  }

  test() {
    console.log(this.router.url)
  }


}
