<template>
  <canvas id="canvas"></canvas>
</template>

<script>
let canvas;
let ctx;
let max;
let min;
let maxHeight;
export default {
  props: {
    chartData: Array,
  },
  data() {
    return {
      maxSets: null,
      minSets: null,
    };
  },
  methods: {
    initCanvas() {
      canvas = document.getElementById("canvas");
      canvas.width=760
      canvas.height=180
      ctx = canvas.getContext("2d");
      ctx.lineWidth = 3;
      max = Math.max.apply(null, this.maxSets);
      min=Math.min.apply(null,this.minSets);
      maxHeight = 100 / (max+Math.abs(min));
      this.drawLineChart(this.maxSets, "#ffc78e");
      this.drawDotAndText(this.maxSets, "#ffc78e", "max");
      this.drawLineChart(this.minSets, "#84c1ff");
      this.drawDotAndText(this.minSets, "#84c1ff", "Math.abs(min)");
    },
    drawLineChart(arr, color) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          ctx.moveTo(45, 150 - (arr[i]+Math.abs(min)) * maxHeight);
        } else {
          ctx.lineTo(90 * i + 45, 150 - (arr[i]+Math.abs(min)) * maxHeight);
        }
      }
      ctx.stroke();
    },
    drawDotAndText(arr, color, position) {
      ctx.font = "16px YaHei";
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          ctx.beginPath();
          ctx.fillStyle = "#000";
          if (position === "max") {
            ctx.fillText(arr[i] + "°", 45-7, 130 -(arr[i]+Math.abs(min)) * maxHeight);
          } else {
            ctx.fillText(arr[i] + "°", 45-7, 180 - (arr[i]+Math.abs(min)) * maxHeight);
          }
          ctx.arc(45, 150 - (arr[i]+Math.abs(min)) * maxHeight, 3, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.fillStyle = "#000";
          if (position === "max") {
            ctx.fillText(arr[i] + "°", 90 * i + 45-7, 130 - (arr[i]+Math.abs(min)) * maxHeight);
          } else {
            ctx.fillText(arr[i] + "°", 90 * i + 45-7, 180 - (arr[i]+Math.abs(min)) * maxHeight);
          }
          ctx.arc(90 * i + 45, 150 - (arr[i]+Math.abs(min)) * maxHeight, 3, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.stroke();
        }
      }
    },
    findSets(data) {
      let maxArray = [];
      let minArray = [];
      for (let i = 0; i < data.length; i++) {
        maxArray.push(Math.max.apply(null, data[i]));
        minArray.push(Math.min.apply(null, data[i]));
      }
      this.maxSets = maxArray;
      this.minSets = minArray;
    },
  },
  created() {},
  watch:{
      chartData:{
          handler(){
              this.findSets(this.chartData)
              this.initCanvas()
          },
          deep:true
      }
  },
  mounted() {
    this.findSets(this.chartData);
    this.initCanvas();
  },
};
</script>

<style>
</style>