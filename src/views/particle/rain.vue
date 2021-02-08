<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var rainParticleSize = 15.0;
var rainRadius = 100000.0;
var rainImageSize;
var rainSystem;

var rainGravityScratch = new Cesium.Cartesian3();
var scene;
export default {
  name: "model",
  props: {},
  data() {
    return {
      count: 0,
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
      rainImageSize = new Cesium.Cartesian2(
        rainParticleSize,
        rainParticleSize * 2.0
      );

      var rainGravityScratch = new Cesium.Cartesian3();
      rainSystem = new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(scene.camera.position),
        speed: -1.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(rainRadius),
        startScale: 1.0,
        endScale: 0.0,
        image: "SampleData/circular_particle.png",
        emissionRate: 9000.0,
        startColor: new Cesium.Color(0.27, 0.5, 0.7, 0.0),
        endColor: new Cesium.Color(0.27, 0.5, 0.7, 0.98),
        imageSize: rainImageSize,
        updateCallback: rainUpdate,
      });

      function rainUpdate(particle, dt) {
        /* 使粒子像受重力影响一样的落下 */
        rainGravityScratch = Cesium.Cartesian3.normalize(
          particle.position,
          rainGravityScratch
        );
        rainGravityScratch = Cesium.Cartesian3.multiplyByScalar(
          rainGravityScratch,
          -1050.0,
          rainGravityScratch
        );

        particle.position = Cesium.Cartesian3.add(
          particle.position,
          rainGravityScratch,
          particle.position
        );
        
        /* 检测粒子距离相机的距离，距离越远，粒子越模糊（透明度越大），就像一种随距离加重的雾效果 */
        var distance = Cesium.Cartesian3.distance(
          scene.camera.position,
          particle.position
        );
        if (distance > rainRadius) {
          particle.endColor.alpha = 0.0;
        } else {
          particle.endColor.alpha =
            rainSystem.endColor.alpha / (distance / rainRadius + 0.1);
        }
      }
      viewer.scene.primitives.add(rainSystem);

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
