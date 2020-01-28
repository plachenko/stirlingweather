<template>
  <div id="app">

    <!-- Error Handling -->
    <div class="error" v-if="error">Error: {{error}}</div>

    <!-- Weather widget display -->
    <WeatherWidget :data="weatherData" />

    <!-- Location capture form -->
    <form @submit.prevent="getData('name')">
      <input placeholder="please enter a location" type="text" v-model="location" />
      <input type="submit" />
    </form>
    <hr />
    or
    <a href="#" @click="getBrowserLocation">use browser current location</a>

    <!-- <Map style="position: absolute; left: 100px; top: 300px;" /> -->

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WeatherWidget from './components/WeatherWidget.vue';
import Map from './components/Map.vue';
import axios from 'axios';

@Component({
  components: {
    WeatherWidget,
    Map
  },
})
export default class App extends Vue {
  private location: string = "London, UK";
  private browserLoc!: object;
  private weatherData!: object;
  private appID: string = "3271837e9218269f1e7f49308577ec1c"
  private error: string = "";
  
  private mounted(){

  }

  private getBrowserLocation(){
    navigator.geolocation.getCurrentPosition((loc) => {
      this.browserLoc = loc.coords;
      this.getData('latlon');
    })
  }

  private getData(type: string){
    let query = '';
    if(type == "latlon"){
      query = `lat=${this.browserLoc.latitude}&lon=${this.browserLoc.longitude}`;
      console.log(query)
    } else if(type == "name") {
      query = `q=${this.location}`;
    }
    
    let url = 'http://api.openweathermap.org/data/2.5/weather?' + query + '&APPID=' + this.appID + '&units=imperial';
    console.log(url);

    axios.get(url)
      .then((res)=> {
        console.log('response', res.data);
        this.weatherData = res.data;
      })
      .catch((err)=>{
        console.log(err.response);
        this.error = err.response.data.message;
      })
  }
}
</script>

<style>
html, body{
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
.error{
  width: 100%;
  padding: 10px;
  background-color:#F00;
  text-align: center;
  margin: 0px 0px 10px 0px;
}

</style>
