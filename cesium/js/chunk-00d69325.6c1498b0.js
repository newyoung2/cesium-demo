(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00d69325"],{1798:function(e,n,t){"use strict";t("bb50")},"79a9":function(e,n,t){"use strict";t.r(n);var i,o,a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"cesiumContainer1"}})},r=[],l=t("acc5"),c=(t("5b17"),null),s=null,d=null,u={name:"drawLine",props:{},data:function(){return{tileset:null}},computed:{},watch:{},components:{},created:function(){},mounted:function(){this.init()},methods:{init:function(){l["J"].defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjFjYmZmNS1hYmNjLTRhZWUtYjlkNi02ODVmOGRjNGQ2N2MiLCJpZCI6Mzg4MzUsImlhdCI6MTYwNjg3Mzk0MX0.R0iO5eELEnpRqQCzoa33UZakcsTYUidaTP9nLa342wY",c=new l["rb"]("cesiumContainer1",{infoBox:!1,selectionIndicator:!1,shouldAnimate:!0,terrainProvider:l["tb"]()}),c._cesiumWidget._creditContainer.style.display="none",this.startDraw()},startDraw:function(){c.scene.globe.enableLighting=!0,c.scene.globe.depthTestAgainstTerrain=!0,l["P"].setRandomNumberSeed(3),i=l["L"].fromDate(new Date(2015,2,25,16)),o=l["L"].addSeconds(i,360,new l["L"]),c.clock.startTime=i.clone(),c.clock.stopTime=o.clone(),c.clock.currentTime=i.clone(),c.clock.clockRange=l["n"].LOOP_STOP,c.clock.multiplier=10,c.timeline.zoomTo(i,o),s=this.computeCirclularFlight(-112.110693,36.0994841,.03),d=c.entities.add({availability:new l["kb"]([new l["jb"]({start:i,stop:o})]),position:s,orientation:new l["ob"](s),model:{uri:"../SampleData/models/CesiumAir/Cesium_Air.glb",minimumPixelSize:64},path:{resolution:1,material:new l["V"]({glowPower:.1,color:l["q"].YELLOW}),width:10}}),d.position.setInterpolationOptions({interpolationDegree:5,interpolationAlgorithm:l["O"]}),con,c.zoomTo(c.entities,new l["D"](0,l["P"].toRadians(-90)))},computeCirclularFlight:function(e,n,t){for(var o=new l["cb"],a=0;a<=360;a+=45){l["P"].toRadians(a);var r=l["L"].addSeconds(i,a,new l["L"]),s=l["e"].fromDegrees(e+Math.random()*t,n+Math.random()*t,500*l["P"].nextRandomNumber()+1750);o.addSample(r,s),c.entities.add({position:s,point:{pixelSize:8,color:l["q"].TRANSPARENT,outlineColor:l["q"].YELLOW,outlineWidth:3}})}return o}}},m=u,p=(t("1798"),t("c701")),w=Object(p["a"])(m,a,r,!1,null,"4edb8616",null);n["default"]=w.exports},bb50:function(e,n,t){}}]);
//# sourceMappingURL=chunk-00d69325.6c1498b0.js.map