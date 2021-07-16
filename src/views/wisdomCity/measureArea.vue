<template>
    <div id="cesiumContainer">
      <div class="tool-box">
        <el-button type="primary" size="mini" @click.stop="reset" >重置</el-button>
        <el-button type="primary" size="mini" @click.stop="startDraw">画点</el-button>
        <el-input-number size="mini" v-model="sharpness" :step="0.2"  :min="0" :max="10" label="描述文字"></el-input-number>
        <el-button type="primary" size="mini" @click.stop="reDrawArea">重绘</el-button>
      </div>
      
      </div>
  </template>
  
  <script>
    import * as Cesium from "cesium/Cesium";
    import * as turf from '@turf/turf'
    import widget from "cesium/Widgets/widgets.css";
    // import util from '../../util/cesiumUtil'
    var viewer = null;
    let scene
    var tileset = null;
    var handler = null
    let res
  
    let selected
    let primitive
    let attribute
    let color
    let r
  
    var ldCollection
    export default {
      name: "load3DTiles",
      props: {},
      data() {
        return {
          sharpness:0.85,
          tileset: null,
          pointArr: [],
          degreeArr:[],
          degreeHeight:[],
          isDrawPoint: false,
          geojson: [],
        };
      },
      computed: {},
      watch: {},
      components: {},
      created() { },
      mounted() {
        this.init();
      },
      methods: {
        init() {
          let that = this
          /* 
             初始化
           */
          let viewerOption = {
            infoBox: false,
            selectionIndicator: false,
            geocoder: false, // 地理位置查询定位控件
            homeButton: false, // 默认相机位置控件
            timeline: false, // 时间滚动条控件
            navigationHelpButton: false, // 默认的相机控制提示控件
            fullscreenButton: false, // 全屏控件
            scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
            baseLayerPicker: false, // 底图切换控件
            animation: false, // 控制场景动画的播放速度控件
            // terrainProvider: gee,
            terrainProvider: new Cesium.CesiumTerrainProvider({
              url: Cesium.IonResource.fromAssetId(3956),
            }),
          };
          
          viewer = new Cesium.Viewer("cesiumContainer", viewerOption);
          viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
          viewer.scene.globe.depthTestAgainstTerrain = true;
          scene = viewer.scene
  
          // 加载3dtiles模型
          that.load3DTileModel()
          // that.scanLine()
          //添加鼠标左击事件 
          that.addLeftClickEvent()
  
        },
        startDraw(){
          this.isDrawPoint = true
          viewer.scene.screenSpaceCameraController.enableRotate = false //禁止相机旋转
          viewer.scene.screenSpaceCameraController.enableTranslate = false;  //禁止地图平移
          // viewer.screenSpaceCameraController.enableZoom = false;  //禁止地图缩放
          viewer.scene.screenSpaceCameraController.enableTilt = false;  //禁止相机倾斜
        },
        // 加载3dtiles模型
        load3DTileModel() {
          // let resource = new Cesium.Resource({
          //   url: "test/Scene/Production_6.json"
          // })
          // console.log(resource)
          tileset = new Cesium.Cesium3DTileset({
            url: "3dtiles20210610/tileset.json",
            maximumScreenSpaceError: 4,
            maximumNumberOfLoadedTiles: 1000,
          });
  
          viewer.scene.primitives.add(tileset);
          tileset.readyPromise.then(function (tileset) {
  
            var boundingSphere = tileset.boundingSphere;
            var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
            var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
            var offset = Cesium.Cartesian3.fromRadians(Cesium.Math.toRadians(106.709183), Cesium.Math.toRadians(26.562819), -32.0);
            var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
            viewer.zoomTo(tileset); //视角移动至模型位置
          });
        },
        addLeftClickEvent() {
          let that = this
          handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  
          handler.setInputAction(function (movement) {
            var cartesian = viewer.scene.pickPosition(movement.position);
            /* 将笛卡尔坐标转换为经纬度坐标 */
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitude = Cesium.Math.toDegrees(cartographic.longitude);
            let latitude = Cesium.Math.toDegrees(cartographic.latitude);
            let height = cartographic.height;
            // console.log(longitude, latitude, height)
            if (that.isDrawPoint) {
              that.drawPoint(cartesian,[longitude,latitude],height)
            }
  
            // that.cameraFly(movement)
  
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  
          handler.setInputAction(function (movement) {
            var cartesian = viewer.scene.pickPosition(movement.position);
            /* 将笛卡尔坐标转换为经纬度坐标 */
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitude = Cesium.Math.toDegrees(cartographic.longitude);
            let latitude = Cesium.Math.toDegrees(cartographic.latitude);
            let height = cartographic.height;
            // console.log(longitude, latitude, height)
  
            // that.cameraFly(movement)
            if (that.isDrawPoint) {
              that.drawPolygon(cartesian)
            }
  
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        },
        // 画点
        drawPoint(cartesian,degree,height) {
          this.degreeArr.push(degree)
          this.degreeHeight = height
          this.pointArr.push(cartesian)
          let point = viewer.entities.add({
            position: cartesian,
            point: {
              pixelSize: 10,
              color: Cesium.Color.BLUE,
              outlineWidth: 2,
              outlineColor: Cesium.Color.WHITE,
            }
          });
  
          return point
        },
        // 计算面积
        computedArea(data){
          let areaArr = JSON.parse(JSON.stringify(data))
            areaArr.push(areaArr[0])  //最后一个点和第一个点必须一样形成闭合区域才能计算面积
            var polygon = turf.polygon([areaArr]);
            var area = turf.area(polygon);
            return area
        },
        reDrawArea(){
          viewer.entities.removeAll()
          this.drawPolygon()
        },
        drawPolygon() {
          /* 数据处理  通过插值计算算出更多点 */
          var line = turf.lineString(this.degreeArr);
          console.log(this.sharpness)
          var curved = turf.bezierSpline(line,{sharpness:this.sharpness});  //插值计算  sharpness属性控制弧度
          var positions = [];
            curved.geometry.coordinates.map(e=>{
              positions.push(e[0])
              positions.push(e[1])
              positions.push(this.degreeHeight)
            })
  
            let areaNum = this.computedArea(curved.geometry.coordinates)  //计算面积
            
          
  
          let gon = viewer.entities.add({
            position: this.pointArr[0],
            label: {
              text:  `${areaNum.toFixed(2)}㎡`,
              font: '14pt monospace',
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -9)
            },
            polygon: {
              hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
              material: Cesium.Color.MEDIUMAQUAMARINE.withAlpha(0.5),
              perPositionHeight: true,
            },
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
              width: 2.5,
              show: true,
              material: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.TOMATO.withAlpha(0.8),
                outlineWidth: 1,
                outlineColor: Cesium.Color.TOMATO.withAlpha(0.8),
              }),
            },
          });
          return gon
        },
        reset() {
          viewer.entities.removeAll()
          this.pointArr = []
          this.degreeArr = []
          this.degreeHeight = ''
          this.geojson = []
          // this.addLdPrimitive()
          this.isDrawPoint = false
          viewer.scene.screenSpaceCameraController.enableRotate = true //禁止相机旋转
          viewer.scene.screenSpaceCameraController.enableTranslate = true;  //禁止地图平移
          // viewer.screenSpaceCameraController.enableZoom = false;  //禁止地图缩放
          viewer.scene.screenSpaceCameraController.enableTilt = true;  //禁止相机倾斜
          // localStorage.removeItem('geojson')
        },
        //绘制栋标签
        drawBillboard(posiPoint, stored) {
          posiPoint.z = posiPoint.z + 50
          let point = viewer.entities.add({
            name: 'Citizens Bank Park',
            position: posiPoint,
            point: {
              pixelSize: 5,
              color: Cesium.Color.RED,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2
            },
            label: {
              text: 'Citizens Bank Park',
              font: '14pt monospace',
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -9)
            }
          });
          return point;
        }
      },
    };
  </script>
  
  <style scoped>
    #cesiumContainer {
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    .tool-box{
      display: flex;
      width: 25vw;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      z-index: 1000;
      right: 0;
      top: 0;
      padding: 10px 20px;
    }
  </style>