<template>
  <div id="widget">
    <!-- <h2>{{temperature}}&#176;</h2> -->
    <!-- <span v-for="(locinfo, idx) in location" :key="idx">{{locinfo}}</span> -->
    <div v-if="data.main">
      {{Math.round(data.main.temp)}} &deg;
    </div>
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
  background-color:#F00;
  width: 300px;
  height: 100px;
  border-radius: 10px;
  text-align: left;
  padding: 10px;
  margin: 10px;
  }
  #widget h2{
    margin: 0px;
  }
</style>
