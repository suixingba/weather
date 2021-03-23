<template>
  <div id="app">
    <Search class="container" v-if="this.$store.state.location!==null&&this.$store.state.currentLocation!==null"/>
    <el-divider></el-divider>
    <div class="container">
    <Current/>
    <Forecast24h  v-if="this.$store.state.data!==null"/>
    <Forecast7days v-if="this.$store.state.data!==null"/>
    <LivingIndex v-if="this.$store.state.data!==null"/>
    </div>
  </div>
</template>

<script>
import Search from '@/views/Search'
import Current from '@/views/Current'
import Forecast24h from '@/views/Forecast24h'
import Forecast7days from '@/views/Forecast7days'
import LivingIndex from '@/views/LivingIndex'
// eslint-disable-next-line no-undef
const geolocation = new qq.maps.Geolocation(
  "MEWBZ-5OQKI-DEMG4-5PDCA-RN4N3-JGFMR",
  "myapp"
);
export default {
  name: 'App',
  components: {
    Search,
    Current,
    Forecast24h,
    Forecast7days,
    LivingIndex,
  },
  data(){
    return{

    }
  },
  methods:{
    showPosition(position) {
      let { province, city, district } = position;
      this.$store.commit('getLocation',({
        province,
        city,
        district,
      }));
      this.$store.commit('currentLocation',({
        province,
        city,
        district,
      }));
      this.$store.dispatch('getJson')
    },
    showErr() {
      console.log("定位失败");
      geolocation.getIpLocation(this.showPosition, this.showErr);
    },
  },
  mounted(){
    geolocation.getIpLocation(this.showPosition, this.showErr);
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
  background: #f6f9fe url(../public/bg.jpg) no-repeat center top
}
#app .el-divider{
    margin: 0;
    background-color: rgba(255,255,255,.24);
}
.container{
  width: 1200px;
  margin: 0 auto;
  }
</style>
