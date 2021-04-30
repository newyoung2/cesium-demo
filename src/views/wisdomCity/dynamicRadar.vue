<template>
    <div id="cesiumContainer1"></div>
</template>

<script>
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
                viewer.scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(121.41440447172941, 31.148724746744023, 75000)
                    //   destination: new Cesium.Cartesian3(-2852038.506894064, 4656753.071879653, 3286786.358214652),
                    //   orientation: {
                    //     heading: 0.4417702951554947,
                    //     pitch: -0.30187320702800813,
                    //   },
                });
                /* 雷达扫描线 */
                this.initData()


                /* 扩散扫描线 */
                var CartographicCenter = new Cesium.Cartographic(Cesium.Math.toRadians(121.41440447172941), Cesium.Math.toRadians(31.148724746744023), 1000);
                var scanColor = new Cesium.Color(0, 0, 1, 1);
                this.AddCircleScanPostStage(viewer, CartographicCenter, 10000, scanColor, 4000);

            },

            initData(longitude, latitude) {
                // 防止移动、放大缩小会视觉偏移depthTestAgainstTerrain 
                // 设置该属性为true之后，标绘将位于地形的顶部；如果设为false（默认值），那么标绘将位于平面上。缺陷：开启该属性有可能在切换图层时会引发标绘消失的bug。
                viewer.scene.globe.depthTestAgainstTerrain = true;
                // 定义经纬度
                var longitude = "121.41440447172941";
                var latitude = "31.148724746744023";
                // 雷达扫描中心（三维空间坐标）
                var geographySpace = new Cesium.Cartographic(Cesium.Math.toRadians(longitude), Cesium.Math.toRadians(latitude), 5000);
                // 扫描颜色
                var scanColor = new Cesium.Color(1.0, 0.0, 0.0, 1);
                // 持续时间 毫秒
                var duration = 4000;
                var radarRadius = 8000
                // 绘制平面雷达扫描线
                this.addRadarScanPostStage(geographySpace, radarRadius, scanColor, duration);
            },
            /*
              添加雷达扫描线 地形遮挡开启
              cartographicCenter 扫描中心【new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0);】
              radius  半径 米【1500】
              scanColor 扫描颜色【new Cesium.Color(1.0, 0.0, 0.0, 1)】
              duration 持续时间 毫秒【4000】
            */
            addRadarScanPostStage(cartographicCenter, radius, scanColor, duration) {
                console.log(cartographicCenter)
                /* // 彩色纹理
                uniform sampler2D colorTexture;
                // 深度纹理
                uniform sampler2D depthTexture;
                // 纹理坐标
                varying vec2 v_textureCoordinates;
                // 扫描中心
                uniform vec4 u_scanCenterEC;
                // 扫描平面法线EC
                uniform vec3 u_scanPlaneNormalEC;
                // 扫描线法线EC
                uniform vec3 u_scanLineNormalEC;
                // 半径
                uniform float u_radius;
                // 扫描的颜色
                uniform vec4 u_scanColor;
                vec4 toEye( in vec2 uv, infloat depth) {
                    vec2 xy = vec2((uv.x * 2.0 - 1.0), (uv.y * 2.0 - 1.0));
                    vec4 posInCamera = czm_inverseProjection * vec4(xy, depth, 1.0);
                    posInCamera = posInCamera / posInCamera.w;
                    return posInCamera;
                }
                bool isPointOnLineRight( in vec3 ptOnLine, invec3 lineNormal, invec3 testPt) {
                    vec3 v01 = testPt - ptOnLine;
                    normalize(v01);
                    vec3 temp = cross(v01, lineNormal);
                    float d = dot(temp, u_scanPlaneNormalEC);
                    return d > 0.5;
                }
                vec3 pointProjectOnPlane( in vec3 planeNormal, invec3 planeOrigin, invec3 point) {
                    vec3 v01 = point - planeOrigin;
                    float d = dot(planeNormal, v01);
                    return (point - planeNormal * d);
                }
                float distancePointToLine( in vec3 ptOnLine, invec3 lineNormal, invec3 testPt) {
                    vec3 tempPt = pointProjectOnPlane(lineNormal, ptOnLine, testPt);
                    return length(tempPt - ptOnLine);
                }
                float getDepth( in vec4 depth) {
                    float z_window = czm_unpackDepth(depth);
                    z_window = czm_reverseLogDepth(z_window);
                    float n_range = czm_depthRange.near;
                    float f_range = czm_depthRange.far;
                    return (2.0 * z_window - n_range - f_range) / (f_range - n_range);
                }
                void main() {
                    // 得到釉色 = 结构二维(彩色纹理,纹理坐标)
                    gl_FragColor = texture2D(colorTexture, v_textureCoordinates);
                    // 深度 = (釉色 = 结构二维(深度纹理,纹理坐标))
                    float depth = getDepth(texture2D(depthTexture, v_textureCoordinates));
                    // 视角 = (纹理坐标,深度)
                    vec4 viewPos = toEye(v_textureCoordinates, depth);
                    // 平面点投影 = (扫描平面法线,扫描中心,视角)
                    vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);
                    // 差值
                    float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);
                    // 直径 = 两个半径
                    float twou_radius = u_radius * 2.0;
                    if (dis < u_radius) {
                        float f0 = 1.0 - abs(u_radius - dis) / u_radius;
                        f0 = pow(f0, 64.0);
                        vec3 lineEndPt = vec3(u_scanCenterEC.xyz) + u_scanLineNormalEC * u_radius;
                        float f = 0.0;
                        if (isPointOnLineRight(u_scanCenterEC.xyz, u_scanLineNormalEC.xyz, prjOnPlane.xyz)) {
                            float dis1 = length(prjOnPlane.xyz - lineEndPt);
                            f = abs(twou_radius - dis1) / twou_radius;
                            f = pow(f, 3.0);
                        }
                        gl_FragColor = mix(gl_FragColor, u_scanColor, f + f0);
                    }
                } */
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
            }
            //----------------------------------------------------------------------------------------------
            //添加扫描线
            /*
     
        添加扫描线 depth关闭 
     
         viewer
     
         cartographicCenter 扫描中心
     
         maxRadius 最大半径 米
     
         scanColor 扫描颜色
     
         duration 持续时间 毫秒
     
         */

            , AddCircleScanPostStage(viewer, cartographicCenter, maxRadius, scanColor, duration) {

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