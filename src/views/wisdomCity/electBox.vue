<template>
    <div id="cesiumContainer1">
      <div id="cesiumContainer"></div>
      <div id="ThreeContainer"></div>
    </div>
  </template>
  <script>
  
    import * as Cesium from "cesium/Cesium";
    import * as THREE from "THREE";
    import widget from "cesium/Widgets/widgets.css";
    import "../../util/EchartsLayer";
    var minWGS84 = [115.23, 39.55];
    var maxWGS84 = [116.23, 41.55];
    var cesiumContainer;
    var ce
    var ThreeContainer;
    var _3Dobjects = []; //Could be any Three.js object mesh
    var three = {
      renderer: null,
      camera: null,
      scene: null,
    };
  
    var cesium = {
      viewer: null,
    };
  
    export default {
      props: {},
      data() {
        return {};
      },
      mounted() {
        const oScript = document.createElement('script');
        oScript.type = 'x-shader/x-vertex';
        oScript.id = 'vertex-shader';
        oScript.src = '//g.alicdn.com/sd/smartCaptcha/0.0.1/index.js';
        document.body.appendChild(oScript);
  
  
        this.main();
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
          let esri = new Cesium.ArcGisMapServerImageryProvider({
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
          });
          var googlemap = new Cesium.UrlTemplateImageryProvider(
            {
              url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&{x}&y={y}&z={z}&s=Gali'
            })
          cesium.viewer = new Cesium.Viewer("cesiumContainer", {
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
          });
          let center = Cesium.Cartesian3.fromDegrees(
            (minWGS84[0] + maxWGS84[0]) / 2,
            ((minWGS84[1] + maxWGS84[1]) / 2) - 1,
            200000
          );
          ce = center;
          cesium.viewer.camera.flyTo({
            destination: center,
            orientation: {
              heading: Cesium.Math.toRadians(0),
              pitch: Cesium.Math.toRadians(-60),
              roll: Cesium.Math.toRadians(0)
            },
            duration: 3
          });
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
          ThreeContainer.appendChild(three.renderer.domElement);
        },
        // 初始化两个库里的3d对象
        init3DObject() {
          //Cesium entity
  
          var entity = {
  
            name: 'Polygon',
  
            polygon: {
  
              hierarchy: Cesium.Cartesian3.fromDegreesArray([
  
                minWGS84[0], minWGS84[1],
  
                maxWGS84[0], minWGS84[1],
  
                maxWGS84[0], maxWGS84[1],
  
                minWGS84[0], maxWGS84[1],
  
              ]),
  
              material: Cesium.Color.RED.withAlpha(0)
  
            }
  
          };
  
          var Polygon = cesium.viewer.entities.add(entity);
  
          //Three.js Objects
  
          // Lathe geometry
  
          // var doubleSideMaterial = new THREE.MeshNormalMaterial({
  
          //   side: THREE.DoubleSide
  
          // });
  
          var doubleSideMaterial = this.getMaterial()
  
          var segments = 10;
  
          var points = [];
  
          for (var i = 0; i < segments; i++) {
  
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * segments + 5, (i - 5) * 2));
  
          }
  
          var geometry = new THREE.LatheGeometry(points);
          var geometry = new THREE.SphereBufferGeometry(15, 50, 50, 0, Math.PI * 2)
          var latheMesh = new THREE.Mesh(geometry, doubleSideMaterial);
  
          latheMesh.scale.set(1500, 1500, 1500); //scale object to be visible at planet scale
  
          latheMesh.position.z += 15.0; // translate "up" in Three.js space so the "bottom" of the mesh is the handle
  
          latheMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
  
          var latheMeshYup = new THREE.Group();
  
          latheMeshYup.add(latheMesh)
  
          three.scene.add(latheMeshYup); // don’t forget to add it to the Three.js scene manually
  
          //Assign Three.js object mesh to our object array
  
          var _3DOB = new _3DObject();
  
          _3DOB.threeMesh = latheMeshYup;
  
          _3DOB.minWGS84 = minWGS84;
  
          _3DOB.maxWGS84 = maxWGS84;
  
          _3Dobjects.push(_3DOB);
  
  
          function _3DObject() {
            this.threeMesh = null;
            this.minWGS84 = null;
            this.maxWGS84 = null;
          }
        },
        getMaterial() {
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
        createMaterial(vertexShader, fragmentShader) {
          var vertShader = `uniform float time;
    varying vec2 vUv;
  
  
    void main()
    {
    vec3 posChanged = position;
    posChanged.x = posChanged.x*(abs(sin(time*1.0)));
    posChanged.y = posChanged.y*(abs(cos(time*1.0)));
    posChanged.z = posChanged.z*(abs(sin(time*1.0)));
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position*(abs(sin(time)/2.0)+0.5),1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(posChanged,1.0);
    }`;
          var fragShader = `precision highp float;
    uniform float time;
    uniform float alpha;
    uniform vec2 resolution;
    varying vec2 vUv;
  
    void main2(void)
    {
    vec2 position = vUv;
    float red = 1.0;
    float green = 0.25 + sin(time) * 0.25;
    float blue = 0.0;
    vec3 rgb = vec3(red, green, blue);
    vec4 color = vec4(rgb, alpha);
    gl_FragColor = color;
    }
  
    #define PI 3.14159
    #define TWO_PI (PI*2.0)
    #define N 68.5
  
    void main(void)
    {
    vec2 center = (gl_FragCoord.xy);
    center.x=-10.12*sin(time/200.0);
    center.y=-10.12*cos(time/200.0);
  
    vec2 v = (gl_FragCoord.xy - resolution/20.0) / min(resolution.y,resolution.x) * 15.0;
    v.x=v.x-10.0;
    v.y=v.y-200.0;
    float col = 0.0;
  
    for(float i = 0.0; i < N; i++)
    {
    float a = i * (TWO_PI/N) * 61.95;
    col += cos(TWO_PI*(v.y * cos(a) + v.x * sin(a) + sin(time*0.004)*100.0 ));
    }
  
    col /= 5.0;
  
    gl_FragColor = vec4(col*1.0, -col*1.0,-col*4.0, 1.0);
    }`;
  
          var attributes = {};
          var uniforms = {
            time: { type: 'f', value: 0.2 },
            scale: { type: 'f', value: 0.2 },
            alpha: { type: 'f', value: 0.6 },
            resolution: { type: "v2", value: new THREE.Vector2() }
          };
  
          uniforms.resolution.value.x = window.innerWidth;
          uniforms.resolution.value.y = window.innerHeight;
  
          var meshMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            attributes: attributes,
            vertexShader: vertShader,
            fragmentShader: fragShader,
            transparent: true
  
          });
  
  
          return meshMaterial;
        },
        // 循环渲染
        loop() {
          requestAnimationFrame(this.loop);
          this.renderCesium();
          this.renderThreeObj();
        },
        renderCesium() {
          cesium.viewer.render();
        },
        renderThreeObj() {
          // register Three.js scene with Cesium
  
          three.camera.fov = Cesium.Math.toDegrees(cesium.viewer.camera.frustum.fovy) // ThreeJS FOV is vertical
  
          //three.camera.updateProjectionMatrix();
  
          var cartToVec = function (cart) {
  
            return new THREE.Vector3(cart.x, cart.y, cart.z);
  
          };
  
          // Configure Three.js meshes to stand against globe center position up direction
          _3Dobjects.forEach((item, id) => {
  
            minWGS84 = _3Dobjects[id].minWGS84;
  
            maxWGS84 = _3Dobjects[id].maxWGS84;
            
           
            // convert lat/long center position to Cartesian3
  
            var center = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2);
  
            // get forward direction for orienting model
  
            var centerHigh = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2, 1);
  
            // use direction from bottom left to top left as up-vector
  
            var bottomLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1]));
  
            var topLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));
  
            var latDir = new THREE.Vector3().subVectors(bottomLeft, topLeft).normalize();
  
            // configure entity position and orientation
  
            //debugger
  
            _3Dobjects[id].threeMesh.position.copy(center);
  
            //debugger;
  
            _3Dobjects[id].threeMesh.lookAt(centerHigh.x, centerHigh.y, centerHigh.z);
  
            _3Dobjects[id].threeMesh.up.copy(latDir);
            
            // if( _3Dobjects[id].threeMesh.children.length > 0){
            //   _3Dobjects[id].threeMesh.children.forEach(e1=>{
            //   e1.material.materials.forEach(function (e) {
            //       e.uniforms.time.value += 0.01;
            //   });
            // })
            // }
            _3Dobjects[id].threeMesh.children[0].material.uniforms.time.value += 0.01 
            console.log(    )
            
            
  
            // console.log(_3Dobjects[id].threeMesh)
  
          })
  
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