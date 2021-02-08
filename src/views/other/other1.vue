<template>
  <div id="cesiumContainer">
      <div class="select-box">
           <el-select v-model="value" @change="change" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
      </div>
    <!-- <iframe id="ifa" src="http://localhost:18080/test1/index1.html" frameborder="0"></iframe> -->
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import widget from "cesium/Widgets/widgets.css";
var viewer = null;
var entity = null;
var handler = null
let bloom = null
export default {
  props: {},
  data() {
    return {
        value:'',
        options:[{name:'添加bloom后期效果',value:'1'},{name:'限制地图显示范围',value:'2'},{name:'视角连续飞行',value:'3'},
                {name:'修改地球颜色为纯色',value:'4'},{name:'点击模型变色、切割模型',value:'5'}],
      count:0,
      modelsData: [
        ["SampleData/models/CesiumAir/Cesium_Air.glb", 5000.0],
        ["SampleData/models/CesiumDrone/CesiumDrone.glb", 150.0],
        ["SampleData/models/GroundVehicle/GroundVehicle.glb", 0],
        ["SampleData/models/CesiumBalloon/CesiumBalloon.glb", 1000.0],
        ["SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb", 0],
        ["SampleData/models/CesiumMan/Cesium_Man.glb", 0],
        ["SampleData/models/DracoCompressed/CesiumMilkTruck.gltf", 0],
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      viewer = new Cesium.Viewer("cesiumContainer", {
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true,
        timeline: false, // 时间滚动条控件
        fullscreenButton: false, // 全屏控件
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        animation: false, // 控制场景动画的播放速度控件
        baseLayerPicker : true,
        //  imageryProvider : new Cesium.UrlTemplateImageryProvider({    //高德影像图层
        //         url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        //     }),
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      // this.limitRange()
      //  this.fly()
      //  this.changeEarthColor()
    //   this.createModel(this.modelsData[0][0],this.modelsData[0][1])
    //   this.clickChangeColor()
      // this.updatePostProcess()
      //  this.addShape()
      this.change('5')
      
    },
    change(val){
       viewer.entities.removeAll();
       switch (val) {
           case '1':
               this.updatePostProcess()
               break;
           case '2':
               this.limitRange()
               break;
           case '3':
               this.fly()
               break;
           case '4':
               this.changeEarthColor()
               break;
           case '5':
                this.createModel(this.modelsData[0][0],this.modelsData[0][1])
               this.clickChangeColor()
               break;
       
           default:
                this.createModel(this.modelsData[0][0],this.modelsData[0][1])
               this.clickChangeColor()
               break;
       }
    },
    /* 添加bloom后期效果 */
    updatePostProcess() {
   bloom = viewer.scene.postProcessStages.bloom;
   bloom.enabled = true
   bloom.uniforms.brightness = 0.1
},
    //限制地图显示范围
    limitRange(){
     let coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(110.0, 23.43687, 114.0, 25.43687);

       //开启限制
       viewer.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;
       //关闭限制
      //  viewer.scene.globe.cartographicLimitRectangle = undefined;
    },
    //视角连续飞行
    fly() {
      let that = this
      let p1 = {
    longitude: 106.42,
    latitude: 26.35,
    height: 351.68,
    heading: 0.0,
    pitch: 10500.0,
    roll: 0.0,
    duration: 10,
}

let p2 = {
    longitude: 116.20,
    latitude: 39.56,
    height: 10510.68,
    heading: 0.0,
    pitch: -28.0,
    roll: 0.0,
    duration: 10,
}

let p3 = {
    longitude: 113.41,
    latitude: 29.58,
    height: 10510.68,
    heading: 0.0,
    pitch: -28.0,
    roll: 0.0,
    duration: 10,
}
// p2 p3
let positionList =[p1,p2,p3];
    if (that.count >= positionList.length) {
        return;
    }
    var position = positionList[that.count];

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            position.longitude,
            position.latitude,
            position.height
        ),
        duration: parseFloat(position.duration),
        // orientation: {
        //     heading: Cesium.Math.toRadians(position.heading),
        //     pitch: Cesium.Math.toRadians(position.pitch),
        //     roll: Cesium.Math.toRadians(position.roll)
        // },
        complete: function() {
            that.fly();
        }
    });
    that.count++;
    },
    //修改地球颜色为纯色
    changeEarthColor(){
        viewer.scene.globe.depthTestAgainstTerrain = false;
        viewer.scene.skyAtmosphere.show = false;
        viewer.scene.globe.imageryLayers.get(0).alpha = 0.0;  
        viewer.scene.globe.baseColor = new Cesium.Color(1, 1, 0, 0);
    },
    //交互  点击3d模型  使被点击的模型变色
    clickChangeColor(){
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(movement) {
            var earthPosition = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            console.log(earthPosition)
            var pickedPrimitive = viewer.scene.pick(movement.position);
            var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
             console.log(movement,pickedPrimitive,pickedEntity)
          // Highlight the currently picked entity
            if (Cesium.defined(pickedEntity)) {
               pickedEntity.model.color = Cesium.Color.fromRandom()
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    /* 加载gltf模型 */
    createModel(url, height) {
      viewer.entities.removeAll();

      /* 剪切平面 */
      let clippingPlanes = new Cesium.ClippingPlaneCollection({
            planes: [
              new Cesium.ClippingPlane(
                new Cesium.Cartesian3(0,-1,0),
                0.0
              ),
            ],
            edgeWidth:5.0,
            edgeColor:Cesium.Color.fromRandom()
          });

      var position = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        height
      );
      var heading = Cesium.Math.toRadians(135);
      var pitch = 0;
      var roll = 0;
      var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );

       entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize:128,
          maximumScale: 20000,
          /* color:new Cesium.CallbackProperty((time,result)=>{
            return Cesium.Color.fromRandom()
          }, false), */
          clippingPlanes: clippingPlanes,
        },
      });
      viewer.trackedEntity = entity;
    },
    //添加正方体几何体
    addShape() {
      var redBox = viewer.entities.add({
        name: "Red box with black outline",
        position: Cesium.Cartesian3.fromDegrees( 112,24, 5000.0),
        box: {
          dimensions: new Cesium.Cartesian3(4000.0, 3000.0, 5000.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });

      viewer.zoomTo(viewer.entities);
    },
  },
};
</script>

<style scoped>
#cesiumContainer {
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

iframe{
  width: 100%;
  height: 100%;
}

</style>
