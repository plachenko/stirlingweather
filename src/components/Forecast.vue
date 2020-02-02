<template>
  <div id="forecast">
    <div v-if="cur.hasOwnProperty('main')">
      <!-- <span class="time">{{cur.dt_txt}}</span> -->
      <img :src="'https://www.openweathermap.org/img/wn/'+cur.weather[0].icon+'.png'" />
      {{cur.main.temp}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import gsap from 'gsap';
import axios from 'axios';

@Component
export default class Forecast extends Vue {

  private url: string = 'https://api.openweathermap.org/data/2.5/forecast?';
  private appID: string = "3271837e9218269f1e7f49308577ec1c"
  private data: any = {};
  private cur: any = {};
  private err: string = "";

  @Prop() private cid!: number;
  @Prop() private coord!: any;

  private mounted(){
    if(this.cid){
      this.url += "id=" + this.cid + "&APPID=" + this.appID; 
    }else{
      this.url += "lat=" + this.coord.lat + "&lon=" + this.coord.lon + "&APPID=" + this.appID + "&units=imperial"; 
    }
    axios.get(this.url)
      .then((res) => {
        this.data = res.data;
        this.cur = res.data.list[0]
      })
      .catch((err) => {
        this.err = err;
      })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#forecast{
  display: relative;
  overflow: hidden;
  }
  .time{
    display: absolute;
    top: 0px;
  }
</style>
