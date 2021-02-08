<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var snowParticleSize = 12.0;
var snowRadius = 100000.0;
var minimumSnowImageSize;
var maximumSnowImageSize;
var snowSystem;
var snowGravityScratch;
var scene;
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
        shouldAnimate: true,
        terrainProvider: Cesium.createWorldTerrain(),
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          277096.634865404,
          5647834.481964232,
          2985563.7039122293
        ),
        orientation: {
          heading: 4.731089976107251,
          pitch: -0.32003481981370063,
        },
      });
      this.addParticleSystem();
    },
    addParticleSystem() {
      scene = viewer.scene;
      minimumSnowImageSize = new Cesium.Cartesian2(
        snowParticleSize,
        snowParticleSize
      );
      maximumSnowImageSize = new Cesium.Cartesian2(
        snowParticleSize * 2.0,
        snowParticleSize * 2.0
      );
      snowGravityScratch = new Cesium.Cartesian3();
      snowSystem = new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          viewer.scene.camera.position
        ),
        minimumSpeed: -1.0,
        maximumSpeed: 0.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(snowRadius),
        startScale: 0.5,
        endScale: 1.0,
        image: "SampleData/snowflake_particle.png",
        emissionRate: 7000.0,
        startColor: Cesium.Color.WHITE.withAlpha(0.0),
        endColor: Cesium.Color.WHITE.withAlpha(1.0),
        minimumImageSize: minimumSnowImageSize,
        maximumImageSize: maximumSnowImageSize,
        updateCallback: snowUpdate,
      });

      function snowUpdate(particle, dt) {
        /* 使粒子像受重力影响一样的落下 */

        snowGravityScratch = Cesium.Cartesian3.normalize(
          particle.position,
          snowGravityScratch
        );
        Cesium.Cartesian3.multiplyByScalar(
          snowGravityScratch,
          Cesium.Math.randomBetween(-30.0, -300.0),
          snowGravityScratch
        );
        particle.velocity = Cesium.Cartesian3.add(
          particle.velocity,
          snowGravityScratch,
          particle.velocity
        );
        
        /*  检测粒子距离相机的距离，距离越远，粒子越模糊（透明度越大），就像一种随距离加重的雾效果  */
        var distance = Cesium.Cartesian3.distance(
          scene.camera.position,
          particle.position
        );
        if (distance > snowRadius) {
          particle.endColor.alpha = 0.0;
        } else {
          particle.endColor.alpha =
            snowSystem.endColor.alpha / (distance / snowRadius + 0.1);
        }
      }
      viewer.scene.primitives.add(snowSystem);

      //确保整个环境和场景匹配，我们修改大气和雾效果和下雨天匹配。下面代码修改为深蓝色天空，还有一点薄雾。

      viewer.scene.skyAtmosphere.hueShift = -0.97;
      viewer.scene.skyAtmosphere.saturationShift = 0.25;
      viewer.scene.skyAtmosphere.brightnessShift = -0.4;

      viewer.scene.fog.density = 0.00025;
      viewer.scene.fog.minimumBrightness = 0.01;
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
