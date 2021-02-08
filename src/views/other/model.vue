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
  name:'model',
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
      
      this.createModel(this.modelsData[0][0],this.modelsData[0][1])
       this.clickChangeColor()
      
    },
    //交互  点击3d模型  使被点击的模型变色
    clickChangeColor(){
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(movement) {
            var earthPosition = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            console.log(earthPosition)
            var pickedPrimitive = viewer.scene.pick(movement.position);
            var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
             console.log(movement,pickedPrimitive,pickedEntity)
          // Highlight the currently picked entity
            if (Cesium.defined(pickedEntity)) {
               pickedEntity.model.color = Cesium.Color.fromRandom()
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    /* 加载gltf模型 */
    createModel(url, height) {
      viewer.entities.removeAll();

      /* 剪切平面 */
      let clippingPlanes = new Cesium.ClippingPlaneCollection({
            planes: [
              new Cesium.ClippingPlane(
                new Cesium.Cartesian3(0,-1,0),
                0.0
              ),
            ],
            edgeWidth:5.0,
            edgeColor:Cesium.Color.fromRandom()
          });

      var position = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        height
      );
      var heading = Cesium.Math.toRadians(135);
      var pitch = 0;
      var roll = 0;
      var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );

       entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize:128,
          maximumScale: 20000,
          /* color:new Cesium.CallbackProperty((time,result)=>{
            return Cesium.Color.fromRandom()
          }, false), */
          clippingPlanes: clippingPlanes,
        },
      });

      viewer.trackedEntity = entity;
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
