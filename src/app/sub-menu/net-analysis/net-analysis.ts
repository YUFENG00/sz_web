import { Component, OnInit, ViewChild, ViewChildren, ElementRef,TemplateRef } from '@angular/core';
import { NetWorkHandler } from '../../../providers/http-handler/network-handler';
import { print } from 'util';
import { Config } from '../../config';
import { ModalDirective} from 'ngx-bootstrap'

@Component({
    selector: 'net-analysis',
    templateUrl: './net-analysis.html',
    styleUrls: ['./net-analysis.css']
  })
  export class NetAnalysisComponent {
    @ViewChild('mapContainer')
    container: ElementRef;
    map: any;
    _height: any;
    markerData: any;
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    isModalShown: any;
    bratioPie: any;
    radiusList:Array<any> = [200,300,400,500,600,700,800,900,1000];
    selectedRadius:any=this.radiusList[3];

    bratioList:Array<any> = [0.1,0.15,0.2,0.25];
    selectedBratio: any=this.bratioList[3];

    minNodeList: Array<any>;
    minNodeShown: boolean = false;
    bankList: Array<any> = ['中信银行','中行','交行','兴业银行','工行','建行','招行','管理部'];
    regionList: any=[
        {region:'光明新区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'南山区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'坪山区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'大鹏新区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'宝安区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'盐田区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'福田区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'罗湖区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'龙华区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
        {region:'龙岗区',zxyh:0,zhongh:0,jiaoh:0,xyyh:0,gh:0,jianh:0,zhaoh:0,glb:0},
    ];
    constructor(private netWorkHandler: NetWorkHandler) {
        this._height = window.innerHeight - 135 + 'px'
    }
   
    hideModal(): void {
      this.autoShownModal.hide();
    }
   
    onHidden(): void {
      this.isModalShown = false;
      this.minNodeShown = false;
    }

    changeRadius(data): void {
        this.selectedRadius = data;
        this.overlayBank();
    }

    changeBratio(data): void {
        this.selectedBratio = data;
        this.overlayBank();
    }
   
    showMinNode() {
        if(this.minNodeList.length) {
            for(let i = 0; i < this.minNodeList.length; i++) {
                if(this.minNodeList[i].region=='光明新区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[0].zxyh++;
                }
                if(this.minNodeList[i].region=='光明新区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[0].zxyh++;
                }
                if(this.minNodeList[i].region=='光明新区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[0].jiaoh++;
                }
                if(this.minNodeList[i].region=='光明新区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[0].xyyh++;
                }
                if(this.minNodeList[i].region=='光明新区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[0].gh++;
                }
                if(this.minNodeList[i].region=='光明新区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[0].jianh++;
                }
                if(this.minNodeList[i].region=='光明新区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[0].zhaoh++;
                }
                if(this.minNodeList[i].region=='光明新区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[0].glb++;
                }

                if(this.minNodeList[i].region=='南山区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[1].zxyh++;
                }
                if(this.minNodeList[i].region=='南山区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[1].zxyh++;
                }
                if(this.minNodeList[i].region=='南山区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[1].jiaoh++;
                }
                if(this.minNodeList[i].region=='南山区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[1].xyyh++;
                }
                if(this.minNodeList[i].region=='南山区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[1].gh++;
                }
                if(this.minNodeList[i].region=='南山区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[1].jianh++;
                }
                if(this.minNodeList[i].region=='南山区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[1].zhaoh++;
                }
                if(this.minNodeList[i].region=='南山区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[1].glb++;
                }

                if(this.minNodeList[i].region=='坪山区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[2].zxyh++;
                }
                if(this.minNodeList[i].region=='坪山区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[2].zxyh++;
                }
                if(this.minNodeList[i].region=='坪山区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[2].jiaoh++;
                }
                if(this.minNodeList[i].region=='坪山区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[2].xyyh++;
                }
                if(this.minNodeList[i].region=='坪山区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[2].gh++;
                }
                if(this.minNodeList[i].region=='坪山区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[2].jianh++;
                }
                if(this.minNodeList[i].region=='坪山区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[2].zhaoh++;
                }
                if(this.minNodeList[i].region=='坪山区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[2].glb++;
                }

                if(this.minNodeList[i].region=='大鹏新区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[3].zxyh++;
                }
                if(this.minNodeList[i].region=='大鹏新区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[3].zxyh++;
                }
                if(this.minNodeList[i].region=='大鹏新区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[3].jiaoh++;
                }
                if(this.minNodeList[i].region=='大鹏新区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[3].xyyh++;
                }
                if(this.minNodeList[i].region=='大鹏新区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[3].gh++;
                }
                if(this.minNodeList[i].region=='大鹏新区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[3].jianh++;
                }
                if(this.minNodeList[i].region=='大鹏新区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[3].zhaoh++;
                }
                if(this.minNodeList[i].region=='大鹏新区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[3].glb++;
                }


                if(this.minNodeList[i].region=='宝安区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[4].zxyh++;
                }
                if(this.minNodeList[i].region=='宝安区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[4].zxyh++;
                }
                if(this.minNodeList[i].region=='宝安区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[4].jiaoh++;
                }
                if(this.minNodeList[i].region=='宝安区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[4].xyyh++;
                }
                if(this.minNodeList[i].region=='宝安区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[4].gh++;
                }
                if(this.minNodeList[i].region=='宝安区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[4].jianh++;
                }
                if(this.minNodeList[i].region=='宝安区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[4].zhaoh++;
                }
                if(this.minNodeList[i].region=='宝安区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[4].glb++;
                }

                if(this.minNodeList[i].region=='盐田区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[5].zxyh++;
                }
                if(this.minNodeList[i].region=='盐田区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[5].zxyh++;
                }
                if(this.minNodeList[i].region=='盐田区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[5].jiaoh++;
                }
                if(this.minNodeList[i].region=='盐田区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[5].xyyh++;
                }
                if(this.minNodeList[i].region=='盐田区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[5].gh++;
                }
                if(this.minNodeList[i].region=='盐田区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[5].jianh++;
                }
                if(this.minNodeList[i].region=='盐田区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[5].zhaoh++;
                }
                if(this.minNodeList[i].region=='盐田区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[5].glb++;
                }


                if(this.minNodeList[i].region=='福田区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[6].zxyh++;
                }
                if(this.minNodeList[i].region=='福田区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[6].zxyh++;
                }
                if(this.minNodeList[i].region=='福田区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[6].jiaoh++;
                }
                if(this.minNodeList[i].region=='福田区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[6].xyyh++;
                }
                if(this.minNodeList[i].region=='福田区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[6].gh++;
                }
                if(this.minNodeList[i].region=='福田区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[6].jianh++;
                }
                if(this.minNodeList[i].region=='福田区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[6].zhaoh++;
                }
                if(this.minNodeList[i].region=='福田区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[6].glb++;
                }

                if(this.minNodeList[i].region=='罗湖区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[7].zxyh++;
                }
                if(this.minNodeList[i].region=='罗湖区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[7].zxyh++;
                }
                if(this.minNodeList[i].region=='罗湖区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[7].jiaoh++;
                }
                if(this.minNodeList[i].region=='罗湖区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[7].xyyh++;
                }
                if(this.minNodeList[i].region=='罗湖区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[7].gh++;
                }
                if(this.minNodeList[i].region=='罗湖区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[7].jianh++;
                }
                if(this.minNodeList[i].region=='罗湖区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[7].zhaoh++;
                }
                if(this.minNodeList[i].region=='罗湖区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[7].glb++;
                }

                if(this.minNodeList[i].region=='龙华区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[8].zxyh++;
                }
                if(this.minNodeList[i].region=='龙华区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[8].zxyh++;
                }
                if(this.minNodeList[i].region=='龙华区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[8].jiaoh++;
                }
                if(this.minNodeList[i].region=='龙华区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[8].xyyh++;
                }
                if(this.minNodeList[i].region=='龙华区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[8].gh++;
                }
                if(this.minNodeList[i].region=='龙华区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[8].jianh++;
                }
                if(this.minNodeList[i].region=='龙华区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[8].zhaoh++;
                }
                if(this.minNodeList[i].region=='龙华区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[8].glb++;
                }

                if(this.minNodeList[i].region=='龙岗区' && this.minNodeList[i].bankname=='中信银行') {
                    this.regionList[9].zxyh++;
                }
                if(this.minNodeList[i].region=='龙岗区' && this.minNodeList[i].bankname=='中行') {
                    this.regionList[9].zxyh++;
                }
                if(this.minNodeList[i].region=='龙岗区' && this.minNodeList[i].bankname=='交行') {
                    this.regionList[9].jiaoh++;
                }
                if(this.minNodeList[i].region=='龙岗区' && this.minNodeList[i].bankname=='兴业银行') {
                    this.regionList[9].xyyh++;
                }
                if(this.minNodeList[i].region=='龙岗区' && this.minNodeList[i].bankname=='工行') {
                    this.regionList[9].gh++;
                }
                if(this.minNodeList[i].region=='龙岗区' && this.minNodeList[i].bankname=='建行') {
                    this.regionList[9].jianh++;
                }
                if(this.minNodeList[i].region=='龙岗区' && this.minNodeList[i].bankname=='招行') {
                    this.regionList[9].zhaoh++;
                }
                if(this.minNodeList[i].region=='龙岗区' && this.minNodeList[i].bankname=='管理部') {
                    this.regionList[9].glb++;
                }
            }
        }
        this.minNodeShown = true;
    }

    minNodeDetail(data): void {
       this.minNodeShown=false;
       let point = new BMap.Point(data.lng,data.lat)
       this.map.centerAndZoom(point,16); 
       let icon = new BMap.Icon('assets/marker2.png', new BMap.Size(32, 32));
       let marker = new BMap.Marker(point, { icon: icon });
       this.map.addOverlay(marker);
       let sContent =
       '<ul style="margin:0 0 5px 0;padding:0.2em 0">'
       + '<li style="line-height: 26px;font-size: 15px;">'
       + '<span style="width: 100px;display: inline-block;">业务量：</span>' + data.bsum + '</li>'
       + '<li style="line-height: 26px;font-size: 15px;">'
       + '<span style="width: 100px;display: inline-block;">业务占比：</span>' + data.bratio*100 + '%' + '</li>'
       + '<li style="line-height: 26px;font-size: 15px;">'
       + '<span style="width: 100px;display: inline-block;">距最小点：</span>' + data.lg_to_min + '米' +'</li>'
       + '<li style="line-height: 26px;font-size: 15px;">'
       + '<span style="width: 100px;display: inline-block;">名称：</span>' + data.name + '</li>'
       + '</ul>';
     let infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
     marker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
    }


    ngAfterViewInit(): void {
        this.map = new BMap.Map(this.container.nativeElement);
        var point = new BMap.Point(114.1, 22.6);
        this.map.centerAndZoom(point, 12);             // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(); // 允许滚轮缩放
        this.map.addControl(new BMap.NavigationControl());
        this.map.addControl(new BMap.MapTypeControl());
        this.map.addControl(new BMap.ScaleControl('BMAP_ANCHOR_BOTTOM_RIGHT'));
        this.overlayBank();
    }

    overlayBank() {
        let that=this;
        this.map.clearOverlays();
        this.minNodeList = [];
        this.netWorkHandler.getNetWorkList(Config.baseurl + Config.netAnalysis)
        .then((res: any) => {
            if(res.result=='SUCCESS' && res.data) {
                this.markerData = res.data
                let icon = new BMap.Icon('assets/marker1.png', new BMap.Size(32, 32));
                for (let x in this.markerData) {
                    // 寻找一个组内第二小的点 如果只有一个点则默认为该点
                    let secondMin = this.markerData[x][0];
                    if(this.markerData[x].length > 1) {
                        this.markerData[x].sort((a:any, b:any) => {
                            return a.lg_to_min - b.lg_to_min
                        })
                        secondMin = this.markerData[x][1];
                        this.markerData[x].sort((a:any, b:any) => {
                            return a.bsum - b.bsum
                        })
                    }
                    let polyPoint = [];
                    for(let i = 0; i <this.markerData[x].length; i++) {
                        let point = new BMap.Point(this.markerData[x][i].lng, this.markerData[x][i].lat);
                        polyPoint.push(point);
                        if(this.markerData[x][i].lg_to_min==0 && this.markerData[x].length>1 && secondMin.lg_to_min < that.selectedRadius && this.markerData[x][i].bratio < that.selectedBratio) {
                            //组内业务量最小 且在500米内有其他点
                            if(!this.minNodeList.includes(this.markerData[x][0])) {
                                that.minNodeList.push(this.markerData[x][0]);
                            }
                            icon = new BMap.Icon('assets/marker2.png', new BMap.Size(32, 32));
                            let circle = new BMap.Circle(point,that.selectedRadius,{strokeColor:'blue',fillColor:'gray'});
                            this.map.addOverlay(circle);
                        }
                        else {
                            icon = new BMap.Icon('assets/marker1.png', new BMap.Size(32, 32));
                        }
                        let marker = new BMap.Marker(point, { icon: icon });
                        this.map.addOverlay(marker);
                        let clickPoint = this.markerData[x][i];
                        marker.addEventListener("click", function () {
                          let sContent =
                            '<ul style="margin:0 0 5px 0;padding:0.2em 0">'
                            + '<li style="line-height: 26px;font-size: 15px;">'
                            + '<span style="width: 100px;display: inline-block;">业务量：</span>' + clickPoint.bsum + '</li>'
                            + '<li style="line-height: 26px;font-size: 15px;">'
                            + '<span style="width: 100px;display: inline-block;">业务占比：</span>' + clickPoint.bratio*100 +'%' + '</li>'
                            + '<li style="line-height: 26px;font-size: 15px;">'
                            + '<span style="width: 100px;display: inline-block;">距最小点：</span>' + clickPoint.lg_to_min + '米' +'</li>'
                            + '<li style="line-height: 26px;font-size: 15px;">'
                            + '<span style="width: 100px;display: inline-block;">名称：</span>' + clickPoint.name + '</li>'
                            + '</ul>';
                          let infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
                          marker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
                        });
                    }
                    if(polyPoint.length > 3) {
                        polyPoint = this.groupSort(polyPoint);
                    }
                    let polygon = new BMap.Polygon(polyPoint,{strokeColor:'green',fillColor:'yellow'});
                    this.map.addOverlay(polygon);
                    let clickPolygon = this.markerData[x];
                    polygon.addEventListener('click',function () {
                        that.isModalShown = true;
                        that.bratioPie = clickPolygon;
                    })
                }
                that.showMinNode();
            }
        },(err: any) => {

        })
    }

    arrayAvg(arr: any) {
        let sum = 0;
        let avg = 0;
        if(arr.length) {
            for(let i = 0; i < arr.length; i++) {
                sum += arr[i];
            }
            avg = sum/arr.length
        }
        return avg;
    }

    groupCenter(arr: any) {
        let lat = [];
        let lng = [];
        for(let i = 0; i < arr.length; i++) {
            lat.push(arr[i].lat);
            lng.push(arr[i].lng);
        }
        let latMean = this.arrayAvg(lat);
        let lngMean = this.arrayAvg(lng);
        return [latMean,lngMean]
    }

    groupSort(arr: any) {
        let mean = this.groupCenter(arr);
        for(let i = 0; i < arr.length; i++) {
            let angle = Math.atan2(arr[i].lng-mean[1],arr[i].lat-mean[0]);
            arr[i].angle = angle;
        }
        arr.sort((a:any, b:any) => {
            return a.angle - b.angle
        })
        for(let i = 0; i < arr.length; i++) {
            delete arr[i].angle
        }
        return arr;
    }



  }

  