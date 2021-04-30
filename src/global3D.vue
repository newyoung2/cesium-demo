<script>
    import Vue from 'vue'
    const _div = document.createElement("div");
    _div.id = "cesiumContainer1";
    // _div.style.position = "absolute";
    // _div.style.left = "0";
    // _div.style.top = "0";
    // _div.style.zIndex = "10";
    _div.style.height = "100vh";
    _div.style.width = "100%";
    _div.style.padding = "0";
    _div.style.margin = "0";
    _div.style.display = "none";

    //挂载在body里面，因为整个系统加载的时候，页面只有body，其他元素都还未加载
    document.body.appendChild(_div);

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
    //用Viewer来接收
    const Viewer = new Cesium.Viewer("cesiumContainer1", viewerOption)

    //中间部分写初始化3d需要的方法

    //把Viewer抛出去
    export default {
        Viewer
    };

</script>