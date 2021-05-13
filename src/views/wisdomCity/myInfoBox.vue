<template>
    <div id="cesiumContainer">
        <div id="cesiumContainer1"></div>
        
        <template  v-for="(item,index) in ponitArr">
          <div class="infoBox" v-show="item.show" @click="item.show = false"  :key="index" ref="infoBox">
            <span>经纬度({{item.lat}},{{item.lon}})</span>
         </div>
        </template>
        
    </div>
  </template>
  
  <script>
  import * as Cesium from "cesium/Cesium";
  import widget from "cesium/Widgets/widgets.css";
  var viewer = null;
  var handler = null
  var res
  export default {
    props: {},
    data() {
      return {
          lat:'',
          lon:'',
          showInfoBox:false,
          currentPoint:null,
          ponitArr:[]
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        viewer = new Cesium.Viewer("cesiumContainer1", {
          infoBox: false,
          selectionIndicator: false,
          geocoder: false, // 地理位置查询定位控件
          homeButton: false, // 默认相机位置控件
          timeline: false, // 时间滚动条控件
          navigationHelpButton: false, // 默认的相机控制提示控件
          fullscreenButton: false, // 全屏控件
          scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
          baseLayerPicker: true, // 底图切换控件
          animation: false, // 控制场景动画的播放速度控件
          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url:
              "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
          }),
        });
        viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
        
        this.initHandleEvent()
       
      },
      initHandleEvent(){
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);　　//定义事件
        handler.setInputAction((movement)=> {
            //1.椭球面坐标:获取当前点击视线与椭球面相交处的坐标，在加载地形的场景上获取的坐标有误差
            var cartesian = viewer.camera.pickEllipsoid(movement.position,viewer.scene.globe.ellipsoid);
 
            //2.场景坐标:获取场景中任意点击处的对应的世界坐标，需要开启“地形深度检测”（在未开启“地形深度检测”的情况下只能在3DTile上准确获取空间坐标，开启“地形深度检测”后，viewer.scene.pickPosition 也能在非3DTile上准确获取坐标）
            // viewer.scene.globe.depthTestAgainstTerrain = true;
            // var cartesian = viewer.scene.pickPosition(movement.position);
 
            //3.地标坐标：获取点击处地球表面的世界坐标，不包括模型、倾斜摄影表面
            // var ray = viewer.camera.getPickRay(movement.position);
            // var cartesian = viewer.scene.globe.pick(ray, viewer.scene);

          // 点击处生成原点
          let currentPoint = this.drawPoint(cartesian)

          /* 将笛卡尔坐标转换为经纬度坐标 */
          let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          let longitude = Cesium.Math.toDegrees(cartographic.longitude);
          let latitude = Cesium.Math.toDegrees(cartographic.latitude);
          let height = cartographic.height;

          this.ponitArr.push({
              entity:currentPoint,
              lat:latitude,
              lon:longitude,
              show:true
          })
           

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

        viewer.scene.postRender.addEventListener((e)=> {

            this.ponitArr.forEach((element,index)=>{
                var winpos = viewer.scene.cartesianToCanvasCoordinates(element.entity._position._value);
                    this.$refs.infoBox[index].style.left = winpos.x + 20 + "px";
                    this.$refs.infoBox[index].style.top = winpos.y - 50 + "px";
            })

            // if(this.currentPoint){
            //         var winpos = viewer.scene.cartesianToCanvasCoordinates(this.currentPoint._position._value);
            //         this.$refs.infoBox.style.left = winpos.x + 20 + "px";
            //         this.$refs.infoBox.style.top = winpos.y - 50 + "px";
            // }
            
            });
      },
      drawPoint(point) {
            var entity = viewer.entities.add({
                position: point,
                point: {
                    pixelSize: 10,
                    color: Cesium.Color.CHARTREUSE,
                    outlineWidth: 2,
                    outlineColor: Cesium.Color.WHITE,
                }
            });
            // console.log(entity)
            // viewer.zoomTo(entity)
            return entity;
        },
     
    },
  };
  </script>
  
  <style scoped>
  #cesiumContainer1,#cesiumContainer {
    position: relative;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .infoBox{
      position: absolute;
      z-index: 1000;
      /* width: 100px; */
      /* height: 100px; */
      border-radius: 5px;
      padding: 20px;
      background-color: rgba(0,0,0,0.5);
      color: white;
      display: inline-flex;
  }
  
  
  </style>
  