<template>
  <div id="map">
    <canvas ref="canvas" />
    <div id="latlon">
      <span><strong>Lat</strong> {{lat}}</span>
      <span><strong>Lon</strong> {{lon}}</span>
    </div>
    <div id="worldMap">
      <img src="../assets/world.svg" width="500" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import gsap from 'gsap';

@Component
export default class Map extends Vue {

  @Prop() private data!: object;

  @Prop() private coords!: any;
  @Watch('coords', {deep: true, immediate: true})
  private onCoordChange(val: any){
    this.lat = Number(val.lat.toFixed(2));
    this.lon = Number(val.lon.toFixed(2));

    this.$nextTick(() =>{
        let _x = (this.can.width/2) + ((this.lon) * (360 / (this.can.width)) * 2);
        let _y = (this.can.height/2) - ((this.lat) * (180 / (this.can.height))* 2);
        gsap.to(this, .4, {x: _x, y: _y, onComplete: this.emit})
    })
  }

  private can!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private x!: number;
  private y!: number;

  private lat: number = 0;
  private lon: number = 0;

  private emit(){
    // this.$emit('mapEvt', {lat: this.lat, lon: this.lon});
  }

  private mounted(){
    gsap.ticker.add(this.draw);

    this.can = this.$refs.canvas as HTMLCanvasElement;
    this.can.width = this.$el.clientWidth;
    this.can.height = this.$el.clientHeight;
    this.ctx = this.can.getContext('2d') as CanvasRenderingContext2D;

    this.x = this.can.width/2;
    this.y = this.can.height/2;

    this.draw();

    this.can.addEventListener('pointerup', (e) => {
        // let _lonx = (((e.offsetX - (this.can.width/2))/this.can.width) * 2) * 180;
        // let _laty = (((e.offsetY - (this.can.height/2))/this.can.height) * 2) * 90 * -1;

        // this.lon = Number(_lonx.toFixed(2));
        // this.lat = Number(_laty.toFixed(2));
        this.$emit('mapEvt', {lat: this.lat, lon: this.lon});

        this.can.style.cursor = "default";
    });

    this.can.addEventListener('pointerdown', (e) => {
      let _x = e.offsetX;
      let _y = e.offsetY;
      this.x = _x - this.can.width * Math.floor(_x / this.can.width);
      this.y = _y - this.can.height * Math.floor(_y / this.can.height);

      let _lonx = (((this.x - (this.can.width/2))/this.can.width) * 2) * 180;
      let _laty = (((this.y - (this.can.height/2))/this.can.height) * 2) * 90 * -1;

      this.lon = Number(_lonx.toFixed(2));
      this.lat = Number(_laty.toFixed(2));

      this.draw();
    });

    this.can.addEventListener('pointermove', (e) => {
      e.preventDefault();

      // Capture mouse wrap around
      let _x = e.offsetX;
      let _y = e.offsetY;


      if(e.pressure){
        this.can.setPointerCapture(e.pointerId);
        this.can.style.cursor = "none";

        this.x = _x - this.can.width * Math.floor(_x / this.can.width);
        this.y = _y - this.can.height * Math.floor(_y / this.can.height);

        let _lonx = (((this.x - (this.can.width/2))/this.can.width) * 2) * 180;
        let _laty = (((this.y - (this.can.height/2))/this.can.height) * 2) * 90 * -1;

        this.lon = Number(_lonx.toFixed(2));
        this.lat = Number(_laty.toFixed(2));

        this.draw();
      }
    })
  }

  private draw(): any{
    this.ctx.fillStyle = "#F00";
    this.ctx.clearRect(0,0,this.can.width, this.can.height);
    this.ctx.fillRect(this.x, 0, 1, this.can.height);
    this.ctx.fillRect(0, this.y, this.can.width, 1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#worldMap{
    position: relative; 
    border-radius: 15px 15px 0px 0px; 
    width: 100%; 
    height: 100%; 
    overflow: hidden;
    background-color:rgb(157, 200, 221);
    }
    #worldMap img{
        position: absolute;
        top: -95px; 
        left: 17px;
        }
#map{
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 15px 15px 0px 0px;
  }

canvas{
  position: absolute;
  z-index: 9998;
  }
  #latlon{
    position: absolute;
    z-index: 9998;
    bottom: 0px;
    width: 100%;
    }
    #latlon span{
      font-size: 10px;
      padding: 5px 0px;
      display: inline-block;
      color:#FFF;
      width: 50%;
      text-align: center;
      background-color: rgba(0,0,0,.4);
      box-sizing: border-box;
      }
      #latlon span:first-child{
        float: left;
        border-right: 1px solid;
        }
      #latlon span:last-child{
        float: right;
        }
</style>
