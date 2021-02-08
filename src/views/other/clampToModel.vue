<template>
  <div id="cesiumContainer1"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var longitude = -2.1480545852753163;
var latitude = 0.7688240036937101;
var range = 0.000002;
var duration = 4.0;
var entity = null;
var point = null;
var objectsToExclude = [];
var cartographic = new Cesium.Cartographic();
export default {
  name: "clampToModel",
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
      this.clampToModel();
    },
    /*  */
    clampToModel() {
      entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromRadians(longitude, latitude),
        model: {
          uri: "SampleData/models/GroundVehicle/GroundVehicle.glb",
        },
      });

      point = viewer.entities.add({
        position: new Cesium.CallbackProperty(this.updatePosition, false),
        point: {
          pixelSize: 10,
          color: Cesium.Color.YELLOW,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          show: false,
          showBackground: true,
          font: "14px monospace",
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(5, 5),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });

      objectsToExclude = [point];
      cartographic = new Cesium.Cartographic();
      console.log(cartographic)
      viewer.trackedEntity = entity;
    },
    updatePosition(time, result) {
      var offset = (time.secondsOfDay % duration) / duration;
      cartographic.longitude = longitude - range + offset * range * 2.0;
      cartographic.latitude = latitude;

      var height;
      if (viewer.scene.sampleHeightSupported) {
        height = viewer.scene.sampleHeight(cartographic, objectsToExclude);
      }

      if (Cesium.defined(height)) {
        cartographic.height = height;
        point.label.text = Math.abs(height).toFixed(2).toString() + " m";
        point.label.show = true;
      } else {
        cartographic.height = 0.0;
        point.label.show = false;
      }
      
      return Cesium.Cartographic.toCartesian(
        cartographic,
        Cesium.Ellipsoid.WGS84,
        result
      );
    }
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
