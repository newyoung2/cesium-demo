<template>
    <div id="cesiumContainer">
        <div class="tool-box">
            <el-radio-group v-model="radio" @change="radioChange" size="mini">
                <el-radio-button label="population_intervals"></el-radio-button>
                <el-radio-button label="population_sampled"></el-radio-button>
              </el-radio-group>
        </div>

    </div>
</template>

<script>
    import * as Cesium from "cesium/Cesium";
    import * as turf from '@turf/turf'
    import widget from "cesium/Widgets/widgets.css";
    // import util from '../../util/cesiumUtil'
    var viewer = null;
    let scene
    var handler = null
    var dataSource

    var ldCollection
    export default {
        name: "load3DTiles",
        props: {},
        data() {
            return {
                radio:'population_sampled',
                czml: [
                    {
                        id: "document",
                        name: "CZML Custom Properties",
                        version: "1.0",
                        clock: {
                            interval: "1970/2010",
                            currentTime: "1970",
                            multiplier: 500000000,
                        },
                    },
                    {
                        id: "custom_property_object",
                        name: "An object with custom properties",
                        properties: {
                            constant_property: true,
                            population_intervals: [
                                {
                                    interval: "1970/1980",
                                    number: 2209600,
                                },
                                {
                                    interval: "1980/2090",
                                    number: 2889700,
                                },
                                {
                                    interval: "1990/2000",
                                    number: 3307600,
                                },
                                {
                                    interval: "2000/2010",
                                    number: 4326900,
                                },
                            ],
                            population_sampled: {
                                number: [
                                    "1970",
                                    2209600,
                                    "1980",
                                    2889700,
                                    "1990",
                                    3307600,
                                    "2000",
                                    4326900,
                                    "2010",
                                    5049100,
                                ],
                            },
                        },
                    },
                    {
                        id: "colorado",
                        name: "Colorado",
                        polygon: {
                            positions: {
                                cartographicDegrees: [
                                    -109.03,
                                    41,
                                    0,
                                    -102.03,
                                    41,
                                    0,
                                    -102.03,
                                    37,
                                    0,
                                    -109.03,
                                    37,
                                    0,
                                ],
                            },
                            material: {
                                solidColor: {
                                    color: {
                                        rgba: [0, 255, 0, 150],
                                    },
                                },
                            },
                            height: 0,
                            extrudedHeight: 0,
                        },
                    },
                ]
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
                    shouldAnimate: true,
                    infoBox: false,
                    selectionIndicator: false,
                    geocoder: false, // 地理位置查询定位控件
                    homeButton: false, // 默认相机位置控件
                    timeline: false, // 时间滚动条控件
                    navigationHelpButton: false, // 默认的相机控制提示控件
                    fullscreenButton: false, // 全屏控件
                    scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
                    baseLayerPicker: false, // 底图切换控件
                    animation: false, // 控制场景动画的播放速度控件
                    // terrainProvider: gee,
                    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                        url:
                            "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
                    }),
                    // terrainProvider: new Cesium.CesiumTerrainProvider({
                    //   url: Cesium.IonResource.fromAssetId(3956),
                    // }),
                };

                viewer = new Cesium.Viewer("cesiumContainer", viewerOption);
                viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
                viewer.scene.globe.depthTestAgainstTerrain = true;
                scene = viewer.scene
                this.loadCzmlData()
            },
            radioChange(v){
                this.setExtrudedHeight(v)
            },
            loadCzmlData() {
                dataSource = new Cesium.CzmlDataSource();
                dataSource.load(this.czml);
                viewer.dataSources.add(dataSource);
                viewer.zoomTo(dataSource);
                this.setExtrudedHeight(this.radio)
            },
            setExtrudedHeight(propertyName) {
                var customPropertyObject = dataSource.entities.getById(
                    "custom_property_object"
                );
                var property = customPropertyObject.properties[propertyName];
                var colorado = dataSource.entities.getById("colorado");

                // Because the population values are so large, we scale them down
                // by 50 so they fit on the screen.
                // If we didn't need to scale, we could directly assign the property
                // to extrudedHeight.
                // colorado.polygon.extrudedHeight = scaleProperty(property, 1 / 50.0);
                colorado.polygon.extrudedHeight = this.scaleProperty(property, 1 / 50.0);
            },
            scaleProperty(property, scalingFactor) {
                // returns a property that scales another property by a constant factor.
                return new Cesium.CallbackProperty(function (time, result) {
                    result = property.getValue(time, result);
                    result = result * scalingFactor;
                    return result;
                }, property.isConstant);
            }
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

    .tool-box {
        display: flex;
        width: 25vw;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        z-index: 1000;
        right: 0;
        top: 0;
        padding: 10px 20px;
    }
</style>