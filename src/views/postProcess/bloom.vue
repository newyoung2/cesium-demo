<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
let bloom = null
export default {
  name:'bloom',
  props: {},
  data() {
    return {
    };
  },
  mounted() {
      console.log('111')
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
        baseLayerPicker : true,
        //  imageryProvider : new Cesium.UrlTemplateImageryProvider({    //高德影像图层
        //         url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        //     }),
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      
      this.updatePostProcess()
      
    },
    /* 添加bloom后期效果 */
    updatePostProcess() {
   bloom = viewer.scene.postProcessStages.bloom;
   bloom.enabled = true
   bloom.uniforms.brightness = 0.1
}
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
