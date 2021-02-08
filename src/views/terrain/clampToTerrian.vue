<template>
  <div id="cesiumContainer1"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
export default {
  name: "clampToTerrain",
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
      let viewerOption = {
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true,
      };

      //使用ion数据   需要先申请token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY";
      viewer = new Cesium.Viewer("cesiumContainer1", viewerOption);
      //  viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      //       url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
      //   }));
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      this.addPolygon();
    },
    /* 添加贴地多边形 */
    addPolygon() {
      viewer.scene.globe.depthTestAgainstTerrain = false;
      var e = viewer.entities.add({
        polygon: {
          hierarchy: {
            positions: [
              new Cesium.Cartesian3(
                -2358138.847340281,
                -3744172.459541374,
                4581158.5714175375
              ),
              new Cesium.Cartesian3(
                -2357231.4925370603,
                -3745103.7886602185,
                4580702.9757762635
              ),
              new Cesium.Cartesian3(
                -2355912.902205431,
                -3744249.029778454,
                4582402.154378103
              ),
              new Cesium.Cartesian3(
                -2357208.0209552636,
                -3743553.4420488174,
                4581961.863286629
              ),
            ],
          },
          material: Cesium.Color.BLUE.withAlpha(0.5),
        },
      });

      viewer.zoomTo(e);
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
