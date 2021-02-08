<template>
  <div id="cesiumContainer1"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
export default {
  name: "drawLine",
  props: {},
  data() {
    return {
      tileset: null,
    };
  },
  computed: {},
  watch: {},
  components: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY";
      viewer = new Cesium.Viewer("cesiumContainer1", {
        infoBox: false,
        selectionIndicator: false,
        terrainProvider: Cesium.createWorldTerrain(),
      });

      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      this.startDraw();
    },
    startDraw() {
      /* 设置地球透明度等相关设置 */
      viewer.scene.globe.showGroundAtmosphere = false;
      viewer.scene.globe.baseColor = Cesium.Color.TRANSPARENT;
      viewer.scene.globe.translucency.enabled = true;
      viewer.scene.globe.undergroundColor = undefined;
      // Set oceans on Bing base layer to transparent   设置海洋透明度
       viewer.scene.imageryLayers.get(0).colorToAlpha = new Cesium.Color(0.0, 0.016, 0.059);
       viewer.scene.imageryLayers.get(0).colorToAlphaThreshold = 0.2;

      /* 添加一个地心球几何体 */
      var innerCoreRadius = 1250000;
      viewer.entities.add({
        name: "Inner Core",
        position: Cesium.Cartesian3.ZERO,
        ellipsoid: {
          radii: new Cesium.Cartesian3(
            innerCoreRadius,
            innerCoreRadius,
            innerCoreRadius
          ),
          material: Cesium.Color.YELLOW,
        },
      });
    },
  },
};
</script>

<style scoped>
#cesiumContainer1 {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
