(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-581fc804"],{7271:function(e,t,n){"use strict";n("b0a7")},"8d7e":function(e,t,n){"use strict";n.r(t);var o,i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"cesiumContainer"}},[n("div",{staticClass:"tool-box"},[n("el-radio-group",{attrs:{size:"mini"},on:{change:e.radioChange},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[n("el-radio-button",{attrs:{label:"population_intervals"}}),n("el-radio-button",{attrs:{label:"population_sampled"}})],1)],1)])},r=[],a=n("acc5"),s=(n("5e1a"),n("5b17"),null),l={name:"load3DTiles",props:{},data:function(){return{radio:"population_sampled",czml:[{id:"document",name:"CZML Custom Properties",version:"1.0",clock:{interval:"1970/2010",currentTime:"1970",multiplier:5e8}},{id:"custom_property_object",name:"An object with custom properties",properties:{constant_property:!0,population_intervals:[{interval:"1970/1980",number:2209600},{interval:"1980/2090",number:2889700},{interval:"1990/2000",number:3307600},{interval:"2000/2010",number:4326900}],population_sampled:{number:["1970",2209600,"1980",2889700,"1990",3307600,"2000",4326900,"2010",5049100]}}},{id:"colorado",name:"Colorado",polygon:{positions:{cartographicDegrees:[-109.03,41,0,-102.03,41,0,-102.03,37,0,-109.03,37,0]},material:{solidColor:{color:{rgba:[0,255,0,150]}}},height:0,extrudedHeight:0}}]}},computed:{},watch:{},components:{},created:function(){},mounted:function(){this.init()},methods:{init:function(){var e={shouldAnimate:!0,infoBox:!1,selectionIndicator:!1,geocoder:!1,homeButton:!1,timeline:!1,navigationHelpButton:!1,fullscreenButton:!1,scene3DOnly:!0,baseLayerPicker:!1,animation:!1,imageryProvider:new a["a"]({url:"http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"})};s=new a["rb"]("cesiumContainer",e),s._cesiumWidget._creditContainer.style.display="none",s.scene.globe.depthTestAgainstTerrain=!0,s.scene,this.loadCzmlData()},radioChange:function(e){this.setExtrudedHeight(e)},loadCzmlData:function(){o=new a["t"],o.load(this.czml),s.dataSources.add(o),s.zoomTo(o),this.setExtrudedHeight(this.radio)},setExtrudedHeight:function(e){var t=o.entities.getById("custom_property_object"),n=t.properties[e],i=o.entities.getById("colorado");i.polygon.extrudedHeight=this.scaleProperty(n,.02)},scaleProperty:function(e,t){return new a["c"]((function(n,o){return o=e.getValue(n,o),o*=t,o}),e.isConstant)}}},c=l,u=(n("7271"),n("c701")),d=Object(u["a"])(c,i,r,!1,null,"9a83e2f2",null);t["default"]=d.exports},b0a7:function(e,t,n){}}]);
//# sourceMappingURL=chunk-581fc804.ada91330.js.map