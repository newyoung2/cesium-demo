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


                var latheMesh = this.createMesh()
                // console.log(latheMesh)
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
            createMesh() {
                var ElectricShield = {
                    uniforms: {
                        time:{ value: 0 },
                        u_speed:{ value: 1 }, // 扩散速度
                        u_radius : { value: 100 }, // 扩散半径
                        u_width : { value: Math.PI / 2 },
                        hightColor : { value: new THREE.Color("#ff0000") }, // 扩散颜色
                    },
                    vertexShaderSource: `varying vec3 v_position;
                    void main() {
                        v_position = position;
                    }`,
                    fragmentShaderSource: `
                    float lerp (float x,float y,float t ) {
                        return ( 1.0 - t ) * x + t * y;
                    }
                    float distanceTo(vec2 src, vec2 dst) {
                        float dx = src.x - dst.x;
                        float dy = src.y - dst.y;
                        float dv = dx * dx + dy * dy;
                        return sqrt(dv);
                    }
                    float atan2(float y, float x){
                        float t0, t1, t2, t3, t4;
                        t3 = abs(x);
                        t1 = abs(y);
                        t0 = max(t3, t1);
                        t1 = min(t3, t1);
                        t3 = float(1) / t0;
                        t3 = t1 * t3;
                        t4 = t3 * t3;
                        t0 = -float(0.013480470);
                        t0 = t0 * t4 + float(0.057477314);
                        t0 = t0 * t4 - float(0.121239071);
                        t0 = t0 * t4 + float(0.195635925);
                        t0 = t0 * t4 - float(0.332994597);
                        t0 = t0 * t4 + float(0.999995630);
                        t3 = t0 * t3;
                        t3 = (abs(y) > abs(x)) ? float(1.570796327) - t3 : t3;
                        t3 = (x < 0.0) ?  float(3.141592654) - t3 : t3;
                        t3 = (y < 0.0) ? -t3 : t3;
                        return t3;
                    }
  
                    uniform vec3 hightColor;
                    uniform float u_speed;
                    uniform float u_radius;
                    uniform float u_width;
                    uniform float time;
                    varying vec3 v_position;
                    void main() {
                        float u_time = u_speed * time;
                    vec2 curr = vec2(v_position.x, v_position.z);
                    float vLength = distanceTo(vec2(5.0, 0.0), curr);
                    
                    float len = mod(u_time, u_radius);

                    float vOpacity = diffuseColor.a;
                    vec3 vColor = outgoingLight; 

                    float angle = atan2(v_position.x, v_position.z) + PI;
                    float angleT = mod(angle + u_time, PI2); 
                   
                    float length = distanceTo(vec2(0.0, 0.0), curr);

                    float d_opacity = 1.0 - angleT / PI * (PI / u_width);

                    if (length > u_radius) { d_opacity = 0.0; };
                    vec3 rColor = vec3(1.0, 1.0, 1.0);
                    if (d_opacity > 0.0) {
                        rColor = vec3(
                            lerp(vColor.r, hightColor.r, d_opacity),
                            lerp(vColor.g, hightColor.g, d_opacity),
                            lerp(vColor.b, hightColor.b, d_opacity)
                        );
                    }
                    gl_FragColor = vec4( vColor * rColor, d_opacity);}`,
                };
                let material = new THREE.ShaderMaterial({
                    uniforms: ElectricShield.uniforms,
                    vertexShader: ElectricShield.vertexShaderSource,
                    fragmentShader: ElectricShield.fragmentShaderSource,
                });

                let geometry = new THREE.CircleGeometry(1, 12000);
                return new THREE.Mesh(geometry, material)
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
                    // _3Dobjects[id].threeMesh.children[0].material.uniforms.time.value += 0.02
                    // console.log()



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