<template>
  <div id="cesiumContainer1">
    <div id="cesiumContainer"></div>
    <div id="ThreeContainer"></div>
  </div>
</template>
<script>
  // import heatmap from "heatmap.js"
  import axios from "axios"
  import GPS from "./js/latlngChange.js"
  import * as THREE from "THREE";
  import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js';
  import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  var minWGS84 = [121.49, 31.26];
  var maxWGS84 = [122.49, 32.26];
  var cesiumContainer;
  var ce
  var ThreeContainer;
  var _3Dobjects = []; //Could be any Three.js object mesh
  var three = {
    renderer: null,
    camera: null,
    scene: null,
  };

  var viewer
  var cesium = {
    viewer: null,
  };

  export default {
    props: {},
    data() {
      return {
        controls: null,
        electBoxObj: null,
        lightLineObj: null,
        scanLineObj: null,
        rectObj: null,
        loadedGeometry: null,
        personMeshObj: null,
        publicPath: process.env.BASE_URL,
        shader2: {
          vs: `
		varying vec3 vPosition;
		void main(){
			vPosition=position;
			gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
          fs: `
		varying vec3 vPosition;
		uniform vec3 u_color;
		uniform float u_r;
		uniform float u_ring;

		void main(){
			float pct=distance(vec2(vPosition.x,vPosition.y),vec2(0.0));
			if(pct>u_r || pct<(u_r-u_ring)){
				gl_FragColor = vec4(1.0,0.0,0.0,0);
			}else{
				float dis=(pct-(u_r-u_ring))/(u_r-u_ring);
				gl_FragColor = vec4(u_color,dis);
			}
		}
	`,
        },
        shader1: {
          vs: ` varying vec2 vUv;
                void main() {
                  vUv = uv;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }`,
          fs: `
          varying vec2 vUv;
          uniform float time;
          vec3 hsb2rgb(const vec3 c) {
            vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0, 4.0, 2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
            rgb = rgb*rgb*(3.0-2.0*rgb);
            return c.z * mix( vec3(1.0), rgb, c.y);
          }
          void main() {
              // Normalized pixel coordinates (from 0 to 1)
            vec2 uv = vUv;
            vec2 p = 2.0*uv.xy - vec2(1., 1.) ; // center what being drawn
            float r = length(p) * 2.;
            vec3 color = hsb2rgb(vec3(0.24, 0.7, 0.5));
            float a = pow(r, 2.0);
            float b = sin(r * 0.8 - 1.6);
            float c = sin(r - 0.010);
            float s = sin(a - time * 3.0 + b) * c;
            color *= abs(1.0 / (s * 30.)) - 0.01;
            gl_FragColor = vec4(color, .4);
          }
          `
        },
      };
    },
    mounted() {


      this.main();
      // console.log(heatmap)
    },
    methods: {
      main() {
        //使用ion数据   需要先申请token
        Cesium.Ion.defaultAccessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMjY1MzY3MC1mYWIwLTQ2ZDItYTdlZi0yNWEyZjU2MjAzOTQiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3MzkxNX0.gGDAumUmOxcrCTMRfrKZJjfZpYiLxGwJwSLlkDYt9BY";

        cesiumContainer = document.getElementById("cesiumContainer");
        ThreeContainer = document.getElementById("ThreeContainer");

        this.initCesium(); // Initialize Cesium renderer
        this.initThree(); // Initialize Three.js renderer
        this.init3DObject(); // Initialize Three.js object mesh with Cesium Cartesian coordinate system
        this.loop(); // Looping renderer
      },
      // 初始化cesium
      initCesium() {
        cesium.viewer = new Cesium.Viewer("cesiumContainer", {
          useDefaultRenderLoop: false,
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
              "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
          }),
          baseLayerPicker: false,
        });

        /* 抗锯齿 */
        cesium.viewer.scene.fxaa = false
        cesium.viewer.scene.postProcessStages.fxaa.enabled = false;

        var supportsImageRenderingPixelated = cesium.viewer.cesiumWidget._supportsImageRenderingPixelated;
        if (supportsImageRenderingPixelated) {
          var vtxf_dpr = window.devicePixelRatio;
          while (vtxf_dpr >= 2.0) { vtxf_dpr /= 2.0; }
          cesium.viewer.resolutionScale = vtxf_dpr;
        }

        /* 开启深度检测 */
        cesium.viewer.scene.globe.depthTestAgainstTerrain = true;

        /*  */
        cesium.viewer.scene.camera.flyTo({
          destination: new Cesium.Cartesian3(-2852038.506894064, 4656753.071879653, 3286786.358214652),
          orientation: {
            heading: 0.4417702951554947,
            pitch: -0.30187320702800813,
          },
        });
        this.handlerEvent()
      },
      // 初始化three
      initThree() {
        let fov = 45;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let aspect = width / height;
        let near = 1;
        let far = 10 * 1000 * 1000; // needs to be far to support Cesium's world-scale rendering
        three.scene = new THREE.Scene();
        three.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        three.renderer = new THREE.WebGLRenderer({ alpha: true });
        // let axis=new THREE.AxesHelper(1000*1000*1000);
        // three.scene.add(axis);
        // this.controls = new OrbitControls(three.camera, three.renderer.domElement);
        ThreeContainer.appendChild(three.renderer.domElement);
      },
      // 初始化两个库里的3d对象
      init3DObject() {
        // //添加cesium对象
        this.ODLine()  //飞行轨迹线
        this.addWall()  //动态纹理墙壁
        this.addBuildings()   //建筑模型
        // this.addDynamicRadar()  //扩散雷达扫描线
        // this.addDynamicRadar1()  //扩散雷达扫描线


        // 添加three对象
        this.electBoxObj = this.addElectBox()  //能量罩
        this.scatterCircle()   //扩散圆
        this.lightLineObj = this.lightLine()  //竖直OD线条
        this.rectObj = this.addRectangular()   //旋转锥体
        // this.getSpireModel()  //加载ply模型  并转化为精灵材质
      },
      // 循环渲染
      loop() {
        requestAnimationFrame(this.loop);
        this.renderCesium();
        this.renderThreeObj();
      },
      // 循环渲染cesium
      renderCesium() {
        cesium.viewer.render();
      },
      // 循环渲染three
      renderThreeObj() {
        // register Three.js scene with Cesium

        three.camera.fov = Cesium.Math.toDegrees(cesium.viewer.camera.frustum.fovy) // ThreeJS FOV is vertical

        // Configure Three.js meshes to stand against globe center position up direction
        // if (_3Dobjects.length > 0) {
        //   _3Dobjects.forEach((item, id) => {
        //     _3Dobjects[id].threeMesh.material.uniforms.time.value += 0.01

        //   })
        // }

        // 渲染3d对象*******************************************************
        // this.controls.update();
        // 能量罩
        this.electBoxObj ? this.electBoxObj.material.uniforms.time.value += 0.01 : ''

        // 线条
        if (this.lightLineObj) {
          this.lightLineObj.children.forEach(e => {
            e.material.map.offset.x -= 0.002
          })
        }

        // 四棱锥;
        if (this.rectObj) {
          this.rectObj.children.forEach(e => {
            e.rotation.x += 0.04
            e.rotation.y += 0.04
            e.rotation.z += 0.04
          })

        }


        if (this.personMeshObj) {
          // this.personMeshObj.rotation.x += 0.04
          // console.log(this.personMeshObj.rotation.x)
          this.personMeshObj.rotation.y += 0.04
        }
        // this.personMeshObj?this.personMeshObj.rotation.x += 0.04:''
        // Clone Cesium Camera projection position so the

        // Three.js Object will appear to be at the same place as above the Cesium Globe

        three.camera.matrixAutoUpdate = false;

        var cvm = cesium.viewer.camera.viewMatrix;

        var civm = cesium.viewer.camera.inverseViewMatrix;

        three.camera.lookAt(0, 0, 0);

        three.camera.matrixWorld.set(

          civm[0], civm[4], civm[8], civm[12],

          civm[1], civm[5], civm[9], civm[13],

          civm[2], civm[6], civm[10], civm[14],

          civm[3], civm[7], civm[11], civm[15]

        );

        three.camera.matrixWorldInverse.set(

          cvm[0], cvm[4], cvm[8], cvm[12],

          cvm[1], cvm[5], cvm[9], cvm[13],

          cvm[2], cvm[6], cvm[10], cvm[14],

          cvm[3], cvm[7], cvm[11], cvm[15]

        );



        var width = ThreeContainer.clientWidth;

        var height = ThreeContainer.clientHeight;

        var aspect = width / height;

        three.camera.aspect = aspect;

        three.camera.updateProjectionMatrix();

        three.renderer.setSize(width, height);

        three.renderer.clear();

        three.renderer.render(three.scene, three.camera);

      },
      // 点击事件
      handlerEvent() {
        cesium.handler = new Cesium.ScreenSpaceEventHandler(cesium.viewer.scene.canvas);　　//定义事件
        cesium.handler.setInputAction(function (movement) {

          // var posiPoint = cesium.scene.pickPosition(movement.position);
          // console.log(posiPoint)

          var cartesian = cesium.viewer.scene.pickPosition(movement.position);

          /* 将笛卡尔坐标转换为经纬度坐标 */
          let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          let longitude = Cesium.Math.toDegrees(cartographic.longitude);
          let latitude = Cesium.Math.toDegrees(cartographic.latitude);
          let height = cartographic.height;
          console.log(cartesian)
          console.log(longitude, latitude)

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      },
      // 添加建筑-----------------------------------------------
      addBuildings() {

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
          maximumScreenSpaceError: 4,
          maximumNumberOfLoadedTiles: 1000,
        });
        cesium.viewer.scene.primitives.add(tileset);

        tileset.readyPromise
          .then(function (tileset) {
            // console.log(tileset)
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




          })
          .otherwise(function (error) {
            throw error;
          });

      },
      // 能量罩----------------------------------------------
      addElectBox() {
        let minWGS84 = [121.49357551781992, 31.2536386621873]
        var maxWGS84 = [121.49358551781992, 31.2536486621873];
        var doubleSideMaterial = this.getElectBoxMaterial()
        var geometry = new THREE.SphereBufferGeometry(750, 50, 50, 0, Math.PI)
        var threeMesh = new THREE.Mesh(geometry, doubleSideMaterial);
        three.scene.add(threeMesh);
        let res = {
          threeMesh,
          minWGS84,
          maxWGS84
        }

        _3Dobjects.push(res);
        this.setThreeObjPosition(res)
        return threeMesh

      },
      // 能量罩材质
      getElectBoxMaterial() {
        var ElectricShield = {
          uniforms: {
            time: {
              type: "f",
              value: 0,
            },
            color: {
              type: "c",
              value: new THREE.Color("red"),
            },
            opacity: {
              type: "f",
              value: 1,
            },
          },
          vertexShaderSource: "\n  precision lowp float;\n  precision lowp int;\n  "
            .concat(
              THREE.ShaderChunk.fog_pars_vertex,
              "\n  varying vec2 vUv;\n  void main() {\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    "
            )
            .concat(THREE.ShaderChunk.fog_vertex, "\n  }\n"),
          fragmentShaderSource: `
                    #if __VERSION__ == 100
                     #extension GL_OES_standard_derivatives : enable
                    #endif
                    uniform vec3 color;
                    uniform float opacity;
                    uniform float time;
                    varying vec2 vUv;
                    #define pi 3.1415926535
                    #define PI2RAD 0.01745329252
                    #define TWO_PI (2. * PI)
                    float rands(float p){
                        return fract(sin(p) * 10000.0);
                    }
                    float noise(vec2 p){
                        float t = time / 20000.0;
                        if(t > 1.0) t -= floor(t);
                        return rands(p.x * 14. + p.y * sin(t) * 0.5);
                    }
                    vec2 sw(vec2 p){
                        return vec2(floor(p.x), floor(p.y));
                    }
                    vec2 se(vec2 p){
                        return vec2(ceil(p.x), floor(p.y));
                    }
                    vec2 nw(vec2 p){
                        return vec2(floor(p.x), ceil(p.y));
                    }
                    vec2 ne(vec2 p){
                        return vec2(ceil(p.x), ceil(p.y));
                    }
                    float smoothNoise(vec2 p){
                        vec2 inter = smoothstep(0.0, 1.0, fract(p));
                        float s = mix(noise(sw(p)), noise(se(p)), inter.x);
                        float n = mix(noise(nw(p)), noise(ne(p)), inter.x);
                        return mix(s, n, inter.y);
                    }
                    float fbm(vec2 p){
                        float z = 2.0;
                        float rz = 0.0;
                        vec2 bp = p;
                        for(float i = 1.0; i < 6.0; i++){
                        rz += abs((smoothNoise(p) - 0.5)* 2.0) / z;
                        z *= 2.0;
                        p *= 2.0;
                        }
                        return rz;
                    }
                    void main() {
                        vec2 uv = vUv;
                        vec2 uv2 = vUv;
                        if (uv.y < 0.5) {
                        discard;
                        }
                        uv *= 4.;
                        float rz = fbm(uv);
                        uv /= exp(mod(time * 2.0, pi));
                        rz *= pow(15., 0.9);
                        gl_FragColor = mix(vec4(color, opacity) / rz, vec4(color, 0.1), 0.2);
                        if (uv2.x < 0.05) {
                        gl_FragColor = mix(vec4(color, 0.1), gl_FragColor, uv2.x / 0.05);
                        }
                        if (uv2.x > 0.95){
                        gl_FragColor = mix(gl_FragColor, vec4(color, 0.1), (uv2.x - 0.95) / 0.05);
                        }
                    }`,
        };
        let material = new THREE.ShaderMaterial({
          uniforms: ElectricShield.uniforms,
          defaultAttributeValues: {},
          vertexShader: ElectricShield.vertexShaderSource,
          fragmentShader: ElectricShield.fragmentShaderSource,
          blending: THREE.AdditiveBlending,
          depthWrite: !1,
          depthTest: !0,
          side: THREE.DoubleSide,
          transparent: !0,
        });
        return material;
      },
      // --设置three对象位置-----------------------------------------
      setThreeObjPosition(param, height = 0) {
        var cartToVec = function (cart) {

          return new THREE.Vector3(cart.x, cart.y, cart.z);

        };
        let minWGS84 = param.minWGS84;

        let maxWGS84 = param.maxWGS84;


        // convert lat/long center position to Cartesian3

        var center = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2, height);

        // get forward direction for orienting model

        var centerHigh = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2, 1);

        // use direction from bottom left to top left as up-vector

        var bottomLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1]));

        var topLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));

        var latDir = new THREE.Vector3().subVectors(bottomLeft, topLeft).normalize();

        // configure entity position and orientation

        //debugger

        param.threeMesh.position.copy(center);

        //debugger;

        param.threeMesh.lookAt(centerHigh.x, centerHigh.y, centerHigh.z);

        param.threeMesh.up.copy(latDir);

      },
      // 扩散圆环
      scatterCircle(r = 1, init = 0.1, ring = 0.3, color = new THREE.Vector3(0, 1, 1), speed = 0.01) {
        // 1, 0.1, 0.3, new THREE.Vector3(0, 1, 1), 0.02
        let minWGS84 = [121.54052017329961, 31.278092509941782]
        var maxWGS84 = [121.54053017329961, 31.278102509941782];
        var uniform = {
          time: { value: 0 },
          u_color: { value: color },
          u_r: { value: init },
          u_ring: {
            value: ring,
          },
        };

        var vs = this.shader2.vs;
        var fs = this.shader2.fs;
        const geometry = new THREE.CircleGeometry(r, 12000);
        var material = new THREE.ShaderMaterial({
          vertexShader: vs,
          fragmentShader: fs,
          side: THREE.DoubleSide,
          uniforms: uniform,
          transparent: true,
          depthWrite: false,
        });
        let circle = new THREE.Mesh(geometry, material);
        circle.scale.set(2000, 2000, 2000);
        three.scene.add(circle);
        let res = {
          threeMesh: circle,
          minWGS84,
          maxWGS84
        }
        this.setThreeObjPosition(res)

        function render() {
          uniform.time.value += 0.01;
          // console.log(uniform.time)
          uniform.u_r.value += speed || 0.1;
          if (uniform.u_r.value >= r) {
            uniform.u_r.value = init;
          }
          requestAnimationFrame(render);
        }
        render();

        return circle;
      },
      // OD线基于three
      lightLine() {
        let minWGS84 = [121.49971003569267, 31.239999873637704]
        var maxWGS84 = [121.49972003569267, 31.240009873637704];
        let texture = new THREE.TextureLoader().load(`${this.publicPath}texture/line.png`)
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
        texture.repeat.set(1, 1)
        texture.needsUpdate = true
        texture.offset.x = 0.5


        let material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
          transparent: true
        })

        // 创建顶点数组

        let points = [
          [121.48202749938409, 31.221985479874512],
          [121.47794413604615, 31.26901625975226],
          [121.49874265570466, 31.20666485501269],
          [121.54108827427831, 31.33233924309932],
          [121.63422440576947, 31.273286637545194]
        ]


        var group = new THREE.Group();

        points.forEach(e => {
          // CatmullRomCurve3创建一条平滑的三维样条曲线
          let curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 100)]) // 曲线路径

          // 创建管道
          let tubeGeometry = new THREE.TubeGeometry(curve, 80, 0.1)

          let mesh = new THREE.Mesh(tubeGeometry, material);
          mesh.scale.set(150, 150, 150)
          let res = {
            threeMesh: mesh,
            minWGS84: e,
            maxWGS84: e
          }
          this.setThreeObjPosition(res)

          group.add(mesh)
        })

        three.scene.add(group);


        return group
      },
      // od线基于cesium
      ODLine() {
        let arr = [
          [121.49872890304215, 31.23811931903695, 0, 121.49580735943334, 31.23691516337262, 700, 121.49013735991807, 31.232977794178908, 0],
          [121.49872890304215, 31.23811931903695, 0, 121.49487614748442, 31.24249621923281, 1000, 121.48997152310628, 31.249634173869836, 0],
          [121.49872890304215, 31.23811931903695, 0, 121.51801026944386, 31.257804203980925, 1100, 121.53994551468021, 31.27774008101418, 0],
          [121.49872890304215, 31.23811931903695, 0, 121.50689406570945, 31.235675335659597, 900, 121.51360824805317, 31.2318641147962, 0],
          [121.49872890304215, 31.23811931903695, 0, 121.52799172213003, 31.235268840934545, 800, 121.55710892258877, 31.227136256013686, 0],
        ]

        arr.forEach(e => {
          /* 因为cesium polyline不支持插值计算    所以先通过HermiteSpline计算出插值点  再根据计算出的插值点绘制polyline   就可得到弯曲平滑的线段 */
          let controls = Cesium.Cartesian3.fromDegreesArrayHeights(e);

          var spline = Cesium.HermiteSpline.createNaturalCubic({
            times: [0.0, 0.5, 1],
            points: controls,
          });

          var positions = [];
          // 分成500份  分数越多越平滑
          for (let i = 0; i <= 500; i++) {
            let cartesian3 = spline.evaluate(i / 500);
            positions.push(cartesian3);
          }

          /* 根据数据绘制od线 */
          // let a = new Cesium.PolylineTrailLinkMaterialProperty(null, 3000)
          // let Material = new Cesium.PolylineTrailLinkMaterialProperty(null, 3000)
          // console.log(Material)
          // Cesium.Material.PolylineTrailLinkImage = `${this.publicPath}texture/line.png`;
          cesium.viewer.entities.add({
            name: 'PolylineTrail',
            polyline: {
              positions: positions,
              width: 8,
              arcType: Cesium.ArcType.NONE,
              material: new Cesium.PolylineTrailLinkMaterialProperty(null, 3000)
            }
          });
        })


      },
      scanLine() {

        let position = [121.49040423094851, 31.24897428717897,
          121.50983593820013, 31.24146639073815,
          121.50409158799692, 31.231264816442277,
          121.48497930661024, 31.23775660317917]

        let instance = new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArray(position)
            ),
            extrudedHeight: 10000000,//e.height
            height: -100,
            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
          })
        })
        var primitive = new Cesium.GroundPrimitive({
          geometryInstances: instance,
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: true
          }),
          classificationType: Cesium.ClassificationType.BOTH,	// 支持类型： 地形、3DTile、或者在地面上
          show: true
        });
        cesium.viewer.scene.primitives.add(primitive)
        return instance


      },
      codeLine() {
        let arr = [
          [121.49013735991807, 31.232977794178908, 0, 121.49013735991807, 31.232977794178908, 10000],
          [121.48997152310628, 31.249634173869836, 0, 121.48997152310628, 31.249634173869836, 10000],
          [121.53994551468021, 31.27774008101418, 0, 121.53994551468021, 31.27774008101418, 10000],
          [121.51360824805317, 31.2318641147962, 0, 121.51360824805317, 31.2318641147962, 10000],
          [121.55710892258877, 31.227136256013686, 0, 121.55710892258877, 31.227136256013686, 10000],
        ]
        let obj = null
        arr.map(e => {
          let controls = Cesium.Cartesian3.fromDegreesArrayHeights(e);
          obj = cesium.viewer.entities.add({
            name: 'PolylineTrail1',
            polyline: {
              positions: controls,
              width: 20,
              material: new Cesium.PolylineTrailLinkMaterialProperty(null, 3000)
            }
          });
        })
        // obj.polyline.material.image = 'https://img1.baidu.com/it/u=897925879,2799566943&fm=26&fmt=auto&gp=0.jpg'
        // console.log(obj)
      },
      // 流动纹理墙
      addWall() {
        let arr = [121.53415988151373, 31.240442807182433, 200.0,
          121.54519435235682, 31.238860691269554, 200.0,
          121.54158670353141, 31.231993151255345, 200.0,
          121.53134619657078, 31.23454218401985, 200.0,
          121.53415988151373, 31.240442807182433, 200.0]
        // Cesium.Material.PolylineTrailLinkImage = `${this.publicPath}texture/line.png`;
        let entity = cesium.viewer.entities.add({
          name: 'WallTrail',
          wall: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(arr),
            material: new Cesium.PolylineTrailLinkMaterialProperty(null, 9000, `https://img1.baidu.com/it/u=897925879,2799566943&fm=26&fmt=auto&gp=0.jpg`)
          }
        });
        console.log(entity)
        // entity.material.uniforms.image = `${this.publicPath}texture/line.png`
      },
      // 添加旋转额锥体
      addRectangular() {
        // let minWGS84 = [121.49971003569267, 31.239999873637704]
        // var maxWGS84 = [121.49972003569267, 31.240009873637704];
        let position = [{ size: 100, height: 600, minWGS84: [121.50795727975197, 31.234456423634083], maxWGS84: [121.50795727975197, 31.234456423634083] },
        { size: 50, height: 100, minWGS84: [121.48605154398815, 31.237722800606136], maxWGS84: [121.48605154398815, 31.237722800606136] },
        { size: 30, height: 50, minWGS84: [121.51615528314545, 31.235612061143307], maxWGS84: [121.51615528314545, 31.235612061143307] },
          // {height:100,minWGS84: [121.48412901708002,31.238122873786033],maxWGS84:[121.48412901708002,31.238122873786033]}
        ]

        var material = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 });
        var material2 = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });

        var group = new THREE.Group();
        position.forEach(e => {
          var geometry = new THREE.TetrahedronGeometry(e.size);
          var rectMesh = new SceneUtils.createMultiMaterialObject(geometry, [material, material2])  //融合材质
          let res = {
            threeMesh: rectMesh,
            minWGS84: e.minWGS84,
            maxWGS84: e.maxWGS84
          }
          this.setThreeObjPosition(res, e.height)
          group.add(rectMesh)
        })

        three.scene.add(group);

        return group
      },
      getSpireModel() {
        let minWGS84 = [121.49971003569267, 31.239999873637704]
        var maxWGS84 = [121.49972003569267, 31.240009873637704];
        let that = this
        that.manager = new THREE.LoadingManager();
        new PLYLoader(that.manager).load(
          `${that.publicPath}model/Lucy100k.ply`,
          function (geometry) {
            //   geometry.computeVertexNormals();

            that.loadedGeometry = geometry.clone();
            geometry.computeVertexNormals();

            let material = new THREE.PointsMaterial({
              color: 0xffffff,
              size: 3,
              transparent: true,
              blending: THREE.AdditiveBlending,
              map: that.generateSprite(),
            });
            let personMesh = new THREE.Points(geometry, material);
            personMesh.sortParticles = true;

            let res = {
              threeMesh: personMesh,
              minWGS84: minWGS84,
              maxWGS84: maxWGS84
            }
            that.setThreeObjPosition(res, 500)
            personMesh.scale.set(0.5, 0.5, 0.5)
            personMesh.rotation.x = 0
            personMesh.rotation.y = 0
            personMesh.rotation.z = 0
            three.scene.add(personMesh);
            that.personMeshObj = personMesh
            return personMesh
          }
        );

      },
      generateSprite() {
        var canvas = document.createElement("canvas");
        canvas.width = 16;
        canvas.height = 16;

        var context = canvas.getContext("2d");
        var gradient = context.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2
        );
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(255,255,0,1)");
        gradient.addColorStop(0.4, "rgba(0,0,64,1)");
        gradient.addColorStop(1, "rgba(0,0,0,1)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
      },
      /* 加载gltf模型 */
      addPlaneModel() {
        let dronePromise = Cesium.CzmlDataSource.load(
          "Source/SampleData/load.czml"
        );

        //   viewer.zoomTo(dronePromise)
        dronePromise.then(function (dataSource) {

          cesium.viewer.dataSources.add(dataSource);
          // 使用id获取在CZML 数据中定义的无人机entity
          drone = dataSource.entities.getById("Aircraft/Aircraft1");
          console.log(drone)
          // drone.position = new Cartesian3({x:-2851901.1585062477,y: 4653862.8234637035,z:3288760.922783564})
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
      // 路网模块***********************************************************************************
      addGeoJson() {
        var positions = []
        axios.get('./Data/shanghaiload.json').then(res => {


          res.data.geometries.map(e => {
            let arr = []
            e.coordinates.map(e1 => {
              let r = GPS.gcj_encrypt(e1[0], e1[1])
              arr.push(r.lat)
              arr.push(r.lon)
            })
            positions.push(arr)
          })

          positions.map(e => {
            cesium.viewer.entities.add({
              name: 'PolylineTrail',
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(e),
                width: 8,
                arcType: Cesium.ArcType.NONE,
                material: new Cesium.PolylineGlowMaterialProperty({
                  glowPower: 0.3,
                  color: Cesium.Color.BLUE.withAlpha(0.3),

                })
              }
            });
          })


        })
      },
      // 扩散雷达扫描线 ***********************************************
      addDynamicRadar() {
        var CartographicCenter = new Cesium.Cartographic(Cesium.Math.toRadians(121.49872890304215), Cesium.Math.toRadians(31.23811931903695), 1000);
        var scanColor = new Cesium.Color(0, 0, 1, 1);
        this.AddCircleScanPostStage(cesium.viewer, CartographicCenter, 10000, scanColor, 4000);
      },
      AddCircleScanPostStage(viewer, cartographicCenter, maxRadius, scanColor, duration) {

        var ScanSegmentShader =

          "uniform sampler2D colorTexture;\n" +

          "uniform sampler2D depthTexture;\n" +

          "varying vec2 v_textureCoordinates;\n" +

          "uniform vec4 u_scanCenterEC;\n" +

          "uniform vec3 u_scanPlaneNormalEC;\n" +

          "uniform float u_radius;\n" +

          "uniform vec4 u_scanColor;\n" +

          "vec4 toEye(in vec2 uv, in float depth)\n" +

          " {\n" +

          " vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n" +

          " vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n" +

          " posInCamera =posInCamera / posInCamera.w;\n" +

          " return posInCamera;\n" +

          " }\n" +

          "vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point)\n" +

          "{\n" +

          "vec3 v01 = point -planeOrigin;\n" +

          "float d = dot(planeNormal, v01) ;\n" +

          "return (point - planeNormal * d);\n" +

          "}\n" +

          "float getDepth(in vec4 depth)\n" +

          "{\n" +

          "float z_window = czm_unpackDepth(depth);\n" +

          "z_window = czm_reverseLogDepth(z_window);\n" +

          "float n_range = czm_depthRange.near;\n" +

          "float f_range = czm_depthRange.far;\n" +

          "return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n" +

          "}\n" +

          "void main()\n" +

          "{\n" +

          "gl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n" +

          "float depth = getDepth( texture2D(depthTexture, v_textureCoordinates));\n" +

          "vec4 viewPos = toEye(v_textureCoordinates, depth);\n" +

          "vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);\n" +

          "float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n" +

          "if(dis < u_radius)\n" +

          "{\n" +

          "float f = 1.0 -abs(u_radius - dis) / u_radius;\n" +

          "f = pow(f, 4.0);\n" +

          "gl_FragColor = mix(gl_FragColor, u_scanColor, f);\n" +

          "}\n" +

          "}\n";

        var _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter);

        var _Cartesian4Center = new Cesium.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1);

        var _CartographicCenter1 = new Cesium.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500);

        var _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartographicCenter1);

        var _Cartesian4Center1 = new Cesium.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1);

        var _time = (new Date()).getTime();

        var _scratchCartesian4Center = new Cesium.Cartesian4();

        var _scratchCartesian4Center1 = new Cesium.Cartesian4();

        var _scratchCartesian3Normal = new Cesium.Cartesian3();

        var ScanPostStage = new Cesium.PostProcessStage({

          fragmentShader: ScanSegmentShader,

          uniforms: {

            u_scanCenterEC: function () {

              return Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);

            },

            u_scanPlaneNormalEC: function () {

              var temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);

              var temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1);

              _scratchCartesian3Normal.x = temp1.x - temp.x;

              _scratchCartesian3Normal.y = temp1.y - temp.y;

              _scratchCartesian3Normal.z = temp1.z - temp.z;

              Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal);

              return _scratchCartesian3Normal;

            },

            u_radius: function () {

              return maxRadius * (((new Date()).getTime() - _time) % duration) / duration;

            },

            u_scanColor: scanColor

          }

        });

        viewer.scene.postProcessStages.add(ScanPostStage);

      },
      addDynamicRadar1() {
        // 定义经纬度
        var longitude = "121.60142353971058";
        var latitude = "31.23530433597591";
        // 雷达扫描中心（三维空间坐标）
        var geographySpace = new Cesium.Cartographic(Cesium.Math.toRadians(longitude), Cesium.Math.toRadians(latitude), 500);
        // 扫描颜色
        var scanColor = new Cesium.Color(0.0, 2.0, 1.0, 1);
        // 持续时间 毫秒
        var duration = 4000;
        var radarRadius = 4000
        // 绘制平面雷达扫描线
        this.addRadarScanPostStage(cesium.viewer, geographySpace, radarRadius, scanColor, duration);
      },

      /*
              添加雷达扫描线 地形遮挡开启
              cartographicCenter 扫描中心【new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0);】
              radius  半径 米【1500】
              scanColor 扫描颜色【new Cesium.Color(1.0, 0.0, 0.0, 1)】
              duration 持续时间 毫秒【4000】
            */
      addRadarScanPostStage(viewer, cartographicCenter, radius, scanColor, duration) {

        var ScanSegmentShader =
          "uniform sampler2D colorTexture;\n" +
          "uniform sampler2D depthTexture;\n" +
          "varying vec2 v_textureCoordinates;\n" +
          "uniform vec4 u_scanCenterEC;\n" +
          "uniform vec3 u_scanPlaneNormalEC;\n" +
          "uniform vec3 u_scanLineNormalEC;\n" +
          "uniform float u_radius;\n" +
          "uniform vec4 u_scanColor;\n" +

          "vec4 toEye(in vec2 uv, in float depth)\n" +
          " {\n" +
          " vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n" +
          " vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n" +
          " posInCamera =posInCamera / posInCamera.w;\n" +
          " return posInCamera;\n" +
          " }\n" +

          "bool isPointOnLineRight(in vec3 ptOnLine, in vec3 lineNormal, in vec3 testPt)\n" +
          "{\n" +
          "vec3 v01 = testPt - ptOnLine;\n" +
          "normalize(v01);\n" +
          "vec3 temp = cross(v01, lineNormal);\n" +
          "float d = dot(temp, u_scanPlaneNormalEC);\n" +
          "return d > 0.5;\n" +
          "}\n" +

          "vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point)\n" +
          "{\n" +
          "vec3 v01 = point -planeOrigin;\n" +
          "float d = dot(planeNormal, v01) ;\n" +
          "return (point - planeNormal * d);\n" +
          "}\n" +

          "float distancePointToLine(in vec3 ptOnLine, in vec3 lineNormal, in vec3 testPt)\n" +
          "{\n" +
          "vec3 tempPt = pointProjectOnPlane(lineNormal, ptOnLine, testPt);\n" +
          "return length(tempPt - ptOnLine);\n" +
          "}\n" +

          "float getDepth(in vec4 depth)\n" +
          "{\n" +
          "float z_window = czm_unpackDepth(depth);\n" +
          "z_window = czm_reverseLogDepth(z_window);\n" +
          "float n_range = czm_depthRange.near;\n" +
          "float f_range = czm_depthRange.far;\n" +
          "return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n" +
          "}\n" +

          "void main()\n" +
          "{\n" +
          "gl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n" +
          "float depth = getDepth( texture2D(depthTexture, v_textureCoordinates));\n" +
          "vec4 viewPos = toEye(v_textureCoordinates, depth);\n" +
          "vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);\n" +
          "float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n" +
          "float twou_radius = u_radius * 2.0;\n" +
          "if(dis < u_radius)\n" +
          "{\n" +
          "float f0 = 1.0 -abs(u_radius - dis) / u_radius;\n" +
          "f0 = pow(f0, 64.0);\n" +
          "vec3 lineEndPt = vec3(u_scanCenterEC.xyz) + u_scanLineNormalEC * u_radius;\n" +
          "float f = 0.0;\n" +
          "if(isPointOnLineRight(u_scanCenterEC.xyz, u_scanLineNormalEC.xyz, prjOnPlane.xyz))\n" +
          "{\n" +
          "float dis1= length(prjOnPlane.xyz - lineEndPt);\n" +
          "f = abs(twou_radius -dis1) / twou_radius;\n" +
          "f = pow(f, 3.0);\n" +
          "}\n" +
          "gl_FragColor = mix(gl_FragColor, u_scanColor, f + f0);\n" +
          "}\n" +
          "}\n";

        var _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter);
        var _Cartesian4Center = new Cesium.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1);

        var _CartographicCenter1 = new Cesium.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500);
        var _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartographicCenter1);
        var _Cartesian4Center1 = new Cesium.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1);

        var _CartographicCenter2 = new Cesium.Cartographic(cartographicCenter.longitude + Cesium.Math.toRadians(0.001), cartographicCenter.latitude, cartographicCenter.height);
        var _Cartesian3Center2 = Cesium.Cartographic.toCartesian(_CartographicCenter2);
        var _Cartesian4Center2 = new Cesium.Cartesian4(_Cartesian3Center2.x, _Cartesian3Center2.y, _Cartesian3Center2.z, 1);
        var _RotateQ = new Cesium.Quaternion();
        var _RotateM = new Cesium.Matrix3();

        var _time = (new Date()).getTime();

        var _scratchCartesian4Center = new Cesium.Cartesian4();
        var _scratchCartesian4Center1 = new Cesium.Cartesian4();
        var _scratchCartesian4Center2 = new Cesium.Cartesian4();
        var _scratchCartesian3Normal = new Cesium.Cartesian3();
        var _scratchCartesian3Normal1 = new Cesium.Cartesian3();

        var ScanPostStage = new Cesium.PostProcessStage({
          fragmentShader: ScanSegmentShader,
          uniforms: {
            u_scanCenterEC: function () {
              return Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
            },
            u_scanPlaneNormalEC: function () {
              var temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
              var temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1);
              _scratchCartesian3Normal.x = temp1.x - temp.x;
              _scratchCartesian3Normal.y = temp1.y - temp.y;
              _scratchCartesian3Normal.z = temp1.z - temp.z;

              Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal);
              return _scratchCartesian3Normal;
            },
            u_radius: radius,
            u_scanLineNormalEC: function () {
              var temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
              var temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1);
              var temp2 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center2, _scratchCartesian4Center2);

              _scratchCartesian3Normal.x = temp1.x - temp.x;
              _scratchCartesian3Normal.y = temp1.y - temp.y;
              _scratchCartesian3Normal.z = temp1.z - temp.z;

              Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal);

              _scratchCartesian3Normal1.x = temp2.x - temp.x;
              _scratchCartesian3Normal1.y = temp2.y - temp.y;
              _scratchCartesian3Normal1.z = temp2.z - temp.z;

              var tempTime = (((new Date()).getTime() - _time) % duration) / duration;
              Cesium.Quaternion.fromAxisAngle(_scratchCartesian3Normal, tempTime * Cesium.Math.PI * 2, _RotateQ);
              Cesium.Matrix3.fromQuaternion(_RotateQ, _RotateM);
              Cesium.Matrix3.multiplyByVector(_RotateM, _scratchCartesian3Normal1, _scratchCartesian3Normal1);
              Cesium.Cartesian3.normalize(_scratchCartesian3Normal1, _scratchCartesian3Normal1);
              return _scratchCartesian3Normal1;
            },
            u_scanColor: scanColor
          }
        });

        viewer.scene.postProcessStages.add(ScanPostStage);
      },

    },
  };
</script>

<style scoped>
  #cesiumContainer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    font-family: sans-serif;
  }

  #ThreeContainer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    font-family: sans-serif;
    pointer-events: none;
  }

  .fullWindow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    font-family: sans-serif;
  }

  /* .loadingIndicator {
              display: block;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -33px;
              margin-left: -33px;
              width: 66px;
              height: 66px;
              background-position: center;
              background-repeat: no-repeat;
              background-image: url(Images/ajax-loader.gif);
          } */
</style>