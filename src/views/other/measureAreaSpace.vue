<template>
  <div id="cesiumContainer">
      <el-button type="primary" size="mini" @click.stop="clear" style="position:absolute;right:8vh;top:2vh;z-index:100;">清除</el-button>
      <div id="cesiumContainer1"></div>
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
import util from '../../util/cesiumUtil'
var viewer = null;
var handler = null
var res
export default {
  props: {},
  data() {
    return {
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
      viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(121.506377, 31.245105, 750),
        orientation: {
          heading: Cesium.Math.toRadians(20),
          pitch: Cesium.Math.toRadians(-20),
        },
      }); 
      
      res = util.measureAreaSpace(viewer,handler)
    },
    clear(){
        res.clear()
       
    }
   
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


</style>
