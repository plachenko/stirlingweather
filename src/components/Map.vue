<template>
  <div id="map">
    <canvas ref="canvas" />
    <div id="latlon" style="position: absolute;">
      <span><strong>Lat</strong> {{lat}}</span>
      <span><strong>Lon</strong> {{lon}}</span>
    </div>
    <div style="position: relative; border-radius: 15px 15px 0px 0px; width: 100%; height: 100%; overflow: hidden; background-color:rgb(157, 200, 221);">
      <img src="../assets/world.svg" style="position: absolute;top: -105px; left: 11px;" width="500" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Map extends Vue {
  @Prop() private data!: object;

  @Prop() private coords!: any;
  @Watch('coords', {deep: true, immediate: true})
  private onCoordChange(val: any){
    this.lat = val.lat.toFixed(2);
    this.lon = val.lon.toFixed(2);

    this.$nextTick(() =>{
      // let _lonx = (((this.lon - (this.can.width/2))/this.can.width) * 2) * 180 + 180;
      // let _laty = (((this.lat - (this.can.height/2))/this.can.height) * 2) * 90 * -1 - 90;
      // let _lonx = (((this.can.width/2) / this.can.width * 2) * 180) + (Number(this.lon) * this.can.width/2);
      // let _laty = (((this.can.height/2) / this.can.height * 2) * 90) - (Number(this.lat));

      // this.x = _lonx;
      // this.y = _laty;

      // this.draw()
    })
  }

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

    this.x = this.can.width/2;
    this.y = this.can.height/2;

    this.draw();

    this.can.addEventListener('pointerup', (e) => {
        this.$emit('mapEvt', {lat: this.lat, lon: this.lon});
        this.can.style.cursor = "default";
    });

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
        this.can.style.cursor = "none";

        let _lonx = (((this.x - (this.can.width/2))/this.can.width) * 2) * 180;
        let _laty = (((this.y - (this.can.height/2))/this.can.height) * 2) * 90 * -1;

        this.lon = Number(_lonx.toFixed(2));
        this.lat = Number(_laty.toFixed(2));

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
      font-size: 10px;
      display: inline-block;
      color:#FFF;
      width: 55px;
      background-color: rgba(0,0,0,.4);
      }
</style>
