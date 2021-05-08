<template>
  <div id="cesiumContainer">
    <el-button type="primary" size="mini" @click.stop="reset" style="position:absolute;right:32vh;top:2vh;z-index:100;">
      重置</el-button>
    <el-button type="primary" size="mini" @click.stop="isDrawPoint = true"
      style="position:absolute;right:20vh;top:2vh;z-index:100;">画点</el-button>
    <el-button type="primary" size="mini" @click.stop="save" style="position:absolute;right:8vh;top:2vh;z-index:100;">保存
    </el-button>
  </div>
</template>

<script>
  import * as Cesium from "cesium/Cesium";
  import widget from "cesium/Widgets/widgets.css";
  // import util from '../../util/cesiumUtil'
  var viewer = null;
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
        tileset: null,
        pointArr: [],
        isDrawPoint: false,
        geojson: [],
        // [[106.70693454431124, 26.56350489256199,
        //   106.70733895973424, 26.563797835036805,
        //   106.70793344974257, 26.563190858371826,
        //   106.70754493537572, 26.562890445780457,
        //   106.7073807791186, 26.563058524769374,
        //   106.70755800515781, 26.56320249120003,
        //   106.7072900054751, 26.563474883470942,
        //   106.7071057767145, 26.56332725017312
        // ]]
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
        var geeMetadata = new GoogleEarthEnterpriseMetadata('http://www.earthenterprise.org/3d');
var gee = new Cesium.GoogleEarthEnterpriseTerrainProvider({
    metadata : geeMetadata
});
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
          imageryProvider:new Cesium.BingMapsImageryProvider({
             url : 'https://dev.virtualearth.net',
             key : 'AtQ0QJxTOCYmAUOKC8g3v-nZAAcxLy_2c6fiJDFDFW-mdIS1iOIhfwSqs1G_I7IV'
          })
        };

        //使用ion数据   需要先申请token
        // Cesium.Ion.defaultAccessToken =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY";
        
          viewer = new Cesium.Viewer("cesiumContainer", viewerOption);
        viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权

//       let item = viewer.entities.add({
//      name: 'PolylineTrail',
//       polygon: {
//           hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
//               50, 30, 250000,
//               60 , 30, 250000,
//               60 , 32, 250000,
//               50, 32, 250000,
//           ]),
//           width: 15,
//           material: new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.WHITE, 3000,1)
//       }
//  });

//  viewer.zoomTo(item);

        // 添加primitive
        // ldCollection = new Cesium.PrimitiveCollection();
        // if(that.geojson && that.geojson.length > 0){
        //   that.addLdPrimitive()
        // }

        // 加载3dtiles模型
        that.load3DTileModel() 
        that.scanLine()
        //添加鼠标左击事件 
        that.addLeftClickEvent()
        //添加鼠标左击事件 
        // that.addRightClickEvent()
       
      },
      // 加载3dtiles模型
      load3DTileModel(){
        tileset = new Cesium.Cesium3DTileset({
          url: "test/Scene/Production_6.json",
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
      // 加载楼栋Primitive
      addLdPrimitive() {
        ldCollection.removeAll();
        // 
        this.geojson.forEach(e => {
          ldCollection.add(new Cesium.ClassificationPrimitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(
                  Cesium.Cartesian3.fromDegreesArray(e.arr)
                ),
                extrudedHeight: 100,//e.height
                height:-100,
                //vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
              }),
              attributes: {//顶点着色器属性
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 1, 1, 1e-4)),
                show: new Cesium.ShowGeometryInstanceAttribute(true), //确定是否显示几何实例
              },
              id: e.id
            }),
            classificationType: Cesium.ClassificationType.BOTH //是否影响地形
          }));
        })

        viewer.scene.primitives.add(ldCollection);
      },
      addLeftClickEvent(){
        let that = this
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
       
        handler.setInputAction(function (movement) {
          var cartesian = viewer.scene.pickPosition(movement.position);
            /* 将笛卡尔坐标转换为经纬度坐标 */
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitude = Cesium.Math.toDegrees(cartographic.longitude);
            let latitude = Cesium.Math.toDegrees(cartographic.latitude);
            let height = cartographic.height;
              console.log(longitude,latitude,height)
            
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      },
      scanLine(){
        var cartesian1 = Cesium.Cartesian3.fromDegrees(106.70707216579464,26.56379390155953);
        var cartesian2 = Cesium.Cartesian3.fromDegrees(106.7079252734644,26.562935758126347);

  var count = 300;
  var cartesians = new Array(count);
  for (var i = 0; i < count; ++i) {
    var offset = i / (count - 1);
    cartesians[i] = Cesium.Cartesian3.lerp(
      cartesian1,
      cartesian2,
      offset,
      new Cesium.Cartesian3()
    );
  }
  // console.log(cartesians)
        let position = [106.70687752201412,26.563720844320446,
        106.70705799645077,26.563905853809782,
        106.70788118373893,26.562992300929444,
        106.70771926639411,26.562893255731105]
        
        // viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
        //         geometryInstances: new Cesium.GeometryInstance({
        //             geometry: new Cesium.PolygonGeometry({
        //                 polygonHierarchy: new Cesium.PolygonHierarchy(
        //                   Cesium.Cartesian3.fromDegreesArray(position)
        //                 ),
        //                 extrudedHeight: 10000,//e.height
        //                 height: -100,
        //                 //vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
        //             }),
        //             attributes: {//顶点着色器属性
        //                 color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('#55B9E7').withAlpha(0.5)),
        //                 show: new Cesium.ShowGeometryInstanceAttribute(true), //确定是否显示几何实例
        //             },
        //             id:'555',

        //         }),
        //         classificationType: Cesium.ClassificationType.CESIUM_3D_TILE, //是否影响地形

        //     }))

            var primitive = new Cesium.GroundPrimitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.PolygonGeometry({
                        polygonHierarchy: new Cesium.PolygonHierarchy(
                          Cesium.Cartesian3.fromDegreesArray(position)
                        ),
                        extrudedHeight: 10000,//e.height
                        height: -100,
                        //vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
                    })
            }),
            appearance: new Cesium.EllipsoidSurfaceAppearance({
                aboveGround: true
            }),
            classificationType : Cesium.ClassificationType.BOTH,	// 支持类型： 地形、3DTile、或者在地面上
            show: true
        });
        viewer.scene.primitives.add(primitive)

        console.log(viewer.scene.primitives)
      },
      // 画点
      drawPoint(cartographic, cartesian) {
        this.pointArr.push(cartographic)
        console.log(cartesian)
        viewer.entities.add({
          name: 'hahaha',
          position: cartesian,
          point: {
            pixelSize: 5,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2
          }
        });
      },
      save() {
        this.isDrawPoint = false
        let arr = []
        this.pointArr.forEach(e=>{
          arr.push(e.longitude)
          arr.push(e.latitude)
        })
        let param = {
          id: new Date().getTime() + '',
          height: this.pointArr[0].height,
          list: this.pointArr,
          arr: arr
        }

        // let arr = JSON.parse(localStorage.getItem('geojson'))?
        this.geojson.push(param)
        // localStorage.setItem('geojson', JSON.stringify(this.geojson))
        this.pointArr = []
        viewer.entities.removeAll();
        
        console.log(this.geojson)
        
        this.addLdPrimitive()
      },
      reset() {
        
        viewer.entities.removeAll();
        this.pointArr = []
        this.geojson = []
        this.addLdPrimitive()
        this.isDrawPoint = false
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
      },
      // 旋转模型角度
      changeRotate() {
        let m = tileset.modelMatrix;
        //RotateX为旋转角度，转为弧度再参与运算
        let m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(1));
        //矩阵计算
        Cesium.Matrix4.multiplyByMatrix3(m, m1, m);
        //赋值
        tileset.modelMatrix = m;
      },
      // 调整模型高度
      changeHeight(height) {
        height = Number(height);
        if (isNaN(height)) {
          return;
        }
        var cartographic = Cesium.Cartographic.fromCartesian(
          tileset.boundingSphere.center
        );
        var surface = Cesium.Cartesian3.fromRadians(
          cartographic.longitude,
          cartographic.latitude,
          cartographic.height
        );
        var offset = Cesium.Cartesian3.fromRadians(
          cartographic.longitude,
          cartographic.latitude,
          height
        );
        var translation = Cesium.Cartesian3.subtract(
          offset,
          surface,
          new Cesium.Cartesian3()
        );
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
      },
      //添加正方体几何体
      addShape() {
        var redBox = viewer.entities.add({
          name: "Red box with black outline",
          position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
          box: {
            dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
            material: Cesium.Color.RED.withAlpha(0.5),
            outline: true,
            outlineColor: Cesium.Color.BLACK,
          },
        });

        viewer.zoomTo(viewer.entities);
      },
      // 添加czml格式的正方体几何体
      addShapeByCZML() {
        let czml = [
          {
            id: "document",
            name: "box",
            version: "1.0",
          },
          {
            id: "shape2",
            name: "Red box with black outline",
            position: {
              cartographicDegrees: [-107.0, 40.0, 300000.0],
            },
            box: {
              dimensions: {
                cartesian: [400000.0, 300000.0, 500000.0],
              },
              material: {
                solidColor: {
                  color: {
                    rgba: [255, 0, 0, 128],
                  },
                },
              },
              outline: true,
              outlineColor: {
                rgba: [0, 0, 0, 255],
              },
            },
          },
        ];

        var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
        viewer.dataSources.add(dataSourcePromise);
        viewer.zoomTo(dataSourcePromise);
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
</style>