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
  name:'flyView',
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
      
      this.fly()
      
    },
    //视角连续飞行
    fly() {
      let that = this
      let p1 = {
    longitude: 106.42,
    latitude: 26.35,
    height: 351.68,
    heading: 0.0,
    pitch: 10500.0,
    roll: 0.0,
    duration: 10,
}

let p2 = {
    longitude: 116.20,
    latitude: 39.56,
    height: 10510.68,
    heading: 0.0,
    pitch: -28.0,
    roll: 0.0,
    duration: 10,
}

let p3 = {
    longitude: 113.41,
    latitude: 29.58,
    height: 10510.68,
    heading: 0.0,
    pitch: -28.0,
    roll: 0.0,
    duration: 10,
}
// p2 p3
let positionList =[p1,p2,p3];
    if (that.count >= positionList.length) {
        return;
    }
    var position = positionList[that.count];

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            position.longitude,
            position.latitude,
            position.height
        ),
        duration: parseFloat(position.duration),
        // orientation: {
        //     heading: Cesium.Math.toRadians(position.heading),
        //     pitch: Cesium.Math.toRadians(position.pitch),
        //     roll: Cesium.Math.toRadians(position.roll)
        // },
        complete: function() {
            that.fly();
        }
    });
    that.count++;
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
