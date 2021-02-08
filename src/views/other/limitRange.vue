<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var entity = null;
var handler = null
export default {
  name:'limitRange',
  props: {},
  data() {
    return {
        count:0,
      modelsData: [
        ["SampleData/models/CesiumAir/Cesium_Air.glb", 5000.0],
        ["SampleData/models/CesiumDrone/CesiumDrone.glb", 150.0],
        ["SampleData/models/GroundVehicle/GroundVehicle.glb", 0],
        ["SampleData/models/CesiumBalloon/CesiumBalloon.glb", 1000.0],
        ["SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb", 0],
        ["SampleData/models/CesiumMan/Cesium_Man.glb", 0],
        ["SampleData/models/DracoCompressed/CesiumMilkTruck.gltf", 0],
      ],
    };
  },
  mounted() {
      console.log('333')
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
      
      this.limitRange()
      
    },
    //视角连续飞行
    //限制地图显示范围
    limitRange(){
     let coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(-180.0,-23.43687,180.0,23.43687);

       //开启限制
       viewer.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;
       viewer.scene.globe.showSkirts = false;
       viewer.scene.globe.backFaceCulling = false;
       viewer.scene.globe.undergroundColor = undefined;
       viewer.scene.skyAtmosphere.show = false;
       //关闭限制
      //  viewer.scene.globe.cartographicLimitRectangle = undefined;
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
