<template>
  <div id="widget">
    <div v-if="data.main" style="padding: 10px;">
      <div style="padding-bottom: 5px; box-sizing: border-box; margin-bottom: 10px; width: 95%; border-bottom: 2px solid; float: left; position: relative;">
        <h2 style="">{{data.name}}, {{data.sys.country}}</h2>
        <span style="position: absolute; top: 10px; color: #888; right: 0px; font-size: 12px;">(Lat: {{data.coord.lon}}, Lon: {{data.coord.lat}})</span>
      </div>
      <div class="temp" @click="convert()" v-if="data.main" style="border-bottom: 3px solid;">
        <span id="num">{{Math.round(temp)}}&deg;</span>
        <span>{{metric}}</span>
        <img style="position: absolute; top: -9px; right: -30px; background-color:#777; border: #FFF 2px solid; border-radius: 90px;" :src="'https://www.openweathermap.org/img/wn/'+data.weather[0].icon+'.png'" />
      </div>
      <div id="inner">
        <div><strong>Condition:</strong> {{data.weather[0].description}}</div>
        <div><strong>Wind:</strong> {{data.wind.speed}} mph</div>
        <div><strong>Pressure:</strong> {{data.main.pressure}}</div>
        <div><strong>Humidity:</strong> {{data.main.humidity}}</div>
      </div>
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
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  }
  #widget h2{
    text-align: center;
    margin: 0px;
  }
  #widget div{
    /* width: 100%; */
    }
  .temp{
    text-align: center;
    background-color:#FFF;
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 90px;
    padding: 10px;
    width: 90px !important;
    cursor: pointer;
    user-select: none;
    }
    .temp #num{
      font-size: 40px;
      }
      #inner{
        text-align:left; 
        width: 340px; 
        float: right;
        background-color:#FFF;
        border-radius: 10px;
        padding: 5px;
        margin-right: 20px;
        }

      #inner div{
        padding: 5px;
        border-bottom: 1px solid #AAA;
        }
        #inner div:last-child{
          border-bottom: none;
        }
        #inner strong{
          display: inline-block;
          width: 80px;
          text-align: right;
          }
</style>
