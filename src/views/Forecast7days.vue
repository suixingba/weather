<template>
  <el-card class="box-card">
    <div class="clearfix">
      <h2 class="title">7日天气预报</h2>
      <el-row>
        <el-col :span="3" v-for="(item, index) in myData" :key="index" class="item">
          <div class="fsize12">{{ item.time | timeFormat }}</div>
          <div>{{ item.day_weather }}</div>
          <div class="night">
            <div>{{ item.night_weather }}</div>
            <div class="fsize12">{{ item.night_wind_direction }}{{ item.night_wind_power + "级" }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <Chart :chartData="chartData" v-if="chartData.length !== 0" class="chart"/>
  </el-card>
</template>

<script>
import Chart from "@/components/Chart";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      chartData: [],
    };
  },
  methods: {
    initChartData(){
      this.chartData=[]
      Object.keys(this.myData).forEach((key) => {
        let { max_degree, min_degree } = this.myData[key];
        this.chartData[key] = [max_degree, min_degree];
      });
    }//将每一天的最高温度和最低温度返回传给图表组件
  },
  mounted() {
    this.initChartData()
  },
  computed:{
    myData(){
      return this.$store.state.data.forecast_24h
    }
  },
  watch:{
    myData(){
      this.initChartData()
    }
  },
  filters: {
    timeFormat(val) {
      let str = val.split("-");
      return `${str[1]}月${str[2]}日`;
    },
  },
};
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 760px;
  float: left;
  height: 510px;
  line-height: 40px;
  position: relative;
}
.chart{
  position: absolute;
  top: 200px;
}
.item {
  text-align: center;
}
.title{
  line-height:normal;
  font-size: 18px;
  margin-left: 20px;
  margin-bottom: 22px;
  font-weight: 400;
  color: #344665;
  display: inline-block;
}
.title::before{
  content: '';
  float: left;
  height: 7px;
  width: 7px;
  overflow: hidden;
  margin-right: 10px;
  background: #344665;
  border-radius: 50%;
  margin-top: 8px;
}
.night{
  margin-top:270px;
}
.fsize12{
 font-size: 12px;
 color: #c2c2c2;
}
</style>