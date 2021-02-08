<template>
  <div id="cesiumContainer1">
    <div id="slider"></div>
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var earthAtNight = null;
var layers = null;
var slider = null;
var handler = null;
var moveActive = false;
var promise;
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
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url:
            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        }),
        baseLayerPicker: false,
        infoBox: false,
      });

      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      this.startDraw();
    },
    startDraw() {
      let that = this;
      layers = viewer.imageryLayers;
      earthAtNight = layers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url:
            "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        })
      );

      earthAtNight.splitDirection = Cesium.ImagerySplitDirection.LEFT; // Only show to the left of the slider.
      console.log(earthAtNight);
      // Sync the position of the slider with the split position
      slider = document.getElementById("slider");
      viewer.scene.imagerySplitPosition =
        slider.offsetLeft / slider.parentElement.offsetWidth;

      handler = new Cesium.ScreenSpaceEventHandler(slider);

      moveActive = false;

      handler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      handler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.PINCH_START);

      handler.setInputAction(that.move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction(that.move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.PINCH_END);
    },
    move(movement) {
      if (!moveActive) {
        return;
      }

      var relativeOffset = movement.endPosition.x;
      var splitPosition =
        (slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
      slider.style.left = 100.0 * splitPosition + "%";
      viewer.scene.imagerySplitPosition = splitPosition;
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

#slider {
  position: absolute;
  left: 50%;
  top: 0px;
  background-color: #d3d3d3;
  width: 5px;
  height: 100%;
  z-index: 9999;
}

#slider:hover {
  cursor: ew-resize;
}
</style>
