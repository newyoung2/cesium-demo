<template>
  <div id="cesiumContainer1"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var entity = null;
var handler = null;
var activePoint = [];
var drawingMode = "line";
var activeShapePoints = [];
var activeShape;
var floatingPoint 
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
      let that = this;
      handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      handler.setInputAction(function (event) {
        var earthPosition = viewer.scene.pickPosition(event.position);
        if (Cesium.defined(earthPosition)) {
          if (activePoint.length == 0) {
            floatingPoint = that.createPoint(earthPosition);
            activePoint.push(earthPosition);
            var dynamicPositions = new Cesium.CallbackProperty(function () {
               
              return activePoint;
            }, false);
            that.drawShape(dynamicPositions);
          }
          activePoint.push(earthPosition);
          that.createPoint(earthPosition);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      handler.setInputAction(function (event) {
        if (Cesium.defined(floatingPoint)) {
          var newPosition = viewer.scene.pickPosition(event.endPosition);
          if (Cesium.defined(newPosition)) {
              floatingPoint.position.setValue(newPosition);
            activePoint.pop();
            activePoint.push(newPosition);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function (event) {
          that.terminateShape();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    //   Zoom in to an area with mountains
      viewer.camera.lookAt(
        Cesium.Cartesian3.fromDegrees(-122.2058, 46.1955, 1000.0),
        new Cesium.Cartesian3(5000.0, 5000.0, 5000.0)
      );
      viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    },
    createPoint(worldPosition) {
      var point = viewer.entities.add({
        position: worldPosition,
        point: {
          color: Cesium.Color.WHITE,
          pixelSize: 5,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      return point;
    },
    drawShape(positionData) {
      console.log(positionData);
      viewer.entities.add({
        polyline: {
          positions: positionData,
          clampToGround: true,
          width: 3,
        },
      });
    },
    // Redraw the shape so it's not dynamic and remove the dynamic shape.
    terminateShape() {
      activePoint.pop();
      this.drawShape(activePoint);
      viewer.entities.remove(floatingPoint);
      viewer.entities.remove(activeShape);
      floatingPoint = undefined;
      activeShape = undefined;
      activePoint = [];
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
