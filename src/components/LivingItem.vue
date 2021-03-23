<template>
  <div class="box" @mouseenter="change(2)" @mouseleave="change(1)">
      <transition name="translateY" >
      <div v-show="show === 1" class="item" :key="1">{{tips.name}}  {{tips.info}}</div>
      </transition>
      <transition name='translateY2'>
      <div v-show="show === 2" class="item" :key="2">{{tips.detail}}</div>
      </transition>
  </div>
</template>

<script>
export default {
    props:['data'],
  data() {
    return {
      show: 1,
    };
  },
  computed:{
      tips(){
          return this.data
      }
  },
  watch:{
      
  },
  methods: {
    change(index) {
      this.show=index
    },
  },
};
</script>

<style scoped>
.translateY-enter-active {
  animation: translateY .5s ease-in-out reverse;
}
.translateY-leave-active {
  animation: translateY .5s ease-in-out ;
}
.translateY2-enter-active {
  animation: translateY .5s ease-in-out;
}
.translateY2-leave-active {
  animation: translateY .5s ease-in-out reverse;
} 
@keyframes translateY {
  form {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-140px);
  }
}
.box {
  width: 200px;
  height: 140px;
  background-color: #fff;
  box-shadow: 0 0 14px 0 rgb(0 0 0 / 8%);
  border-radius: 10px;
  float: left;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: #384c78;
}
.item{
  width: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  font-size: 14px;
  box-sizing: border-box;
  padding: 25px;
}
</style>