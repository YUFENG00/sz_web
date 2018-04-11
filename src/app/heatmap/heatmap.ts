import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NetWorkHandler } from '../../providers/http-handler/network-handler';
import { print } from 'util';
import { Config } from '../config';




@Component({
  selector: 'heat-map',
  templateUrl: './heatmap.html',
  styleUrls: ['./heatmap.css']
})
export class HeatmapComponent {
  @ViewChild('mapContainer')
  container: ElementRef;
  map: any;
  heatmapOverlay: any;
  markerData: Array<any> = [];
  showStation: boolean = false;

  showXq: boolean = false;
  showXzl: boolean = false;
  btnOptionXq: string = '叠加';
  btnOptionXzl: string = '叠加';
  btnOptionBank: string = '叠加';
  _height: any;
  xzlPoints: any = [];
  xqPoints: any = [];



  constructor(private netWorkHandler: NetWorkHandler) {
    this._height = window.innerHeight - 135 + 'px'
  }

  ngAfterViewInit(): void {

    this.map = new BMap.Map(this.container.nativeElement);
    var point = new BMap.Point(114.1, 22.6);
    this.map.centerAndZoom(point, 12);             // 初始化地图，设置中心点坐标和地图级别
    this.map.enableScrollWheelZoom(); // 允许滚轮缩放
    this.map.addControl(new BMap.NavigationControl());
    this.map.addControl(new BMap.MapTypeControl())
    this.map.addControl(new BMap.ScaleControl('BMAP_ANCHOR_BOTTOM_RIGHT'))
    this.heatmapOverlay = new BMapLib.HeatmapOverlay({
      "radius": 35,
      "gradient": {
        .1: 'blue',
        .3: 'green',
        .6: 'yellow',
        .8: 'red'
      }
    });
    this.map.addOverlay(this.heatmapOverlay);
    this.overlayXzl();
  }

  showHeatmap(): void {
    this.heatmapOverlay.show();
  }

  hideHeatmap(): void {
    this.heatmapOverlay.hide();
    if (this.showXzl) {
      this.showXzl = false;
      this.overlayXzl();
    }
    if (this.showXq) {
      this.showXq = false;
      this.overlayXq();
    }
  }

  overlayBank() {
    if (this.showStation == false) {

      this.netWorkHandler.getNetWorkList(Config.baseurl + Config.bankdataJson)
        .then((res: any) => {
          this.showStation = true;
          this.btnOptionBank = '移除';
          this.markerData = res.RECORDS
          let icon = new BMap.Icon('assets/marker1.png', new BMap.Size(32, 32));
          for (let i = 0; i < this.markerData.length; i++) {
            let point = new BMap.Point(this.markerData[i].longitude, this.markerData[i].latitude);
            let marker = new BMap.Marker(point, { icon: icon });
            this.map.addOverlay(marker);
            let clickPoint = this.markerData[i];
            marker.addEventListener("click", function () {
              let sContent =
                '<ul style="margin:0 0 5px 0;padding:0.2em 0">'
                + '<li style="line-height: 26px;font-size: 15px;">'
                + '<span style="width: 50px;display: inline-block;">地址：</span>' + clickPoint.address + '</li>'
                + '<li style="line-height: 26px;font-size: 15px;">'
                + '<span style="width: 50px;display: inline-block;">名称：</span>' + clickPoint.stationName + '</li>'
                + '</ul>';
              let infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
              marker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
            });
          }


        }, (err: any) => {

        })
    }
    else {
      this.showStation = false;
      this.btnOptionBank = '叠加';
      let overlays = this.map.getOverlays();
      for (let i = 0; i < overlays.length; i++) {
        if (overlays[i].V.getAttribute('class') == 'BMap_Marker BMap_noprint') {
          this.map.removeOverlay(overlays[i]);
        }
      }
    }
  }

  overlayXzl() {
    if (this.showXzl == false) {
      this.xzlPoints = [];
      this.netWorkHandler.getXzl(Config.baseurl + Config.lanLatData)
        .then((res: any) => {
          var data = res.data
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].area == 0) {
                data[i].area = 3600
              }
              var tmp = { lng: data[i].lng, lat: data[i].lat, count: data[i].area };
              this.xzlPoints.push(tmp);
            }
            this.showXzl = true;
            this.btnOptionXzl = '移除';
            if (this.showXq && this.xqPoints.length) {
              this.xzlPoints = this.xzlPoints.concat(this.xqPoints);
            }
            this.heatmapOverlay.setDataSet({ data: this.xzlPoints, max: 1250000 });
            this.showHeatmap();
          }
        }, (err: any) => {

        });
    }
    else {
      this.showXzl = false;
      this.btnOptionXzl = '叠加';
      this.hideHeatmap();
    }
  }

  overlayXq() {
    if (this.showXq == false) {
      this.xqPoints = [];
      this.netWorkHandler.getXq(Config.baseurl + Config.xqLnglat)
        .then((res: any) => {
          if (res.result == 'SUCCESS' && res.data.length) {
            this.showXq = true;
            this.btnOptionXq = '移除';
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].total_house == 0) {
                res.data[i].total_house = 100;
              }
              var tmp = { lng: res.data[i].lng, lat: res.data[i].lat, count: res.data[i].total_house * 100 };
              this.xqPoints.push(tmp);
            }
          }
          if (this.showXzl && this.xzlPoints.length) {
            this.xqPoints = this.xqPoints.concat(this.xzlPoints);
          }
          this.heatmapOverlay.setDataSet({ data: this.xqPoints, max: 1250000 });
          this.showHeatmap();
        }, (err: any) => {

        });
    }
    else if (this.showXq) {
      this.showXq = false;
      this.btnOptionXq = '叠加';
      this.hideHeatmap();
    }
  }
}

