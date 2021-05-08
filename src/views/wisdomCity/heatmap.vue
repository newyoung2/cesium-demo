<template>
    <div id="cesiumContainer">
    </div>
</template>

<script>
    import * as Cesium from "cesium/Cesium";
    import h337 from "heatmap.js"
    import widget from "cesium/Widgets/widgets.css";
    // import util from '../../util/cesiumUtil'
    var viewer = null;
    var tileset = null;
    var handler = null


    export default {
        name: "load3DTiles",
        props: {},
        data() {
            return {

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
                let that = this
                /* 
                   初始化
                 */
                let viewerOption = {
                    infoBox: false,
                    selectionIndicator: false,
                    geocoder: false, // 地理位置查询定位控件
                    homeButton: false, // 默认相机位置控件
                    timeline: false, // 时间滚动条控件
                    navigationHelpButton: false, // 默认的相机控制提示控件
                    fullscreenButton: false, // 全屏控件
                    scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
                    baseLayerPicker: true, // 底图切换控件
                    animation: false, // 控制场景动画的播放速度控件
                    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                        url:
                            "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
                    }),
                };

                //使用ion数据   需要先申请token
                Cesium.Ion.defaultAccessToken =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY";
                viewer = new Cesium.Viewer("cesiumContainer", viewerOption);
                viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权

                // 第一个热力图
                var coordinate1 = [-109.0, 10.0, -80.0, 35.0];
                var heatMap1 = that.createHeatMap(that.getData(1000).max, that.getData(1000).data);
                that.createRectangle(viewer, coordinate1, heatMap1);

                // 第二个热力图
                var coordinate2 = [-109.0, 30.0, -80.0, 41.0];
                var heatMap2 = that.createHeatMap(that.getData(3000).max, that.getData(3000).data);
                 that.createRectangle(viewer, coordinate2, heatMap2);

                // 第三个热力图
                var coordinate3 = [-109.0, 41.0, -80.0, 50.0];
                var heatMap3 = that.createHeatMap(that.getData(5000).max, that.getData(5000).data);
                 that.createRectangle(viewer, coordinate3, heatMap3);


            },
            // 创建热力图
            createHeatMap(max, data) {
                // 创建元素
                var heatDoc = document.createElement("div");
                heatDoc.setAttribute("style", "width:1000px;height:1000px;margin: 0px;display: none;");
                document.body.appendChild(heatDoc);
                // 创建热力图对象
                var heatmap = h337.create({
                    container: heatDoc,
                    radius: 20,
                    maxOpacity: .5,
                    minOpacity: 0,
                    blur: .75,
                    gradient: {
                        '0.9': 'red',
                        '0.8': 'orange',
                        '0.7': 'yellow',
                        '0.5': 'blue',
                        '0.3': 'green',
                    },
                });
                // 添加数据
                heatmap.setData({
                    max: max,
                    data: data
                });
                return heatmap;
            },

            // 创建正方形 绑定热力图 
            createRectangle(viewer, coordinate, heatMap) {
                viewer.entities.add({
                    name: 'Rotating rectangle with rotating texture coordinate',
                    show: true,
                    rectangle: {
                        coordinates: Cesium.Rectangle.fromDegrees(coordinate[0], coordinate[1], coordinate[2], coordinate[3]),
                        material: heatMap._renderer.canvas // 核心语句，填充热力图
                    }
                });
            },
            // 生成len个随机数据
            getData(len) {
                //构建一些随机数据点
                var points = [];
                var max = 0;
                var width = 1000;
                var height = 1000;
                while (len--) {
                    var val = Math.floor(Math.random() * 1000);
                    max = Math.max(max, val);
                    var point = {
                        x: Math.floor(Math.random() * width),
                        y: Math.floor(Math.random() * height),
                        value: val
                    };
                    points.push(point);
                }
                return { max: max, data: points }
            },



        },
    };
</script>

<style scoped>
    #cesiumContainer {
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
</style>