<template>
  <div id="cesiumContainer1"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
export default {
  name:'goSH',
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
        terrainProvider: Cesium.createWorldTerrain(),
        //关闭图层选择器，不然还怎么指定呢
        //  baseLayerPicker : false
      };

      //使用ion数据   需要先申请token
      Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY";
      viewer = new Cesium.Viewer("cesiumContainer1", viewerOption);
      //  viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      //       url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
      //   }));
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      this.goSH()
    },
    goSH() {
      viewer.scene.primitives.add(Cesium.createOsmBuildings());
      viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(121.506377, 31.245105, 750),
        orientation: {
          heading: Cesium.Math.toRadians(20),
          pitch: Cesium.Math.toRadians(-20),
        },
      });
    },
  },
};
</script>

<style scoped>
#cesiumContainer1 {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
