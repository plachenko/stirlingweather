<template>
  <div id="widget">
    <div v-if="data.main">
      <div class="temp" @click="convert()" v-if="data.main">
        <span id="num">{{Math.round(temp)}}&deg;</span>
        <span>{{metric}}</span>
      </div>
      <div>{{data.name}}, {{data.sys.country}}</div>
      <div>{{data.weather[0].description}}</div>
      <img :src="'https://www.openweathermap.org/img/wn/'+data.weather[0].icon+'.png'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class WeatherWidget extends Vue {
  private metric: string = "F";
  private temp: number = 0;

  @Prop() private data!: any;
  @Watch('data', {deep: true, immediate: true})
  private ondataChange(val: any){
    if(val.main){
      this.temp = val.main.temp;
      if(this.metric == "C"){
        this.convert();
      }
    }
  }

  private convert(){
    let tmp = this.data.main.temp;
    if(this.metric == "F"){
      this.metric = "C"
      this.temp = (tmp - 32) * (5/9);
    } else {
      this.metric = "F"
      this.temp = tmp;
    }
  }
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
    width: 90px !important;
    cursor: pointer;
    user-select: none;
    }
    .temp #num{
      font-size: 40px;
      }
</style>
