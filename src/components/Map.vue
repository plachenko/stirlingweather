<template>
  <div id="map">
    <canvas ref="canvas" />
    <div id="latlon" style="position: absolute;">
      <span><strong>Lat</strong> {{lat}}</span>
      <span><strong>Lon</strong> {{lon}}</span>
    </div>
    <div style="position: relative; border-radius: 15px; width: 100%; height: 100%; overflow: hidden;">
      <img src="../assets/world.svg" style="position: absolute;top: -95px;" width="500" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Map extends Vue {
  @Prop() private data!: object;
  private can!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private x!: number;
  private y!: number;

  private lat: number = 0;
  private lon: number = 0;

  private mounted(){

    this.can = this.$refs.canvas as HTMLCanvasElement;
    this.can.width = this.$el.clientWidth - 25;
    this.can.height = this.$el.clientHeight - 20;
    this.ctx = this.can.getContext('2d') as CanvasRenderingContext2D;

    let img = new Image();
    img.src = "../assets/world.svg";
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0);
    }


    this.x = this.can.width/2;
    this.y = this.can.height/2;

    this.draw();

    this.can.addEventListener('pointerdown', (e) => {
      let _x = e.offsetX;
      let _y = e.offsetY;
      this.x = _x - this.can.width * Math.floor(_x / this.can.width);
      this.y = _y - this.can.height * Math.floor(_y / this.can.height);

      this.draw();
    });

    this.can.addEventListener('pointermove', (e) => {
      e.preventDefault();

      // Capture mouse wrap around
      let _x = e.offsetX;
      let _y = e.offsetY;

      this.x = _x - this.can.width * Math.floor(_x / this.can.width);
      this.y = _y - this.can.height * Math.floor(_y / this.can.height);

      if(e.pressure){
        this.can.setPointerCapture(e.pointerId);
        this.lat = this.x;
        this.lon = this.y;

        this.draw();
      }
    })
  }

  private draw(){
    this.ctx.fillStyle = "#F00";
    this.ctx.clearRect(0,0,this.can.width, this.can.height);
    this.ctx.fillRect(this.x, 0, 1, this.can.height);
    this.ctx.fillRect(0, this.y, this.can.width, 1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map{
  padding: 10px;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  }

canvas{
  border: 2px solid #AAA;
  border-radius: 15px 15px 0px 0px;
  position: absolute;
  z-index: 9998;
  }
  #latlon{
    position: absolute;
    z-index: 9998;
    bottom: 10px;
    right: 15px;
    }
    #latlon span{
      padding: 5px;
      margin: 4px;
      display: inline-block;
      width: 80px;
      background-color: rgba(0,0,0,.4);
      }
</style>
