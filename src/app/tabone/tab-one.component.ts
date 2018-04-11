import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../diff-class/hero';
import { HeroService } from "../diff-class/hero.service";
import { NetWorkHandler } from '../../providers/http-handler/network-handler';
import { ENPublicFunction } from '../../providers/en-public-function';
import { Config } from '../config';
import { MapOptions, Point, MarkerOptions, ControlAnchor, NavigationControlType, NavigationControlOptions, OverviewMapControlOptions, ScaleControlOptions, MapTypeControlOptions } from 'angular2-baidu-map';
import { ModalDirective} from 'ngx-bootstrap';
import { KylinHandler } from '../../providers/http-handler/kylin-handler';
import { SqlString } from '../../providers/sql-string';
@Component(
  {
    selector: 'tab-one',
    templateUrl: './tab-one.component.html',
    styleUrls: ['./tab-one.component.css']
  }
)

export class TabOneComponent {
  @ViewChild('bankNetmapContainer') container: ElementRef;
  map: any;
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  hero: Hero
  options: MapOptions;
  opts: MapOptions
  markers: Array<{ point: Point; options?: MarkerOptions; index?: number }> = []
  controlOpts: NavigationControlOptions
  overviewmapOpts: OverviewMapControlOptions
  scaleOpts: ScaleControlOptions
  mapTypeOpts: MapTypeControlOptions
  _markerData: Array<any> = []
  mapShow: boolean = false;
  diffRegionList: any = {};
  regionList: Array<any> = [];
  regionListShow: boolean = false;
  regionPicker: string;
  diffBankList: any = {};
  bankPicker: string;
  bankList: Array<any> = [];
  _height: any;

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  distModalShown: any;
  currentNode: any='暂无';
  ageRangePie: any;
  saveRangePie: any;
  rlTaskList: any;

  constructor(private heroService: HeroService, private router: Router,private kylinHandler: KylinHandler, public sqlString: SqlString,
   private netWorkHandler: NetWorkHandler,public eNPublicFunction:ENPublicFunction) {
    this._height = window.innerHeight - 135 + 'px'
  }

  ngAfterViewInit(): void {

    this.map = new BMap.Map(this.container.nativeElement);
    var point = new BMap.Point(114.055948, 22.603858);
    this.map.centerAndZoom(point, 12);             // 初始化地图，设置中心点坐标和地图级别
    this.map.enableScrollWheelZoom(); // 允许滚轮缩放
    this.map.addControl(new BMap.NavigationControl());
    this.map.addControl(new BMap.MapTypeControl())
    this.map.addControl(new BMap.ScaleControl('BMAP_ANCHOR_BOTTOM_RIGHT'))

    this.netWorkHandler.getNetWorkList(Config.baseurl + Config.bankdataJson).then((res: any) => {
      this._markerData = res.RECORDS
      console.log(res.RECORDS);
      this.setAllMarker(this._markerData, true, '全部', '全部')
      this.regionPicker = "全部"
      this.bankPicker = "全部"

    }, (err) => {

    })

  }

  hideModal(): void {
    this.autoShownModal.hide();
  }
 
  onHidden(): void {
    this.distModalShown = false;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  // ngAfterViewInit(): void {
  //     this._height=window.innerHeight-125 +'px'
  //   this.getHeroes();

  //    this.opts = {
  //     centerAndZoom: {
  //       lat: 22.603858,
  //       lng: 114.055948,
  //       zoom: 12
  //     },
  //     enableKeyboard: true,
  //     enableScrollWheelZoom:true
  //   }
  //   this.mapShow = true

  //   this.netWorkHandler.getNetWorkList(Config.baseurl+Config.bankdataJson).then((res: any) => {
  //       this._markerData = res.RECORDS
  //       this.setAllMarker(this._markerData, true, '全部', '全部')
  //       this.regionPicker = "全部"
  //       this.bankPicker = "全部"

  //   }, (err) => {

  //   })

  // }

  setAllMarker(markerData: Array<any>, initRBList: boolean, pickRegion: string, pickBank: string) {
    this.markers = []
    this.regionPicker = pickRegion;
    this.bankPicker = pickBank;
    let temArrays: Array<any> = []
    if (initRBList) {
      this.regionList = []
      this.bankList = []

    }
    for (let i = 0; i < markerData.length; i++) {
      let temObj = {
        point: {
          lat: markerData[i].latitude,
          lng: markerData[i].longitude
        },
        index: i
      }
      if (initRBList) {
        if (!this.inArray(markerData[i].region, this.regionList)) {
          this.regionList.push(markerData[i].region)
        }
        if (!this.inArray(markerData[i].bankName, this.bankList)) {
          this.bankList.push(markerData[i].bankName)
        }

      }

      switch (pickRegion) {
        case "全部":
          switch (pickBank) {
            case "全部":
              temArrays.push(temObj)
              break;
            default:

              if (markerData[i].bankName == pickBank) {
                temArrays.push(temObj)
              }
              break;

          }
          break;
        default:

          switch (pickBank) {
            case "全部":

              if (markerData[i].region == pickRegion) {
                temArrays.push(temObj)


              }

              break;

            default:

              if (markerData[i].region == pickRegion && markerData[i].bankName == pickBank) {
                temArrays.push(temObj)
              }
              break;

          }


          break;
      }

    }
    this.regionListShow = true;
    this.initBaiduMap(temArrays)
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.hero = hero
  }
  initBaiduMap(temArrays: Array<any>) {
    let overlays = this.map.getOverlays();
    for (let i = 0; i < overlays.length; i++) {
      this.map.removeOverlay(overlays[i]);
    }
    // this.opts = {
    //   centerAndZoom: {
    //     lat: 22.603858,
    //     lng: 114.055948,
    //     zoom: 12
    //   },
    //   enableKeyboard: true,
    //   enableScrollWheelZoom:true
    // }
    // this.mapShow = true
    let that = this;



    for (let i = 0; i < temArrays.length; i++) {
      let point = new BMap.Point(temArrays[i].point.lng, temArrays[i].point.lat);
      let marker = new BMap.Marker(point);
      this.map.addOverlay(marker);
      marker.addEventListener("click", function () {
        that.currentNode = that._markerData[temArrays[i].index];
        that.getAgeRange(that.currentNode.stationName);
        that.getSaveRange(that.currentNode.stationName);
        that.getRelativeTask(that.currentNode.stationName);
        // let sContent =
        //   '<ul style="margin:0 0 5px 0;padding:0.2em 0">'
        //   + '<li style="line-height: 26px;font-size: 15px;">'
        //   + '<span style="width: 50px;display: inline-block;">地址：</span>' + that._markerData[temArrays[i].index].address + '</li>'
        //   + '<li style="line-height: 26px;font-size: 15px;">'
        //   + '<span style="width: 50px;display: inline-block;">名称：</span>' + that._markerData[temArrays[i].index].netNode + '</li>'
        //   + '</ul>';
        // let infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
        // marker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
        that.distModalShown = true;
      });
    }
    // this.markers = temArrays;

    // this.controlOpts = {
    //   anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,
    //   type: NavigationControlType.BMAP_NAVIGATION_CONTROL_SMALL
    // }

    // this.overviewmapOpts = {
    //   anchor: 3,
    //   isOpen: true
    // }

    // this.scaleOpts = {
    //   anchor: 2
    // }

    // this.mapTypeOpts = {
    //   type: 1
    // }

  }

  diffRegionMarket(region: string) {
    this.regionPicker = region
    if (region == "全部") {
      if (this.inArray("全部", this.regionList)) {
        this.regionList.splice(this.regionList.length - 1)
      }
    } else {
      if (!this.inArray("全部", this.regionList)) {
        this.regionList.push("全部")
      }
    }

    this.setAllMarker(this._markerData, false, this.regionPicker, this.bankPicker)


  }

  diffBankMarket(bank: string) {
    this.bankPicker = bank
    if (bank == "全部") {
      if (this.inArray("全部", this.bankList)) {
        this.bankList.splice(this.bankList.length - 1)
      }
    } else {
      if (!this.inArray("全部", this.bankList)) {
        this.bankList.push("全部")
      }
    }

    this.setAllMarker(this._markerData, false, this.regionPicker, this.bankPicker)


  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  public showWindow({ e, marker, map }: any, index: number): void {
    map.openInfoWindow(
      new window.BMap.InfoWindow('地址:' + this._markerData[index].address, {
        offset: new window.BMap.Size(0, -30),
        title: this._markerData[index].netNode
      }),
      marker.getPosition()
    )
  }

  inArray(key: string, jArray: Array<any>) {
    for (let i = 0; i < jArray.length; i++) {
      if (jArray[i] == key) {
        return true
      }
    }

    return false

  }

  getAgeRange(name: any) {
    this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.ageRangeSql(name), Config.kylinProject)
    .then((res: any) => {
      console.log(res);
      if(res.results) {
        this.ageRangePie = {res:res.results,title:"客户年龄分布"};
      }
    }, (err: any) => {

    })
  }

  getSaveRange(name) {
    this.kylinHandler.postQueryBankname(Config.kylinBaseurl + Config.query, this.sqlString.saveRangeSql(name), Config.kylinProject)
    .then((res: any) => {
      console.log(res);
      if(res.results) {
        this.saveRangePie = {res:res.results,title:"月缴存额分布"};
      }
    }, (err: any) => {

    })
  }

  getRelativeTask(name) {
    this.netWorkHandler.relativeTask(Config.baseurl + Config.scoreNode,name)
    .then((res: any) => {
      if(res.ret==200 && res.task.length) {
        this.rlTaskList = res.task;
        console.log(this.rlTaskList);
      }
    },(err: any) => {

    })
  }

}
// 


/**
 * Created by ZC on 2017/11/6.
 * Modified by YF on 2018/1/8
 */
