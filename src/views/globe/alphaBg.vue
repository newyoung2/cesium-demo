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
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true,
          },
        },
      });
      viewer.scene.skyBox.show = false;
      viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);

      // // 删除默认的影像图层
      // viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

      // // 增加谷歌影像底图
      // viewer.imageryLayers.addImageryProvider(
      //   new Cesium.UrlTemplateImageryProvider({
      //     url: "http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
      //     tilingScheme: new Cesium.WebMercatorTilingScheme(),
      //   })
      // );

      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
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
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201401%2F11%2F154330ki10n41lz48sny51.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615359081&t=3e14927cb21599184b3738a986b1f23f")
    no-repeat;
  background-size: 100% 100%;
}
</style>
