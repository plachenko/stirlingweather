(function(t){function e(e){for(var o,r,c=e[0],s=e[1],l=e[2],p=0,u=[];p<c.length;p++)r=c[p],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&u.push(n[r][0]),n[r]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o]);d&&d(e);while(u.length)u.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],o=!0,c=1;c<a.length;c++){var s=a[c];0!==n[s]&&(o=!1)}o&&(i.splice(e--,1),t=r(r.s=a[0]))}return t}var o={},n={app:0},i=[];function r(e){if(o[e])return o[e].exports;var a=o[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=o,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(a,o,function(e){return t[e]}.bind(null,o));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var d=s;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"034f":function(t,e,a){"use strict";var o=a("85ec"),n=a.n(o);n.a},2110:function(t,e,a){"use strict";var o=a("cc0d"),n=a.n(o);n.a},"32d1":function(t,e,a){t.exports=a.p+"img/world.604d3391.svg"},"85ec":function(t,e,a){},cc0d:function(t,e,a){},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var o=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("div",{attrs:{id:"widget"}},[a("transition",{on:{enter:t.err_enter,leave:t.err_leave}},[t.error?a("div",{staticClass:"error"},[t._v("Error: "+t._s(t.error))]):t._e()]),a("div",{staticStyle:{position:"relative",height:"100%",width:"100%"}},[a("Map",{staticStyle:{position:"absolute"},attrs:{id:"map",coords:t.coords},on:{mapEvt:t.getMapLocation}}),a("WeatherWidget",{directives:[{name:"show",rawName:"v-show",value:t.weatherData.hasOwnProperty("main"),expression:"weatherData.hasOwnProperty('main')"}],attrs:{id:"ww",data:t.weatherData}})],1),t.weatherData.hasOwnProperty("main")?a("a",{attrs:{href:"#",id:"curLoc"},on:{click:t.reset}},[t._v("️back")]):a("a",{attrs:{href:"#",id:"curLoc"},on:{click:t.getBrowserLocation}},[t._v("☂ Check weather wear where you are")]),a("form",{attrs:{id:"locinput"},on:{submit:function(e){return e.preventDefault(),t.getData("q="+t.location)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.location,expression:"location"}],attrs:{placeholder:"Check weather wear somewhere there (London, UK or 03063)",type:"search"},domProps:{value:t.location},on:{input:function(e){e.target.composing||(t.location=e.target.value)}}})])],1)])},i=[],r=a("d4ec"),c=a("bee2"),s=a("99de"),l=a("7e84"),d=a("262e"),p=a("9ab4"),u=a("60a3"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"widget"}},[t.data.main?a("div",{staticStyle:{padding:"10px"}},[a("div",{staticStyle:{"padding-bottom":"5px","box-sizing":"border-box","margin-bottom":"10px",width:"100%","border-bottom":"2px solid",float:"left",position:"relative"}},[a("h2",[t._v(t._s(t.data.name)+", "+t._s(t.data.sys.country))]),a("span",{staticStyle:{position:"absolute",top:"-30px",color:"#888",right:"-10px","font-size":"12px"}},[t._v("(Lat: "+t._s(t.data.coord.lon)+", Lon: "+t._s(t.data.coord.lat)+")")])]),t.data.main?a("div",{staticClass:"temp",staticStyle:{"border-bottom":"2px solid","border-top":"2px solid"},on:{click:function(e){return t.convert()}}},[a("span",{attrs:{id:"num"}},[t._v(t._s(Math.round(t.temp))+"°")]),a("span",[t._v(t._s(t.metric))]),a("img",{staticStyle:{position:"absolute",top:"-29px",right:"-30px","background-color":"#777",border:"#FFF 2px solid","border-radius":"90px"},attrs:{src:"https://www.openweathermap.org/img/wn/"+t.data.weather[0].icon+".png"}})]):t._e(),a("div",{staticClass:"inner"},[a("div",[a("strong",[t._v("Condition")]),a("span",[t._v(t._s(t.data.weather[0].description))])]),a("div",[a("strong",[t._v("Wind")]),a("span",[t._v(t._s(t.data.wind.speed)+" mph")])]),a("div",[a("strong",[t._v("Pressure")]),a("span",[t._v(t._s(t.data.main.pressure)+" hPa")])]),a("div",[a("strong",[t._v("Humidity")]),a("span",[t._v(t._s(t.data.main.humidity)+"%")])])]),a("div",{staticClass:"inner"},[t._v("Wear something.")])]):t._e()])},v=[],f=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(s["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.metric="F",t.temp=0,t}return Object(d["a"])(e,t),Object(c["a"])(e,[{key:"ondataChange",value:function(t){t.main&&(this.temp=t.main.temp,"C"==this.metric&&this.convert())}},{key:"convert",value:function(){var t=this.data.main.temp;"F"==this.metric?(this.metric="C",this.temp=5/9*(t-32)):(this.metric="F",this.temp=t)}}]),e}(u["c"]);p["a"]([Object(u["b"])()],f.prototype,"data",void 0),p["a"]([Object(u["d"])("data",{deep:!0,immediate:!0})],f.prototype,"ondataChange",null),f=p["a"]([u["a"]],f);var m=f,g=m,b=(a("d364"),a("2877")),w=Object(b["a"])(g,h,v,!1,null,"68921c14",null),y=w.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"map"}},[a("canvas",{ref:"canvas"}),a("div",{staticStyle:{position:"absolute"},attrs:{id:"latlon"}},[a("span",[a("strong",[t._v("Lat")]),t._v(" "+t._s(t.lat))]),a("span",[a("strong",[t._v("Lon")]),t._v(" "+t._s(t.lon))])]),t._m(0)])},x=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticStyle:{position:"relative","border-radius":"15px 15px 0px 0px",width:"100%",height:"100%",overflow:"hidden","background-color":"rgb(157, 200, 221)"}},[o("img",{staticStyle:{position:"absolute",top:"-105px",left:"11px"},attrs:{src:a("32d1"),width:"500",alt:""}})])}],O=(a("a9e3"),a("b680"),function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(s["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.lat=0,t.lon=0,t}return Object(d["a"])(e,t),Object(c["a"])(e,[{key:"onCoordChange",value:function(t){this.lat=t.lat.toFixed(2),this.lon=t.lon.toFixed(2),this.$nextTick((function(){}))}},{key:"mounted",value:function(){var t=this;this.can=this.$refs.canvas,this.can.width=this.$el.clientWidth-25,this.can.height=this.$el.clientHeight-20,this.ctx=this.can.getContext("2d"),this.x=this.can.width/2,this.y=this.can.height/2,this.draw(),this.can.addEventListener("pointerup",(function(e){t.$emit("mapEvt",{lat:t.lat,lon:t.lon}),t.can.style.cursor="default"})),this.can.addEventListener("pointerdown",(function(e){var a=e.offsetX,o=e.offsetY;t.x=a-t.can.width*Math.floor(a/t.can.width),t.y=o-t.can.height*Math.floor(o/t.can.height),t.draw()})),this.can.addEventListener("pointermove",(function(e){e.preventDefault();var a=e.offsetX,o=e.offsetY;if(t.x=a-t.can.width*Math.floor(a/t.can.width),t.y=o-t.can.height*Math.floor(o/t.can.height),e.pressure){t.can.setPointerCapture(e.pointerId),t.can.style.cursor="none";var n=(t.x-t.can.width/2)/t.can.width*2*180,i=(t.y-t.can.height/2)/t.can.height*2*90*-1;t.lon=Number(n.toFixed(2)),t.lat=Number(i.toFixed(2)),t.draw()}}))}},{key:"draw",value:function(){this.ctx.fillStyle="#F00",this.ctx.clearRect(0,0,this.can.width,this.can.height),this.ctx.fillRect(this.x,0,1,this.can.height),this.ctx.fillRect(0,this.y,this.can.width,1)}}]),e}(u["c"]));p["a"]([Object(u["b"])()],O.prototype,"data",void 0),p["a"]([Object(u["b"])()],O.prototype,"coords",void 0),p["a"]([Object(u["d"])("coords",{deep:!0,immediate:!0})],O.prototype,"onCoordChange",null),O=p["a"]([u["a"]],O);var j=O,k=j,C=(a("2110"),Object(b["a"])(k,_,x,!1,null,"7a2d833d",null)),P=C.exports,D=a("bc3a"),L=a.n(D),S=a("cffa"),M=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(s["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.location="",t.coords={lat:0,lon:0},t.weatherData={},t.appID="3271837e9218269f1e7f49308577ec1c",t.error="",t}return Object(d["a"])(e,t),Object(c["a"])(e,[{key:"reset",value:function(){var t=this;S["a"].to("#ww",.5,{opacity:0,onComplete:function(){t.weatherData={},t.location=""}}),S["a"].to("#map",.3,{autoAlpha:1,display:"block"}),S["a"].to("#map canvas",.2,{opacity:1,delay:.5}),S["a"].to("#widget",.5,{height:250}),S["a"].to("#locinput",1,{autoAlpha:1,display:"block"})}},{key:"getBrowserLocation",value:function(){var t=this;navigator.geolocation.getCurrentPosition((function(e){t.coords={lat:e.coords.latitude,lon:e.coords.longitude},t.getData("lat="+e.coords.latitude+"&lon="+e.coords.longitude)}))}},{key:"getMapLocation",value:function(t){this.getData("lat="+t.lat+"&lon="+t.lon)}},{key:"err_enter",value:function(t){var e=this;S["a"].from(t,.3,{opacity:0,onComplete:function(){t.innerHTML="Error: ".concat(e.error),setTimeout((function(){e.error="",t.innerHTML=""}),1e3)}})}},{key:"err_leave",value:function(t,e){S["a"].to(t,{opacity:0,onComplete:e})}},{key:"getData",value:function(t){var e=this,a="https://api.openweathermap.org/data/2.5/weather?"+t+"&APPID="+this.appID+"&units=imperial";L.a.get(a).then((function(t){e.coords=t.data.coord,e.weatherData=t.data,S["a"].to("#map",.3,{autoAlpha:0}),S["a"].to("#map canvas",.1,{opacity:0}),S["a"].to("#locinput",.5,{autoAlpha:0}),S["a"].to("#widget",.5,{height:190}),S["a"].fromTo("#ww",{opacity:0},{opacity:1})})).catch((function(t){e.error=t.response.data.message}))}}]),e}(u["c"]);M=p["a"]([Object(u["a"])({components:{WeatherWidget:y,Map:P}})],M);var E=M,F=E,$=(a("034f"),Object(b["a"])(F,n,i,!1,null,null,null)),T=$.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(T)}}).$mount("#app")},d364:function(t,e,a){"use strict";var o=a("e910"),n=a.n(o);n.a},e910:function(t,e,a){}});
//# sourceMappingURL=app.9039d8bb.js.map