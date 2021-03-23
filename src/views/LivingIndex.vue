<template>
  <div class="container">
      <h3 class="title">生活指数</h3>
    <el-button @click="change('2')"
      class="button button-margin"><i class="el-icon-arrow-left"></i
    ></el-button>
    <el-button @click="change('1')"
    class="button"
      ><i class="el-icon-arrow-right"></i
    ></el-button>
    <el-carousel
      indicator-position="none"
      :autoplay="false"
      arrow="never"
      ref="carousel"
      height="490px"
    >
      <el-carousel-item :key="1">
        <LivingItem v-for="(item,index) in tips1" :key='index+"1"' :data='item'/>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <LivingItem v-for="(item,index) in tips2" :key='index+"2"' :data='item'/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import LivingItem from '@/components/LivingItem'
export default {
  components: {
      LivingItem
  },
  data(){
      return{
          tips1:null,
          tips2:null
      }
  },
  methods: {
    change(index) {
      this.$refs["carousel"].setActiveItem(index);
    },
  },
  computed: {
    myData(){
      return this.$store.state.data.index
    }
  },
  watch:{
    myData(){
      let {carwash,clothes,cold,comfort,diffusion,drying,fish,morning,sunscreen,tourism,traffic,umbrella}=this.myData
        this.tips1=[carwash,clothes,cold,comfort,diffusion,drying]
        this.tips2=[fish,morning,sunscreen,tourism,traffic,umbrella]
    }
  },
  mounted() {
    let {carwash,clothes,cold,comfort,diffusion,drying,fish,morning,sunscreen,tourism,traffic,umbrella}=this.myData
        this.tips1=[carwash,clothes,cold,comfort,diffusion,drying]
        this.tips2=[fish,morning,sunscreen,tourism,traffic,umbrella]
  },
};
</script>
<style scoped>
.container{
    float: right;
    width: 430px;
}
.title{
  line-height:normal;
  font-size: 18px;
  margin-left: 10px;
  font-weight: 400;
  color: #344665;
  display: inline-block;
  margin-bottom: 17px;
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
.button-margin{
  margin-left:250px;
  padding: 5px;
  border-radius:20px;
  
}
</style>