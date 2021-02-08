<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var entity = null;
export default {
  name: "model",
  props: {},
  data() {
    return {
      count: 0,
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
        baseLayerPicker: true,
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      this.createModel(this.modelsData[0][0], this.modelsData[0][1]);
    },
    /* 加载gltf模型 */
    createModel(url, height) {
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
          minimumPixelSize: 128,
          maximumScale: 20000,
        },
      });

      viewer.trackedEntity = entity;
      this.addParticleSystem();
    },
    addParticleSystem() {
      viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
          image: "SampleData/fire.png",
//        emissionRate: 50.0,
//        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30.0)),
//        bursts : [
//           new Cesium.ParticleBurst({time : 5.0, minimum : 300, maximum : 500}),
//           new Cesium.ParticleBurst({time : 10.0, minimum : 50, maximum : 100}),
//           new Cesium.ParticleBurst({time : 15.0, minimum : 200, maximum : 300})
//        ],
          startScale: 1.0,
          endScale: 4.0,
          particleLife: 1.0,
          speed: 5.0,
          imageSize: new Cesium.Cartesian2(20, 20),
          emissionRate: 5.0,
          lifetime: 16.0,
          modelMatrix: this.computeModelMatrix(entity, Cesium.JulianDate.now()),
          emitterModelMatrix: this.computeEmitterModelMatrix(),
        })
      );
    },
    //粒子系统模型在相对于模型的位置
    computeEmitterModelMatrix() {
     var hpr = Cesium.HeadingPitchRoll.fromDegrees(
        0.0,
        0.0,
        0.0,
        new Cesium.HeadingPitchRoll()
      );
      var trs = new Cesium.TranslationRotationScale();
      trs.translation = Cesium.Cartesian3.fromElements(
        2.5,
        4.0,
        1.0,
        new Cesium.Cartesian3()
      );
      trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(
        hpr,
        new Cesium.Quaternion()
      );
      return Cesium.Matrix4.fromTranslationRotationScale(
        trs,
        new Cesium.Matrix4()
      );
    },
    //粒子系统模型在世界坐标系中的位置
    computeModelMatrix(entity, time) {
      var position = Cesium.Property.getValueOrUndefined(
        entity.position,
        time,
        new Cesium.Cartesian3()
      );
      if (!Cesium.defined(position)) {
        return undefined;
      }
      var orientation = Cesium.Property.getValueOrUndefined(
        entity.orientation,
        time,
        new Cesium.Quaternion()
      );
      if (!Cesium.defined(orientation)) {
        var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
          position,
          undefined,
          new Cesium.Matrix4()
        );
      } else {
        modelMatrix = Cesium.Matrix4.fromRotationTranslation(
          Cesium.Matrix3.fromQuaternion(orientation, new Cesium.Matrix3()),
          position,
          new Cesium.Matrix4()
        );
      }
      return modelMatrix;
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
