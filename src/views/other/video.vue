<template>
  <div id="cesiumContainer1">
    <video
      id="trailer"
      muted=""
      autoplay=""
      loop=""
      crossorigin=""
      controls=""
    >
      <source
        src="http://vjs.zencdn.net/v/oceans.mp4"
        type="video/mp4"
      >
    </video>
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
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
        showRenderLoopErrors: false,
        shouldAnimate: true,
      });

      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      this.addVideo();
    },
    addVideo() {
      var videoElement = document.getElementById("trailer");

      var sphere = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-79, 39, 1000),
        ellipsoid: {
          radii: new Cesium.Cartesian3(1000, 1000, 1000),
          material: videoElement,
        },
      });

      viewer.trackedEntity = sphere;

      /* 通cesium下面的时间轴控制播放进度 */
      new Cesium.VideoSynchronizer({
        clock: viewer.clock,
        element: videoElement,
      });

      /* 将几何体分割为多块屏幕播放视频 */
      sphere.ellipsoid.material.repeat = new Cesium.CallbackProperty(function (
        time,
        result
      ) {
        if (!Cesium.defined(result)) {
          result = new Cesium.Cartesian2();
        }
        if (true) {
          result.x = 8;
          result.y = 8;
        } else {
          result.x = 1;
          result.y = 1;
        }
        return result;
      },
      false);
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

#trailer {
  position: absolute;
  z-index: 1000;
  bottom: 75px;
  right: 0;
  width: 320px;
  height: 180px;
}
</style>
