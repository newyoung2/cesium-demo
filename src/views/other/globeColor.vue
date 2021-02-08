<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import widget from "cesium/Widgets/widgets.css";
import * as Cesium from "cesium/Cesium";
var viewer = null;
export default {
  name:'globeColor',
  props: {},
  data() {
    return {
    };
  },
  mounted() {
      console.log('222')
    this.init();
  },
  methods: {
    init() {
      viewer = new Cesium.Viewer("cesiumContainer1", {
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true,
        timeline: false, // 时间滚动条控件
        fullscreenButton: false, // 全屏控件
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        animation: false, // 控制场景动画的播放速度控件
        baseLayerPicker : false,
         imageryProvider : new Cesium.UrlTemplateImageryProvider({    //高德影像图层
                url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            }),
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      
      this.changeEarthColor()
      
    },
     //修改地球颜色为纯色
    changeEarthColor(){
        viewer.scene.globe.depthTestAgainstTerrain = false;
        viewer.scene.skyAtmosphere.show = false;
        viewer.scene.globe.imageryLayers.get(0).alpha = 0.0;  
        viewer.scene.globe.baseColor = new Cesium.Color(1, 1, 0, 0);
    },
  },
};
</script>

<style scoped>
#cesiumContainer1 {
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}


</style>
