<template>
  <div id="map">
    <canvas ref="canvas" style="border: 1px solid;" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class WeatherWidget extends Vue {
  @Prop() private data!: object;

  private mounted(){
    let can = this.$refs.canvas as HTMLCanvasElement;
    let ctx = can.getContext('2d') as CanvasRenderingContext2D;

    let md = false;

    can.width = 500;
    can.height = 500;

    can.addEventListener('pointerdown', (e) => {
      md = true;
      can.setPointerCapture(e.pointerId);
    });
    can.addEventListener('pointerup', (e) => {
      md = false;
    });
    can.addEventListener('pointermove', (e) => {
      let pos = {
        x: e.offsetX,
        y: e.offsetY
      }

      // Capture mouse wrap around
      if(pos.x >= can.width){
        pos.x -= can.width * Math.floor(pos.x/can.width) + 1;
      } else if(pos.x <= 0){
        pos.x += can.width * Math.floor(pos.x/can.width) + 1;
      }

      if(pos.y >= can.height){
        pos.y -= can.height * Math.floor(pos.y/can.height) + 1;

      }
      e.preventDefault();
      ctx.fillStyle = "#F00";

      if(md){
        ctx.clearRect(0,0,can.width, can.height);
        ctx.fillRect(pos.x, 0, 1, can.height);
        ctx.fillRect(0, pos.y, can.width, 1);
      }

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas{
  border: 1px solid;
}
</style>
