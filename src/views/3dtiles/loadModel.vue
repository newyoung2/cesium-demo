<template>
  <div id="cesiumContainer">
    <el-button type="primary" size="mini" @click.stop="clear" style="position:absolute;right:8vh;top:2vh;z-index:100;">清除</el-button>
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
import util from '../../util/cesiumUtil'
var viewer = null;
var tileset = null;
var handler = null
let res
export default {
  name:"load3DTiles",
  props: {},
  data() {
    return {
      tileset: null,
    };
  },
  computed: {},
  watch: {},
  components: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let viewerOption = {
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
        //  imageryProvider : new Cesium.UrlTemplateImageryProvider({    //高德影像图层
        //         url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        //     }),
        // terrainProvider: Cesium.createWorldTerrain(),
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url:
            "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        }),
        //关闭图层选择器，不然还怎么指定呢
        //  baseLayerPicker : false
      };

      //使用ion数据   需要先申请token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY";
      viewer = new Cesium.Viewer("cesiumContainer", viewerOption);
      //  viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      //       url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
      //   }));
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      this.add3DTiles();
      res = util.measureAreaSpace(viewer,handler)
      // this.goSH()
    },
    clear(){
        res.clear()
       
    },
    //添加3dtiles格式模型数据
    add3DTiles() {
      let that = this;
      tileset = new Cesium.Cesium3DTileset({
        url: "test/Scene/Production_6.json",
        // dynamicScreenSpaceError: true,
        // skipLevels: 0,
        // cullWithChildrenBounds: false,
        maximumScreenSpaceError: 2,
        maximumNumberOfLoadedTiles:1000,
      });

      viewer.scene.primitives.add(tileset);
      tileset.readyPromise.then(function (tileset) {

         var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
        var offset = Cesium.Cartesian3.fromRadians(Cesium.Math.toRadians(106.709183),Cesium.Math.toRadians(26.562819), -32.0);
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
         tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        viewer.zoomTo(tileset); //视角移动至模型位置
      });
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
