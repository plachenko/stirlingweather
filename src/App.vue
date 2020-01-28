<template>
  <div id="app">
    <div id="widget">
      <h1 style="font-size: 1em; display: block; position: absolute; top: -40px;">Check Weather</h1>
      <!-- Error Handling -->
      <transition @enter="err_enter" @leave="err_leave">
        <div class="error" v-if="error">Error: {{error}}</div>
      </transition>

      <!-- Weather widget display -->
      <div style="position: relative; height: 100%; width: 100%; position: relative;">
        <Map id="map" style="position: absolute;" />
        <WeatherWidget id="ww" v-show="weatherData.hasOwnProperty('main')" :data="weatherData" />
      </div>

      <!-- Location capture form -->
      <a href="#" id="curLoc" @click="getBrowserLocation">use current location</a>

      <form id="locinput" @submit.prevent="getData('q='+location)">
        <input placeholder="please enter a location" type="text" v-model="location" />
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
  private location: string = "London, UK";
  private browserLoc!: any;
  private weatherData: object = {};
  private appID: string = "3271837e9218269f1e7f49308577ec1c"
  private error: string = "";

  private mounted(){

  }

  private getBrowserLocation(){
    navigator.geolocation.getCurrentPosition((loc) => {
      this.getData('lat='+loc.coords.latitude+'&lon='+loc.coords.longitude);
    })
  }

  private err_enter(el: any){
    gsap.from(el, {height: 0, padding: 0, opacity: 0, onComplete:()=>{
      el.innerHTML = `Error: ${this.error}`;
      setTimeout(() => {
        this.error = "";
        el.innerHTML = "";
      }, 1000)
    }});
  }

  private err_leave(el: any, done: any){
    gsap.to(el, {height: 0, padding: 0, opacity: 0, onComplete:done});
  }

  private getData(query: string){
    let url = 'https://api.openweathermap.org/data/2.5/weather?' + query + '&APPID=' + this.appID + '&units=imperial';

    axios.get(url)
      .then((res) => {
        this.weatherData = res.data;

        gsap.to('#map', 1, {opacity: 0});
        gsap.to('#locinput', 1, {top:"-=90", zIndex: -10});
        gsap.from('#ww', 2, {opacity: 0});
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
  #widget {
    position: relative;
    width: 500px;
    height: 250px;
    background-color:#CCC;
    border-radius: 15px 15px 0px 0px;
    box-sizing: border-box;
    }

.error{
  width: 100%;
  height: 40px;
  padding: 10px;
  position: absolute;
  background-color:#F00;
  border-radius: 15px 15px 0px 0px;
  text-align: center;
  margin: 0px 0px 10px 0px;
  box-sizing: border-box;
  }

  #curLoc{
    border-top: 2px solid;
    padding: 10px;
    display: inline-block;
    text-align: center;
    background-color: #AAA;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    color:#333;
    font-weight: bold;
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
      border: 2px solid;
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      }

</style>
