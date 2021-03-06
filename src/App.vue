<template>
  <div id="app">
    <div id="widget">
      <!-- Error Handling -->
      <transition @enter="err_enter" @leave="err_leave">
        <div class="error" v-if="error">Error: {{error}}</div>
      </transition>

      <!-- Weather widget display -->
      <div id="disp">
        <div id="date">{{date.toLocaleString("en-US")}}</div>
        <Map @latCh="latEvt" @lonCh="lonEvt" @mapEvt="getMapLocation" @mdEvt="pullTime" :coords="coords" :locked="locked" />
        <WeatherWidget id="ww" v-show="weatherData.hasOwnProperty('main')" :data="weatherData" />
      </div>

      <!-- Location capture form -->
      <!-- <a id="curLoc">️<span></span></a> -->
      <a v-if="!weatherData.hasOwnProperty('main')" id="curLoc" @click="getBrowserLocation">
        <div v-if="lat && lon" id="latlonStat">
          <span>Lat: {{lat}}</span>
          <span>Lon: {{lon}}</span>
        </div>
        <span v-else>&#9730; Check weather wear where you are</span>
      </a>
      <a v-else id="curLoc" @click="reset">️<span>back</span></a>
      <!-- <a id="curLoc">{{this.coords.lat}}</a> -->

      <form id="locinput" @submit.prevent="getData('q='+location)">
        <input placeholder="Check weather wear somewhere there (London, UK or 03063)" type="search" v-model="location" />
      </form>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WeatherWidget from './components/WeatherWidget.vue';
import Map from './components/Map.vue';
import axios from 'axios';
import gsap from 'gsap';

@Component({
  components: {
    WeatherWidget,
    Map
  },
})
export default class App extends Vue {
  private date: any = new Date();
  private location: string = "";
  private locked: Boolean = false;
  private coords: object = {
    lat: 0,
    lon: 0
  };
  private weatherData: object = {};
  private appID: string = "3271837e9218269f1e7f49308577ec1c"
  private error: string = "";

  private lat: number = 0;
  private lon: number = 0;

  private mounted(){
    setInterval(()=>{
      this.date = new Date();
    }, 1000)
  }

  private pullTime(e: any){

    gsap.to('#curLoc', .2, {padding: 0});
    gsap.to('#locinput', .3, {autoAlpha: 0});
    // gsap.to('#date', .3, {top: "-=40", borderRadius: "15px"});
  }

  private latEvt(val: number){
    gsap.to('#curLoc', .6, {backgroundColor: "#333", color: "#FFF"});
    this.lat = val;
  }

  private lonEvt(val: number){
    this.lon = val;
  }

  private reset(){
    this.lat = 0;
    this.lon = 0;
    gsap.to('#ww', .5, {opacity: 0, onComplete:()=>{
      this.weatherData = {};
      this.location = "";
    }});
    gsap.to('#curLoc span', .3, {opacity: 0, onComplete: () => {
      gsap.to('#curLoc span', .4, {opacity: 1, delay: .2})
    }});
    // gsap.to('#date', .3, {top: 0, borderRadius: "15px 15px 0px 0px"});
    gsap.to('#map', .3, {autoAlpha: 1, display: 'block'});
    gsap.to('#map canvas', .2, {opacity: 1, delay: .5});
    gsap.to('#date', .3, {autoAlpha: 1, display: 'block', delay: .3});
    gsap.to('#widget', .5, {height: 250});
    gsap.to('#locinput', .5, {autoAlpha: 1, display: 'block'});

    this.locked = false;
  }

  private getBrowserLocation(){
    navigator.geolocation.getCurrentPosition((loc) => {
      this.getData('lat='+loc.coords.latitude+'&lon='+loc.coords.longitude);
    })
  }

  private getMapLocation(e: any){
    this.getData('lat='+e.lat+'&lon='+e.lon);
  }

  private err_enter(el: any){
    gsap.from(el, .3, {opacity: 0, onComplete:()=>{
      el.innerHTML = `Error: ${this.error}`;
      setTimeout(() => {
        this.error = "";
        el.innerHTML = "";
      }, 1000)
    }});
  }

  private err_leave(el: any, done: any){
    gsap.to(el, {opacity: 0, onComplete:done});
  }

  private getData(query: string){
    let url = 'https://api.openweathermap.org/data/2.5/weather?' + query + '&APPID=' + this.appID + '&units=imperial';

    axios.get(url)
      .then((res) => {
        this.coords = res.data.coord;
        this.locked = true;

        gsap.to('#curLoc', .2, {padding: 10});
        gsap.to('#curLoc span', .3, {opacity: 0, delay:.1, onComplete: () => {
          this.weatherData = res.data;

          gsap.to('#curLoc', .3, {backgroundColor: "#DDD", color: "#000"});
          gsap.to('#curLoc span', .3, {opacity: 1, delay: .3})
          gsap.to('#map', .3, {autoAlpha: 0});
          gsap.to('#date', .3, {autoAlpha: 0});
          gsap.to('#map canvas', .1, {opacity: 0});
          gsap.to('#locinput', .5, {autoAlpha:0});
          gsap.to('#widget', .5, {height: 190});
          gsap.fromTo('#ww', {opacity: 0}, {opacity: 1});
        }});

      })
      .catch((err)=>{
        this.error = err.response.data.message;
      })
  }
}
</script>

<style>
html, body{
  margin: 0px;
  padding: 0px;
  touch-action: none;
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  }
  #disp {
    position: relative; 
    height: 100%; 
    width: 100%; 
    position: relative;
    /* overflow: hidden; */
    }
  #widget {
    position: relative;
    width: 500px;
    height: 250px;
    background-color:#CCC;
    border-radius: 15px 15px 0px 0px;
    box-sizing: border-box;
    }
    #date {
      position: absolute; 
      font-size: 2em; 
      color:#FFF;
      z-index:9998; 
      font-weight: bold; 
      border-bottom: 1px solid;
      width: 100%; 
      border-radius: 15px 15px 0px 0px;
      text-align: center; 
      background-color:rgba(0,0,0,.4);
      }

.error{
  width: 100%;
  height: 37px;
  padding: 10px;
  position: absolute;
  background-color:#F00;
  border-radius: 15px 15px 0px 0px;
  text-align: center;
  margin: 0px 0px 10px 0px;
  z-index: 9999;
  box-sizing: border-box;
  }

  #curLoc{
    border-top: 2px solid;
    padding: 10px;
    display: inline-block;
    text-align: center;
    background-color: #DDD;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    color:#333;
    border-radius: 0px 0px 15px 15px;
    font-weight: bold;
    cursor: pointer;
    }
  #locinput{
    box-sizing: border-box;
    position: absolute;
    bottom: -90px;
    width: 100%;
    }
    #locinput input{
      outline: none;
      border-radius: 10px;
      box-sizing: border-box;
      border: 1px solid;
      width: 100%;
      padding: 10px;
      }

      #latlonStat span{
        display: inline-block;
        width: 50%;
        height: 100%;
        border-right: 2px solid;
        box-sizing: border-box;
        text-align: center;
        padding: 15px;
      }
      #latlonStat span:last-child{
        border-right: none;
      }

</style>
