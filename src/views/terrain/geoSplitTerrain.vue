<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var globe;
var clippingPlanesEnabled = true;
var edgeStylingEnabled = true;
export default {
  name: "model",
  props: {},
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //使用ion数据   需要先申请token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY";
      viewer = new Cesium.Viewer("cesiumContainer1", {
        skyAtmosphere: false,
        shouldAnimate: true,
        terrainProvider: Cesium.createWorldTerrain(),
        scene3DOnly: true,
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      globe = viewer.scene.globe;
      this.loadCesiumMan();
    },
    loadCesiumMan() {
      var position = Cesium.Cartesian3.fromRadians(
        -2.0862979473351286,
        0.6586620013036164,
        1400.0
      );

      var entity = viewer.entities.add({
        position: position,
        box: {
          dimensions: new Cesium.Cartesian3(1400.0, 1400.0, 2800.0),
          material: Cesium.Color.WHITE.withAlpha(0.3),
          outline: true,
          outlineColor: Cesium.Color.WHITE,
        },
      });

      viewer.entities.add({
        position: position,
        model: {
          uri: "SampleData/models/CesiumMan/Cesium_Man.glb",
          minimumPixelSize: 128,
          maximumScale: 800,
        },
      });

      globe.depthTestAgainstTerrain = true;
      globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
        modelMatrix: entity.computeModelMatrix(Cesium.JulianDate.now()),
        planes: [
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(1.0, 0.0, 0.0),
            -700.0
          ),
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(-1.0, 0.0, 0.0),
            -700.0
          ),
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(0.0, 1.0, 0.0),
            -700.0
          ),
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(0.0, -1.0, 0.0),
            -700.0
          ),
        ],
        edgeWidth: edgeStylingEnabled ? 1.0 : 0.0,
        edgeColor: Cesium.Color.WHITE,
        enabled: clippingPlanesEnabled,
      });
      globe.backFaceCulling = true;
      globe.showSkirts = true;

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
