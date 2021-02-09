<template>
  <div id="cesiumContainer1"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var handler;
var kmlOptions;
var geocachePromise;
var geojsonOptions;
var neighborhoodsPromise;
var dronePromise;
var drone;
var city;
var stage;
var previousPickedEntity = undefined;
var previousPickedColor = undefined;
var highlighted
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
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //使用ion数据   需要先申请token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMjY1MzY3MC1mYWIwLTQ2ZDItYTdlZi0yNWEyZjU2MjAzOTQiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3MzkxNX0.gGDAumUmOxcrCTMRfrKZJjfZpYiLxGwJwSLlkDYt9BY";
      viewer = new Cesium.Viewer("cesiumContainer1", {
        shouldAnimate: true,
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      // 设置时钟和时间线
      // viewer.clock.shouldAnimate = true; // 当viewer开启后，启动动画
      // viewer.clock.startTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
      // viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:20:00Z");
      // viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
      // viewer.clock.multiplier = 2; // 设置加速倍率
      // viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // tick computation mode(还没理解具体含义)
      // viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 循环播放
      // viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime); // 设置时间的可见范围
      this.addCityModel();
      this.addCityPolygon();
      this.addPlaneModel();
      this.add3DTiles();
      
    },
    /*  */
    addCityModel() {
      /* 对于KmlDataSource，camera 和 canvas 选项必须要配置 */
      kmlOptions = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true,
      };
      // 从这个KML的url里加载POI点位  : http://catalog.opendata.city/dataset/pediacities-nyc-neighborhoods/resource/91778048-3c58-449c-a3f9-365ed203e914
      geocachePromise = Cesium.KmlDataSource.load(
        "Source/SampleData/sampleGeocacheLocations.kml",
        kmlOptions
      );

      geocachePromise.then(function (dataSource) {
        // 把所有entities添加到viewer中显示
        viewer.dataSources.add(dataSource);

        // 获得entity列表
        var geocacheEntities = dataSource.entities.values;
        for (var i = 0; i < geocacheEntities.length; i++) {
          var entity = geocacheEntities[i];
          if (Cesium.defined(entity.billboard)) {
            // 对这个entity设置样式
            // 调整垂直方向的原点，保证图标里的针尖对着地表位置
            entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
            // 去掉文字的显示
            entity.label = undefined;
            // 设置可见距离
            entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(
              10.0,
              8000.0
            );

            // 计算经度和纬度（角度表示）
            var cartographicPosition = Cesium.Cartographic.fromCartesian(
              entity.position.getValue(Cesium.JulianDate.now())
            );
            var longitude = Cesium.Math.toDegrees(
              cartographicPosition.longitude
            );
            var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
            // 修改描述信息
            var description =
              '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
              "<tr><th>" +
              "经度" +
              "</th><td>" +
              longitude.toFixed(5) +
              "</td></tr>" +
              "<tr><th>" +
              "纬度" +
              "</th><td>" +
              latitude.toFixed(5) +
              "</td></tr>" +
              "</tbody></table>";
            entity.description = description;
          }
        }
      });
    },
    //加载行政区多边形边界数据
    addCityPolygon() {
      geojsonOptions = {
        clampToGround: true,
      };
      // 从geojson文件加载行政区多边形边界数据
      neighborhoodsPromise = Cesium.GeoJsonDataSource.load(
        "Source/SampleData/sampleNeighborhoods.geojson",
        geojsonOptions
      );
      // viewer.zoomTo(neighborhoodsPromise);
      var neighborhoods;
      neighborhoodsPromise.then(function (dataSource) {
        console.log(dataSource);
        viewer.dataSources.add(dataSource);
        neighborhoods = dataSource.entities;

        // 获取enity列表遍历
        var neighborhoodEntities = dataSource.entities.values;
        for (var i = 0; i < neighborhoodEntities.length; i++) {
          var entity = neighborhoodEntities[i];

          if (Cesium.defined(entity.polygon)) {
            // 设置样式代码
            // 把properties里的neighborhood设置到name
            entity.name = entity.properties.neighborhood;

            // 设置一个随机半透明颜色
            entity.polygon.material = Cesium.Color.fromRandom({
              red: 0.1,
              maximumGreen: 0.5,
              minimumBlue: 0.5,
              alpha: 0.6,
            });
            // 设置这个属性让多边形贴地，ClassificationType.CESIUM_3D_TILE 是贴模型，ClassificationType.BOTH是贴模型和贴地
            entity.polygon.classificationType =
              Cesium.ClassificationType.TERRAIN;

            // 获取多边形的positions列表 并计算它的中心点
            var polyPositions = entity.polygon.hierarchy.getValue(
              Cesium.JulianDate.now()
            ).positions;
            var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions)
              .center;
            polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(
              polyCenter
            );
            entity.position = polyCenter;
            // 生成文字标注
            entity.label = {
              text: entity.name,
              showBackground: true,
              scale: 0.6,
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                10.0,
                8000.0
              ),
              disableDepthTestDistance: 100.0,
            };
          }
        }
      });
    },
    //添加无人机模型
    addPlaneModel() {
      dronePromise = Cesium.CzmlDataSource.load(
        "Source/SampleData/sampleFlight.czml"
      );

      //   viewer.zoomTo(dronePromise)
      dronePromise.then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        // 使用id获取在CZML 数据中定义的无人机entity
        drone = dataSource.entities.getById("Aircraft/Aircraft1");
        // 附加一些三维模型
        drone.model = {
          uri: "Source/SampleData/Models/CesiumDrone.gltf",
          minimumPixelSize: 128,
          maximumScale: 1000,
          silhouetteColor: Cesium.Color.WHITE,
          silhouetteSize: 2,
        };
        // 这个无人机模型有方向，但是效果有点奇怪，并没有朝向无人机的前进方向    所以要基于无人机轨迹的位置点，自动计算朝向
        drone.orientation = new Cesium.VelocityOrientationProperty(
          drone.position
        );
        // 光滑的路径插值
        drone.position.setInterpolationOptions({
          interpolationDegree: 3,
          interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
        });

        // viewer.trackedEntity = drone;
      });
    },
    /* 添加城市高楼建筑模型 */
    add3DTiles() {
      // this.addPostProcess()
      /* 添加城市建筑模型   并且制定医院和学校的颜色 */
      city = viewer.scene.primitives.add(
        Cesium.createOsmBuildings({
          style: new Cesium.Cesium3DTileStyle({
            color : "color('white')",
            show : true
          }),
        })
      );

      /* 将视角定位到建筑模型附近 */
      viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-73.98179, 40.75802, 1750),
        orientation: {
          heading: Cesium.Math.toRadians(20),
          pitch: Cesium.Math.toRadians(-20),
        },
      });

      /* 给模型建筑添加交互   鼠标悬停在建筑上的时候高亮显示 */
      highlighted = {
          feature: undefined,
          originalColor: new Cesium.Color(),
      };
      handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (movement) {
        var pickedPrimitive = viewer.scene.pick(movement.endPosition);

        var pickedEntity =
          pickedPrimitive && pickedPrimitive.color
            ? pickedPrimitive
            : undefined;
        // 取消上一个高亮对象的高亮效果
       // If a feature was previously highlighted, undo the highlight
       if (Cesium.defined(highlighted.feature)) {
          highlighted.feature.color = highlighted.originalColor;
          highlighted.feature = undefined;
       }


        // Highlight the currently picked entity
        if (Cesium.defined(pickedEntity)) {
          // Highlight the feature
          highlighted.feature = pickedEntity;
          Cesium.Color.clone(pickedEntity.color, highlighted.originalColor);
          pickedEntity.color = Cesium.Color.YELLOW.withAlpha(1);
        } 
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    /* 添加后期渲染效果   当鼠标悬停在建筑物上面的时候   高亮显示当前建筑物 */
    addPostProcess(){
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
