import { Component, OnInit, ViewChild, ViewChildren, ElementRef,TemplateRef } from '@angular/core';
import { NetWorkHandler } from '../../../providers/http-handler/network-handler';
import { print } from 'util';
import { Config } from '../../config';
import { ModalDirective} from 'ngx-bootstrap'

@Component({
    selector: 'predict-node',
    templateUrl: './predict-node.html',
    styleUrls: ['./predict-node.css']
  })
  export class PredictNodeComponent {
    @ViewChild('mapContainer')
    container: ElementRef;
    map: any;
    _height: any;
    bankList: Array<any> = [{name:'中信银行',index:1},{name:'中行',index:2},{name:'交行',index:3},{name:'兴业银行',index:4},
                            {name:'工行',index:5},{name:'建行',index:6},{name:'招行',index:7}];
    regionList: Array<any> = [
        {region:'光明新区',index:1,loc:[113.923662,22.779082]},{region:'南山区',index:2,loc:[113.937144,22.538768]},{region:'坪山区',index:3,loc:[114.357043,22.715184]},{region:'大鹏新区',index:4,loc:[114.481151,22.604027]},{region:'宝安区',index:5,loc:[113.890296,22.561346]},
        {region:'盐田区',index:6,loc:[114.243261,22.563531]},{region:'福田区',index:7,loc:[114.064803,22.549054]},{region:'罗湖区',index:8,loc:[114.138093,22.554636]},{region:'龙华区',index:9,loc:[114.051098,22.702342]},{region:'龙岗区',index:10,loc:[114.25261,22.726668]},
    ];
    selectedRegion: any;
    selectedBank: any = this.bankList[0];
    detailAdds: any = '请在地图上点击选择具体地址';
    detailLoc: any;
    startChoose: boolean = false;
    clickOldNode: boolean = false;
    clickNewNode: boolean = false;

    constructor(private netWorkHandler: NetWorkHandler) {
        this._height = window.innerHeight - 135 + 'px'
    }

    // changeRegion(data): void {
    //     this.selectedRegion = data;
    //     let point = new BMap.Point(this.selectedRegion.loc[0], this.selectedRegion.loc[1]);
    //     this.map.centerAndZoom(point, 16); 
    // }

    chooseNode(): void {
        this.startChoose = true;
        this.map.setDefaultCursor("url('assets/marker.ico')");
    }

    changeBank(data): void {
        this.selectedBank = data;
    }

    ngAfterViewInit(): void {
        let that=this;
        this.map = new BMap.Map(this.container.nativeElement);
        let point = new BMap.Point(114.1, 22.6);
        this.map.centerAndZoom(point, 12);             // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(); // 允许滚轮缩放
        this.map.addControl(new BMap.NavigationControl());
        this.map.addControl(new BMap.MapTypeControl());
        this.map.addControl(new BMap.ScaleControl('BMAP_ANCHOR_BOTTOM_RIGHT'));

        this.netWorkHandler.getNetWorkList(Config.baseurl + Config.netAnalysis)
        .then((res: any) => {
            if(res.result=='SUCCESS' && res.data) {
                let markerData = res.data
                let icon = new BMap.Icon('assets/marker2.png', new BMap.Size(32, 32));
                for (let x in markerData) {
                    let polyPoint = [];
                    for(let i = 0; i <markerData[x].length; i++) {
                        let point = new BMap.Point(markerData[x][i].lng,markerData[x][i].lat);
                        let marker = new BMap.Marker(point, { icon: icon });
                        this.map.addOverlay(marker);
                        let clickPoint = markerData[x][i];
                        marker.addEventListener("click", function () {
                          that.clickOldNode = true;  
                          let sContent =
                            '<ul style="margin:0 0 5px 0;padding:0.2em 0">'
                            + '<li style="line-height: 26px;font-size: 15px;">'
                            + '<span style="width: 100px;display: inline-block;">业务量：</span>' + clickPoint.bsum + '</li>'
                            // + '<li style="line-height: 26px;font-size: 15px;">'
                            // + '<span style="width: 100px;display: inline-block;">业务占比：</span>' + clickPoint.bratio*100 +'%' + '</li>'
                            // + '<li style="line-height: 26px;font-size: 15px;">'
                            // + '<span style="width: 100px;display: inline-block;">距最小点：</span>' + clickPoint.lg_to_min + '米' +'</li>'
                            // + '<li style="line-height: 26px;font-size: 15px;">'
                            + '<span style="width: 100px;display: inline-block;">名称：</span>' + clickPoint.name + '</li>'
                            + '</ul>';
                          let infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
                          marker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
                        });
                    }
                }
            }        
        },(err: any) => {

        })
            

        var geoc = new BMap.Geocoder(); 
        this.map.addEventListener("click", function(e){ 
            if(!that.clickOldNode && !that.clickNewNode) {
                that.selectedRegion = '';  
                //通过点击百度地图，可以获取到对应的point, 由point的lng、lat属性就可以获取对应的经度纬度     
                var pt = e.point;
                geoc.getLocation(pt, function(rs){
                    //addressComponents对象可以获取到详细的地址信息
                    var addComp = rs.addressComponents;
                    var site = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    console.log(site);
                    console.log(pt);
                    that.detailAdds = site;
                    that.detailLoc = pt;
                    for(let i = 0; i < that.regionList.length; i++) {
                        if(that.regionList[i].region == addComp.district) {
                            that.selectedRegion = that.regionList[i];
                            break;
                        }
                    }
                    if(that.startChoose && that.selectedRegion=='') {
                        alert('请选择正确区域！')
                        return;
                    }
                    console.log(addComp.district)
                    console.log(that.selectedRegion)
                    if(that.startChoose) {
                        that.startPredict(pt);
                    }
                    else if(!that.startChoose && !that.clickOldNode && !that.clickNewNode) {
                    alert('请点击开始选点按钮')
                    }               
                });    
            } 
            that.clickOldNode = false;
            that.clickNewNode = false;      
        });   
        // this.getRadius();
    }

    startPredict(data): void {
        let that = this;
        let removeMarker = function(e, ee, marker) {
            this.map.removeOverlay(marker);
        }
        let icon = new BMap.Icon('assets/marker1.png', new BMap.Size(32, 32));
        let point = new BMap.Point(this.detailLoc.lng, this.detailLoc.lat);
        this.map.centerAndZoom(point, 14);
        let marker = new BMap.Marker(point, { icon: icon });
        this.map.addOverlay(marker);
        var markerMenu=new BMap.ContextMenu();
        markerMenu.addItem(new BMap.MenuItem('删除站点',removeMarker.bind(marker)));
        marker.addContextMenu(markerMenu);//给标记添加右键菜单
        if(this.selectedRegion && this.selectedBank && this.detailLoc) {
            this.netWorkHandler.nodePredict(Config.baseurl + Config.preNode,data,this.selectedRegion.index,this.selectedBank.index)
            .then((res: any) => {
                console.log(res);
                this.startChoose = false;
                let sContent =
                '<ul style="margin:0 0 5px 0;padding:0.2em 0">'
                + '<li style="line-height: 26px;font-size: 15px;">'
                + '<span style="width: 100px;display: inline-block;">预测业务量：</span>' + Math.round(res.bsum) + '</li>'
                + '<li style="line-height: 26px;font-size: 15px;">'
                + '<span style="width: 100px;display: inline-block;">地址：</span>' + this.detailAdds + '</li>'
                + '</ul>';
                let infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
                marker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow

                marker.addEventListener("click", function () {
                  that.clickNewNode = true;
                  let sContent =
                    '<ul style="margin:0 0 5px 0;padding:0.2em 0">'
                    + '<li style="line-height: 26px;font-size: 15px;">'
                    + '<span style="width: 100px;display: inline-block;">预测业务量：</span>' + Math.round(res.bsum) + '</li>'
                    + '<li style="line-height: 26px;font-size: 15px;">'
                    + '<span style="width: 100px;display: inline-block;">地址：</span>' + that.detailAdds + '</li>'
                    + '</ul>';
                  let infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
                  marker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
                });
            },(err: any) => {

            })

        }
    }

    // getRadius() {
    //     let data = lx.RECORDS 
    //     let point1 = new BMap.Point(data[0].slng, data[0].slat)
    //     this.map.centerAndZoom(point1,10); 
    //     let icon = new BMap.Icon('assets/marker2.png', new BMap.Size(32, 32));
    //     let marker = new BMap.Marker(point1, { icon: icon });
    //     this.map.addOverlay(marker);
    //     let icon2 = new BMap.Icon('assets/marker1.png', new BMap.Size(32, 32));
    //     for(let i = 0; i < data.length; i++) {
    //         let point = new BMap.Point(data[i].flng, data[i].flat)
    //         let marker = new BMap.Marker(point, { icon: icon2 });
    //         this.map.addOverlay(marker);
    //     }
    //     data.sort((a:any,b:any) => {
    //         return a.f_s_dis -b.f_s_dis
    //     })
    //     let R = data[Math.floor(data.length*0.25)].f_s_dis;
    //     let circle = new BMap.Circle(point1,R,{strokeColor:'blue',fillColor:'gray'});
    //     this.map.addOverlay(circle);

    // }




  }

  