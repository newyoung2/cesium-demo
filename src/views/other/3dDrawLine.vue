<template>
    <div id="cesiumContainer">
      <div class="tool-box">
        <el-button type="primary" size="mini" @click.stop="reset" >重置</el-button>
        <!-- 量算 -->
        <el-select clearable  v-model="liangsuanValue" placeholder="量算" size="small" style="width:120px;" class="select-custom" @change="liangsuanChange">
            <el-option v-for="item in liangsuanList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
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
  
  
    var ldCollection
    export default {
      name: "load3DTiles",
      props: {},
      data() {
        return {
            liangsuanValue: '',
            liangsuanList: [{ label: '测距', value: 'width' }, { label: '测高', value: 'height' }],
            clIdArr: [],
            clStart: false,
            clMode: '',  //量算模式  测距 测高
            floatPoint1: null,
            floatPoint2: null,
            floatPoint3: null,
            linePointsId:[]
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


        // 重置量算状态
        resetCL(){
            let self = this;
            self.floatPoint1 = null;
            self.floatPoint2 = null;
            self.floatPoint3 = null;
            self.clMode = '';
            self.clStart = false;
        },
        liangsuanChange(val) {
            let self = this;
            for (let id of self.linePointsId) {
                viewer.entities.removeById(id);
            }
            self.linePointsId = [];

            self.resetCL();
            if(val){
                self.clDistance('polyline', val);
            }else{
                // val为空的时候  清空所有量算的实体
                for (let id of self.clIdArr) {
                    viewer.entities.removeById(id);
                }
            }
           
        },
        clDistance(drawMode, clMode) {
            let self = this;
            self.clMode = clMode;
            self.clStart = true;
            handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            // 鼠标左击事件
            handler.setInputAction(function (e) {
                //此获取包含地形坐标的高度
                var positions = viewer.scene.pickPosition(e.position);
                if (!self.floatPoint1 && !self.floatPoint2 && !self.floatPoint3 && self.clStart && self.clMode) {
                    /* floatPoint1，floatPoint2，floatPoint3 为空时候，给三个点初始化，值都是同一个坐标（即同一个位置） */
                    self.floatPoint1 = positions;
                    self.floatPoint2 = positions;
                    self.floatPoint3 = positions;
                    self.clAddPoint(); //生成点
                    self.clAddLabel(); //生成文本

                    var dynamicPositions = new Cesium.CallbackProperty(function () {   //cesium的CallbackProperty属性  让生成的图形和实体能跟随数据的变化而变化  同vue一样数据驱动视图
                        return [self.floatPoint1, self.floatPoint2, self.floatPoint3, self.floatPoint1];
                    }, false);
                    let linePoint1 = viewer.entities.add({   //生成折线
                        name: "polyline_point",
                        description: "红线图的点",
                        polyline: {
                            positions: dynamicPositions,
                            material: new Cesium.PolylineOutlineMaterialProperty({
                                color: Cesium.Color.YELLOW,
                                outlineWidth: 4,
                                outlineColor: Cesium.Color.YELLOW,
                            }),
                            width: 4,
                        }
                    });
                    self.linePointsId.push(linePoint1.id);
                } else {
                    // 量算好后，再次点击左键，停止量算，生成结果，生成点实体便不会随鼠标继续移动
                    self.clStart = false;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            
            // 鼠标左键双击事件  
            handler.setInputAction(function (e) {
                 //停止量算生成量算结果后   如果想对当前量算结果修改  双击鼠标继续量算
                   if(!self.clStart){
                    self.clStart = true;
                   }
            }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            
            // 鼠标移动事件
            handler.setInputAction(function (e) {
                if (self.floatPoint1 && self.floatPoint2 && self.floatPoint3 && self.clStart && self.clMode) {
                    var mousemovecartesian = viewer.scene.pickPosition(e.endPosition);
                    let mousemovecartesianlat = self.carToLat(mousemovecartesian);
                    let temp1 = self.carToLat(self.floatPoint1);
                     let otherPoint = [];

                        /* 测距和测高的计算原理相似   差别在于以下判断   对于第三个点的赋值处理不同 */
                        if (self.clMode == 'width') {    /* 鼠标移动过程中  将鼠标位置数据赋给第2个点  将鼠标位置数据的经纬度赋值给第三个点将第一个点的高度赋值给第三个点  三个点便形成一个直角三角形   */
                            otherPoint = [mousemovecartesianlat[0], mousemovecartesianlat[1], temp1[2]];
                        }else if (self.clMode == 'height'){  /* 鼠标移动过程中 将鼠标所在位置数据赋值给第二个点   将第一个点的经纬度赋值给第三个点  将鼠标所在位置的高度赋值给第三个点的高度*/
                            otherPoint = [temp1[0], temp1[1], mousemovecartesianlat[2]];
                        }

                        self.floatPoint2 = mousemovecartesian;
                        self.floatPoint3 = (new Cesium.Cartesian3.fromDegreesArrayHeights(otherPoint))[0];

                }

            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            
            // 鼠标右击事件
            handler.setInputAction(function (e) {
                self.createOneCLEntity(self.floatPoint1,self.floatPoint2,self.floatPoint3);
                for (let id of self.linePointsId) {
                    viewer.entities.removeById(id);
                }
                
                self.floatPoint1 = null;
                self.floatPoint2 = null;
                self.floatPoint3 = null;
                self.linePointsId = [];
                self.clStart = true;
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        },
        // 笛卡尔坐标系转换为经纬度坐标系
        carToLat(cartesian) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitude = Cesium.Math.toDegrees(cartographic.longitude);
            let latitude = Cesium.Math.toDegrees(cartographic.latitude);
            let height = cartographic.height;

            return [longitude, latitude, height];
        },
        // 
        clAddPoint() {
            let self = this;
            var dynamicPositions1 = new Cesium.CallbackProperty(function () {
                return self.floatPoint1;
            }, false);

            var dynamicPositions2 = new Cesium.CallbackProperty(function () {
                return self.floatPoint2;
            }, false);

            var dynamicPositions3 = new Cesium.CallbackProperty(function () {
                return self.floatPoint3;
            }, false);


            let linePoint1 = viewer.entities.add({
                position: dynamicPositions1,
                name: "polyline_point",
                description: "红线图的点",
                point: {
                    pixelSize: 10,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                }
            });

            let linePoint2 = viewer.entities.add({
                position: dynamicPositions2,
                name: "polyline_point",
                description: "红线图的点",
                point: {
                    pixelSize: 10,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                }
            });

            let linePoint3 = viewer.entities.add({
                position: dynamicPositions3,
                name: "polyline_point",
                description: "红线图的点",
                point: {
                    pixelSize: 10,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                },
            });

            self.linePointsId.push(linePoint1.id);
            self.linePointsId.push(linePoint2.id);
            self.linePointsId.push(linePoint3.id);

        },
        clAddLabel() {
            let self = this;
            var dynamicPositions1 = new Cesium.CallbackProperty(function () {
                return self.computedLabelPosition(self.floatPoint1, self.floatPoint2);
            }, false);

            var dynamicPositions2 = new Cesium.CallbackProperty(function () {
                return self.computedLabelPosition(self.floatPoint2, self.floatPoint3);
            }, false);

            var dynamicPositions3 = new Cesium.CallbackProperty(function () {
                return self.computedLabelPosition(self.floatPoint3, self.floatPoint1);
            }, false);

            let linePoint1 = viewer.entities.add({
                position: dynamicPositions1,
                name: "polyline_point",
                description: "红线图的点",
                label: {
                    // This callback updates the length to print each frame.
                    text: new Cesium.CallbackProperty(function () {
                        let str = '';
                        str = `${Cesium.Cartesian3.distance(self.floatPoint1, self.floatPoint2).toFixed(2)}m`;
                        return str;
                    }, false),
                    fillColor: Cesium.Color.BLUE,
                    showBackground: true,
                    backgroundColor: Cesium.Color.WHITE.withAlpha(0.6),
                    font: "16px sans-serif",
                    pixelOffset: new Cesium.Cartesian2(0.0, 20),
                },
            });

            let linePoint2 = viewer.entities.add({
                position: dynamicPositions2,
                name: "polyline_point",
                description: "红线图的点",
                label: {
                    // This callback updates the length to print each frame.
                    text: new Cesium.CallbackProperty(function () {
                        let str = '';
                        str = `${Cesium.Cartesian3.distance(self.floatPoint2, self.floatPoint3).toFixed(2)}m`;
                        return str;
                    }, false),
                    fillColor: Cesium.Color.BLUE,
                    showBackground: true,
                    backgroundColor: Cesium.Color.WHITE.withAlpha(0.6),
                    font: "16px sans-serif",
                    pixelOffset: new Cesium.Cartesian2(0.0, 20),
                },
            });

            let linePoint3 = viewer.entities.add({
                position: dynamicPositions3,
                name: "polyline_point",
                description: "红线图的点",
                label: {
                    // This callback updates the length to print each frame.
                    text: new Cesium.CallbackProperty(function () {
                        let str = '';
                        str = `${Cesium.Cartesian3.distance(self.floatPoint3, self.floatPoint1).toFixed(2)}m`;
                        return str;
                    }, false),
                    fillColor: Cesium.Color.BLUE,
                    showBackground: true,
                    backgroundColor: Cesium.Color.WHITE.withAlpha(0.6),
                    font: "16px sans-serif",
                    pixelOffset: new Cesium.Cartesian2(0.0, 20),
                },
            });

            self.linePointsId.push(linePoint1.id);
            self.linePointsId.push(linePoint2.id);
            self.linePointsId.push(linePoint3.id);
        },
        // 计算label的位置
        computedLabelPosition(position1, position2) {
            let degrees1 = this.carToLat(position1);
            let degrees2 = this.carToLat(position2);

            var point1 = turf.point([degrees1[0], degrees1[1]]);
            var point2 = turf.point([degrees2[0], degrees2[1]]);
            var midpoint = turf.midpoint(point1, point2);
            
            let total = degrees1[2] + degrees2[2]
            let height = height = (Math.abs(degrees1[2] + degrees2[2])) / 2;
            if(total < 0){
                height = height*(-1)
            }
            let res = (new Cesium.Cartesian3.fromDegreesArrayHeights([midpoint.geometry.coordinates[0], midpoint.geometry.coordinates[1], height]))[0];
            return res;
        },
        createOneCLEntity(point1,point2,point3){
            let self = this;
             let p1  = point1;
             let p2  = point2;
             let p3  = point3;
             let arr = [p1,p2,p3];
             let arr1 = [[p1,p2],[p2,p3],[p3,p1]];
             let arr2 = [p1,p2,p3,p1];

             let entity3 = viewer.entities.add({
                name: "polyline_point",
                description: "红线图的点",
                polyline: {
                    positions: arr2,
                    material: new Cesium.PolylineOutlineMaterialProperty({
                        color: Cesium.Color.YELLOW,
                        outlineWidth: 4,
                        outlineColor: Cesium.Color.YELLOW,
                    }),
                    width: 4,
                }
            });
            self.clIdArr.push(entity3.id);
            
             arr.map((e,i)=>{
               let entity1 = viewer.entities.add({
                    position: e,
                    name: "polyline_point",
                    description: "红线图的点",
                    point: {
                        pixelSize: 10,
                        color: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 2,
                    }
                });

               let entity2 = viewer.entities.add({
                    position: self.computedLabelPosition(...arr1[i]),
                    name: "polyline_point",
                    description: "红线图的点",
                    label: {
                        // This callback updates the length to print each frame.
                        text: `${Cesium.Cartesian3.distance(...arr1[i]).toFixed(2)}m`,
                        fillColor: Cesium.Color.BLUE,
                        showBackground: true,
                        backgroundColor: Cesium.Color.WHITE.withAlpha(0.6),
                        font: "16px sans-serif",
                        pixelOffset: new Cesium.Cartesian2(0.0, 20),
                    }
                });

                self.clIdArr.push(entity1.id);
                self.clIdArr.push(entity2.id);
             });


        },
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