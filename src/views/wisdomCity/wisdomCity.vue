<template>
  <div id="cesiumContainer1"></div>
</template>

<script>
  // import * as Cesium from "cesium/Cesium";
  // import widget from "cesium/Widgets/widgets.css";
  // import './cesium-tilesetEffect.js'
  var viewer = null;
  var entities;
  var promise;
  var city;
  var handler
  var bloom

  export default {
    name: "goSH",
    props: {},
    data() {
      return {
        tileset: null,
      };
    },
    computed: {},
    watch: {},
    components: {},
    created() { },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let viewerOption = {
          infoBox: false,
          selectionIndicator: false,
          geocoder: false, // 地理位置查询定位控件
          homeButton: false, // 默认相机位置控件
          timeline: false, // 时间滚动条控件
          navigationHelpButton: false, // 默认的相机控制提示控件
          fullscreenButton: false, // 全屏控件
          scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
          // baseLayerPicker: true, // 底图切换控件
          animation: false, // 控制场景动画的播放速度控件
          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url:
              "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
          }),
          baseLayerPicker: false,
        };

        //使用ion数据   需要先申请token
        Cesium.Ion.defaultAccessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY";
        viewer = new Cesium.Viewer("cesiumContainer1", viewerOption);
        viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
        this.goSH();
        this.getCameraPosition()

      },
      getCameraPosition() {
        var arrLoc = [];
        var pickPosition = { x: null, y: null }

        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);　　//定义事件
        handler.setInputAction(function (movement) {


          // screenLocation.x = movement.position.x;
          // screenLocation.y = movement.position.y;


          var cartesian = viewer.camera.pickEllipsoid(
            movement.position,
            viewer.scene.globe.ellipsoid
          );
          if (cartesian) {
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitudeString = Cesium.Math.toDegrees(
              cartographic.longitude
            ).toFixed(2);　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//要更高的精度就修改保留的小数位数
            var latitudeString = Cesium.Math.toDegrees(
              cartographic.latitude
            ).toFixed(2);　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//同上


            pickPosition.x = longitudeString;
            pickPosition.y = latitudeString;
            let cf = { x: parseFloat(pickPosition.x), y: parseFloat(pickPosition.y) }


            console.log(cf) //鼠标点击位置


            var a = {
              position: viewer.camera.position,
              heading: viewer.camera.heading,
              pitch: viewer.camera.pitch
            }
            console.log(a)  //当前视角
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      },
      goSH() {
        // 特效 默认开启
        Cesium.TILE_EFFECT_STAYE = true;

        // 片元着色器 默认 可以自定义
        Cesium.TILE_FS_BODY = ` float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 *         
            2.0;
           float stc_sd = v_stcVertex.z / 60.0 + sin(stc_pl) * 0.1;
           gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);
           float stc_a13 = fract(czm_frameNumber / 360.0);
           float stc_h = clamp(v_stcVertex.z / 450.0, 0.0, 1.0);
           stc_a13 = abs(stc_a13 - 0.5) * 2.0;
           float stc_diff = step(0.005, abs(stc_h - stc_a13));
           gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff);`;


        var tileset = new Cesium.Cesium3DTileset({
          url: "test3/tileset.json",
          maximumScreenSpaceError: 16,
          maximumNumberOfLoadedTiles: 1000,
        });
        viewer.scene.primitives.add(tileset);

        tileset.readyPromise
          .then(function (tileset) {
            console.log(tileset)
            // 获取模型中心坐标  为w84坐标   转换为火星坐标
            var boundingSphere = tileset.boundingSphere;
            var cartographic = Cesium.Cartographic.fromCartesian(
              boundingSphere.center
            );
            // console.log(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude))
            var surface = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              0
            );
            var offset = Cesium.Cartesian3.fromRadians(
              Cesium.Math.toRadians(121.41440447172941),
              Cesium.Math.toRadians(31.148724746744023),
              -32.0
            );

            var translation = Cesium.Cartesian3.subtract(
              offset,
              surface,
              new Cesium.Cartesian3()
            );
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

            // var defaultStyle = new Cesium.Cesium3DTileStyle({
            //    color : "color('blue')",
            //    show : true
            // });

            tileset.style = new Cesium.Cesium3DTileStyle({
              color: {
                conditions: [
                  ["true", "color('cyan')"]
                ]
              }
            });

            viewer.scene.camera.flyTo({
              destination: new Cesium.Cartesian3(-2852038.506894064, 4656753.071879653, 3286786.358214652),
              orientation: {
                heading: 0.4417702951554947,
                pitch: -0.30187320702800813,
              },
            });

          })
          .otherwise(function (error) {
            throw error;
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