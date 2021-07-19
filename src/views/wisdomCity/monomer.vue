<template>
    <div id="cesiumContainer">
      <div class="tool-box">
        <!-- <el-button type="primary" size="mini" @click.stop="reset" >重置</el-button> -->
        <el-button type="primary" size="mini" @click.stop="startDraw">画点</el-button>
        <!-- <el-input-number size="mini" v-model="sharpness" :step="0.2"  :min="0" :max="10" label="描述文字"></el-input-number>
        <el-button type="primary" size="mini" @click.stop="reDrawArea">重绘</el-button> -->
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
          curObj:{
                primitive:null,
                id:null
              },
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
          let resource = new Cesium.Resource({
            url: "test/Scene/Production_6.json"
          })
          console.log(resource)
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
            
            var pick = viewer.scene.pick(movement.position);
            console.log(pick)
            if (that.isDrawPoint) {
              that.degreeArr.push([longitude,latitude])
              that.degreeHeight = height
              that.pointArr.push(cartesian)
              that.drawPoint(cartesian,[longitude,latitude],height)
            }else if (pick && pick.id && pick.id.startsWith('default')) { 
              that.curObj = {
                primitive:pick.primitive,
                id:pick.id
              }
              that.showPrimitive(pick.primitive,pick.id)
            }else{
              that.hidePrimitive(that.curObj.primitive,that.curObj.id)
            }
           
  
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
              that.curObj = that.addMonomer(that.pointArr)
              that.isDrawPoint = false
              that.reset()
            }
  
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        },
         // 隐藏单体化
         hidePrimitive(entity,id) {
           if(!entity || !id){
               return
           }
          let attribute;
                attribute = entity.getGeometryInstanceAttributes(id);
                attribute.color = [85, 185, 213, 0];
                attribute.show = [1];  //[1]显示  [0]隐藏
            },
            // 显示单体化
        showPrimitive(entity,id) {
                
                let attribute;
                attribute = entity.getGeometryInstanceAttributes(id);
                attribute.color = [85, 185, 213, 128];
                attribute.show = [1];  //[1]显示  [0]隐藏

            },
        addMonomer(param){
          viewer.entities.removeAll()
          let id = 'default' + new Date().getTime();

            // 单体化
            viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
                geometryInstances: new Cesium.GeometryInstance({
                    geometry: new Cesium.PolygonGeometry({
                        polygonHierarchy: new Cesium.PolygonHierarchy(
                          param// Cesium.Cartesian3.fromDegreesArray(arr)
                        ),
                        extrudedHeight: 10000,//e.height
                        height: -100,
                        //vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
                    }),
                    attributes: {//顶点着色器属性
                        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('#55B9E7').withAlpha(0.5)),
                        show: new Cesium.ShowGeometryInstanceAttribute(true), //确定是否显示几何实例
                    },
                    id,

                }),
                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE, //是否影响地形

            }));

            let primitivesColection = viewer.scene.primitives;
            return {
              primitive:primitivesColection.get(primitivesColection.length - 1),
              id
            };
        },
        // 画点
        drawPoint(cartesian,degree,height) {
          
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
        reset() {
          viewer.entities.removeAll()
          this.pointArr = []
          this.degreeArr = []
          this.degreeHeight = ''
          this.geojson = []
          // this.addLdPrimitive()
          this.isDrawPoint = false
          this.agreeViewMove()
          // localStorage.removeItem('geojson')
        },
        agreeViewMove(){
          viewer.scene.screenSpaceCameraController.enableRotate = true //禁止相机旋转
          viewer.scene.screenSpaceCameraController.enableTranslate = true;  //禁止地图平移
          // viewer.screenSpaceCameraController.enableZoom = false;  //禁止地图缩放
          viewer.scene.screenSpaceCameraController.enableTilt = true;  //禁止相机倾斜
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