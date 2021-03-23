<template>
  <el-card class="box-card">
    <div class="clearfix">
      <h2 class="title">逐小时预报</h2>
      <el-pagination
        style="float: right; padding: 3px 0"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="this.pageSize"
        :page-sizes="[12, 24]"
        layout="prev, next"
        :total="24"
        :disabled="false"
      >
      </el-pagination>
    </div>
    <el-row :gutter="30">
      <el-col :span="2" v-for="(item, index) in onePage" :key="index">
        <div class="time">{{ item.update_time | time }}</div>
        <div class="short">{{ item.weather_short }}</div>
        <div class="degree">{{ item.degree + "°" }}</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      onePage: null,
      pageSize: 12,
      currentPage: 1,
      totalPageNum: null,
    };
  },
  methods: {
    handleCurrentChange(val) {
      if (val === 1) {
        console.log(this.onePage)
        this.onePage = Array.prototype.slice.call(Object.values(this.totalPageNum),0,12);
      }
      if (val === 2) {
        console.log(this.onePage)
        this.onePage = Array.prototype.slice.call(Object.values(this.totalPageNum),12,24);
      }
    },//如果页码是1，截取前12条，如果页码是2，截取后12条
    getTotalData(){
      this.totalPageNum = this.myData;
      this.onePage = Array.prototype.slice.call(Object.values(this.totalPageNum),0,12);
    }//获取每一项的数据，默认显示前12条
  },
  filters: {
    time(value) {
      return value.substr(8, 2) + ":00";
    },
  },
  computed:{
    myData(){
      return this.$store.state.data.forecast_1h
    }
  },
  watch:{
    myData(){
      this.getTotalData()
    }
  },
  mounted() {
    this.getTotalData()
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
  width: 1200px;
  margin: 170px auto 40px;
}
.title{
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
.el-row{
  text-align: center;
}
.el-col .time{
  font-size: 14px;
  color: #8a9baf;
  margin-bottom: 24px
}
.el-col .short{
  display: block;
  height: 30px;
  width: 30px;
  margin: 0 auto;
  margin-bottom: 18px
}
.el-col .degree{
  font-size: 18px;
  color: #384c78
}
</style>
