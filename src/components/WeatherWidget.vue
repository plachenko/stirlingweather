<template>
  <div id="widget">
    <!-- <h2>{{temperature}}&#176;</h2> -->
    <!-- <span v-for="(locinfo, idx) in location" :key="idx">{{locinfo}}</span> -->
    <div class="temp" v-if="data.main"> {{Math.round(data.main.temp)}}&deg;</div>
    <div>{{data.name}}, {{data.sys.country}}</div>
    <div>{{data.weather[0].description}}</div>
    <img :src="'https://www.openweathermap.org/img/wn/'+data.weather[0].icon+'.png'" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class WeatherWidget extends Vue {
  @Prop() private data!: object;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#widget{
  width: 100%;
  text-align: center;
  height: 100px;
  border-radius: 10px;
  text-align: left;
  padding: 10px;
  }
  #widget h2{
    margin: 0px;
  }
  #widget div{
    width: 100%;
    text-align: center;
  }
  .temp{
    background-color:#FFF;
    position: absolute;
    left: 10px;
    border-radius: 90px;
    padding: 10px;
    width: 50px !important;
    font-size: 40px;
    }
</style>
