<template>
  <div id="widget">
    <div v-if="data.main" style="padding: 10px;">
      <div style="padding-bottom: 5px; box-sizing: border-box; margin-bottom: 10px; width: 100%; border-bottom: 2px solid; float: left; position: relative;">
        <h2>{{data.name || data.coord.lat}}, {{data.sys.country || data.coord.lon}}</h2>
      </div>
      <div class="temp" @click="convert()" v-if="data.main" style="border-bottom: 2px solid; border-top: 2px solid;">
        <span id="num">{{Math.round(temp)}}&deg;</span>
        <span>{{metric}}</span>
        <img style="position: absolute; top: -29px; right: -30px; background-color:#777; border: #FFF 2px solid; border-radius: 90px;" :src="'https://www.openweathermap.org/img/wn/'+data.weather[0].icon+'.png'" />
      </div>
      <div class="inner">
        <div><strong>Condition</strong><span>{{data.weather[0].description}}</span></div>
        <div><strong>Wind</strong><span>{{data.wind.speed}} mph</span></div>
        <div><strong>Pressure</strong><span>{{data.main.pressure}} hPa</span></div>
        <div><strong>Humidity</strong><span>{{data.main.humidity}}%</span></div>
      </div>
      <div class="inner">Wear something.</div>
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
    float:left;
    margin-left: 150px;
  }
  #widget div{
    /* width: 100%; */
    }
  .temp{
    text-align: center;
    background-color:#FFF;
    position: absolute;
    left: 10px;
    top: -30px;
    border-radius: 90px;
    padding: 10px;
    width: 90px !important;
    cursor: pointer;
    user-select: none;
    }
    .temp #num{
      font-size: 40px;
      }

      .inner{
        box-sizing: border-box;
        float: left;
        background-color:#FFF;
        padding: 5px;
        border-radius: 10px 0px 0px 10px;
        width: 69%;
        }
        .inner:last-child{
          border-radius: 0px 10px 10px 0px;
          float: right;
          width: 30%;
          padding-top: 40px;
          text-align:center;
          height: 120px;
          }

        .inner div{
          border-bottom: 1px solid #AAA;
          }
          .inner div:last-child{
            border-bottom: none;
            }
            .inner div:last-child strong{
              border-radius: 0px 0px 0px 5px;
            }
          .inner div:first-child strong{
            border-radius: 5px 0px 0px 0px;
          }

        .inner span{
          display: inline-block;
          padding-left: 10px;
        }

        .inner strong{
          /* padding-right: 5px; */
          display: inline-block;
          margin: 1px 0px;
          background-color:#666;
          color:#FFF;
          padding: 3px 3px 3px 8px;
          width: 100px;
          }
</style>
