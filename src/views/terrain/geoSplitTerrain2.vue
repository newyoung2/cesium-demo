<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var globe;
var distance 
var boundingSphere 
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
      this.loadGrandCanyon();
    },
    loadGrandCanyon() {
      // Pick a position at the Grand Canyon
      var position = Cesium.Cartographic.toCartesian(
        new Cesium.Cartographic.fromDegrees(-113.2665534, 36.0939345, 100)
      );
      distance = 3000.0;
      boundingSphere = new Cesium.BoundingSphere(position, distance);

      globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
        modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(position),
        planes: [
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(1.0, 0.0, 0.0),
            distance
          ),
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(-1.0, 0.0, 0.0),
            distance
          ),
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(0.0, 1.0, 0.0),
            distance
          ),
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(0.0, -1.0, 0.0),
            distance
          ),
        ],
        unionClippingRegions: true,
        edgeWidth:  0.0,
        edgeColor: Cesium.Color.WHITE,
        enabled: true,
      });
      globe.backFaceCulling = false;
      globe.showSkirts = false;

      viewer.camera.viewBoundingSphere(
        boundingSphere,
        new Cesium.HeadingPitchRange(0.5, -0.5, boundingSphere.radius * 5.0)
      );
      viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
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
