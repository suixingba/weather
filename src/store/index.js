import Vue from 'vue'
import Vuex from 'vuex'
import { jsonp } from "vue-jsonp"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentLocation:null,
    location:null,
    data:null
  },
  mutations: { 
    getLocation(state,data){
      state.location=data
    },
    currentLocation(state,data){
      state.currentLocation=data
    },
    getData(state,data){
      state.data=data
    },
  },
  actions: {
    getJson({commit,state}){
      jsonp("https://wis.qq.com/weather/common", {
        source: "pc",
        weather_type: "forecast_1h|forecast_24h|index|observe",
        province:state.location.province,
        city:state.location.city,
        county:state.location.district,
      }).then((json) => {
        commit('getData',json.data)
      });
    },
  },
  modules: {
  }
})
