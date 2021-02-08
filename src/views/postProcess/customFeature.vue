<template>
  <div id="cesiumContainer1">
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
let entity = null
var handler = null
var stage = null
export default {
  props: {},
  data() {
    return {
    };
  },
  mounted() {
      console.log('111')
    this.init();
  },
  methods: {
    init() {
      viewer = new Cesium.Viewer("cesiumContainer1", {
        shouldAnimate: true,
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      
      this.updatePostProcess()
      
    },
    /* 添加bloom后期效果 */
    updatePostProcess() {
       var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706);
var url = "SampleData/models/CesiumMan/Cesium_Man.glb";
 entity = (viewer.trackedEntity = viewer.entities.add({
  name: url,
  position: position,
  model: {
    uri: url,
  },
}));

// Shade selected model with highlight.
var fragmentShaderSource =
  "uniform sampler2D colorTexture;\n" +
  "varying vec2 v_textureCoordinates;\n" +
  "uniform vec4 highlight;\n" +
  "void main() {\n" +
  "    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n" +
  "    if (czm_selected()) {\n" +
  "        vec3 highlighted = highlight.a * highlight.rgb + (1.0 - highlight.a) * color.rgb;\n" +
  "        gl_FragColor = vec4(highlighted, 1.0);\n" +
  "    } else { \n" +
  "        gl_FragColor = color;\n" +
  "    }\n" +
  "}\n";

 /* 马赛克后期 */
//   var fragmentShaderSource =
//   "uniform sampler2D colorTexture; \n" +
//   "varying vec2 v_textureCoordinates; \n" +
//   "const int KERNEL_WIDTH = 16; \n" +
//   "void main(void) \n" +
//   "{ \n" +
//   "    vec2 step = czm_pixelRatio / czm_viewport.zw; \n" +
//   "    vec2 integralPos = v_textureCoordinates - mod(v_textureCoordinates, 8.0 * step); \n" +
//   "    vec3 averageValue = vec3(0.0); \n" +
//   "    for (int i = 0; i < KERNEL_WIDTH; i++) \n" +
//   "    { \n" +
//   "        for (int j = 0; j < KERNEL_WIDTH; j++) \n" +
//   "        { \n" +
//   "            averageValue += texture2D(colorTexture, integralPos + step * vec2(i, j)).rgb; \n" +
//   "        } \n" +
//   "    } \n" +
//   "    averageValue /= float(KERNEL_WIDTH * KERNEL_WIDTH); \n" +
//   "    gl_FragColor = vec4(averageValue, 1.0); \n" +
//   "} \n";
 stage = viewer.scene.postProcessStages.add(
  new Cesium.PostProcessStage({
    fragmentShader: fragmentShaderSource,
    uniforms: {
      highlight: function () {
        return new Cesium.Color(1.0, 0.0, 0.0, 0.5);
      },
    },
  })
);
stage.selected = [];

 handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
  var pickedObject = viewer.scene.pick(movement.endPosition);
  if (Cesium.defined(pickedObject)) {
    stage.selected = [pickedObject.primitive];
  } else {
    stage.selected = [];
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
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
