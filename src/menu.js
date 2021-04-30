const menu = [
  {
    title: "3dtiles",
    children: [
      { name: "加载3dtiles模型(模型旋转、高度调整)", value: "load3DTiles" },
      { name: '加载上海城市建筑群模型', value: 'goSH' },
      { name: '纽约城市模型', value: 'NewYorkModel' }
    ],
  },
  {
    title: "camera(相机相关)",
    children: [{ name: '视角连续飞行', value: 'flyView' },],
  },
  {
    title: "globe(地球相关)",
    children: [{ name: '限制地图显示范围', value: 'limitRange' },
    { name: '修改地球颜色为纯色', value: 'globeColor' },
    { name: '同步3d、2d地球视角', value: 'syncView' },
    { name: '地球背景透明并修改背景图', value: 'alphaBg' },
    { name: '地球海洋透明度、地心', value: 'globeInner' },],
  },
  {
    title: "imager(影像图层相关)",
    children: [{ name: '分割不同图层', value: 'imagerSplit' },],
  },
  {
    title: "particle system(粒子系统相关)",
    children: [{ name: '飞机螺旋桨着火', value: 'firePlane' },
               { name: '下雪', value: 'snow' },
               { name: '下雨', value: 'rain' },],
  },
  {
    title: "terrain(地形相关)",
    children: [{ name: 'clampToTerrian', value: 'clampToTerrian' },
               { name: '几何体切割地形', value: 'splitTerrain' },
               { name: '几何体切割地形2', value: 'geoSplitTerrain2' },],
  },
  {
    title: "后期渲染",
    children: [{ name: '添加bloom后期效果', value: 'bloom' },
    { name: '为单个模型添加后期效果', value: 'customFeature' },],
  },
  
  {
    title: "其他", children: [    
      { name: '模型沿轨迹飞行', value: 'moveOnTrail' },
      { name: 'clampToModel', value: 'clampToModel' },   
      { name: '点击模型变色、切割模型', value: 'model' },
      { name: '画线', value: 'drawLine' },
      { name: '画面', value: 'drawArea' },
      { name: '在几何体上播放视频', value: 'video' },
      { name: 'topoJson', value: 'topoJson' },    
      ]
  },
  {
    title: "实战与应用", children: [    
      { name: '测量空间直线距离', value: 'mls' },
      { name: '测量空间面积', value: 'mas' },   
      { name: '与echarts结合（迁徙图）', value: 'combineecharts'}, 
      { name: '与three.js结合', value: 'combinethree'}, 
      { name: '发光建筑物(特效)', value: 'wisdomcity'}, 
      { name: '雷达扫描线', value: 'dynamicRadar'},  
      { name: '能量罩(特效)', value: 'electBox'}, 
      { name: '扩散墙(特效)', value: 'spreadWall'},
      { name: '扩散圆(特效)', value: 'scatterCircle'},
      { name: '雷达(特效)', value: 'radar'},
      { name: '道路流光(特效)', value: 'lightRoad'},
      { name: '城市3d模型（基于three.js）', value: 'threeCityModel'},
      { name: '浮动盒子', value: 'floatBox'},
      { name: '智慧城市', value: 'indexCity'},
      ]
  },
]

export default menu