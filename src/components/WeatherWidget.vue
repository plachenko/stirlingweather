<template>
  <div class="widget">
    <h2>{{temperature}}</h2>
    <span v-for="(locinfo, idx) in location" :key="idx">{{locinfo}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class WeatherWidget extends Vue {
  @Prop() private msg!: string;

  private temperature: number = 0;
  private location: object = {
    city: "",
    country: ""
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
