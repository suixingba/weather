<template>
  <div class="header">
    <span
      class="position"
      @mouseenter="showAttentionList = true"
      @mouseleave="showAttentionList = false"
    >
      <i class="el-icon-location-outline"></i> {{location | initLocation}}
      <div class="position-item" v-show="showAttentionList">
        <div>
          <el-card class="position-box">
            <span class="position-title">关注的城市</span>
            <div v-show="attentionList.length===0" class="position-content">
              <span>点击'添加关注'添加城市哟</span>
            </div>
            <div v-show="attentionList.length>0" class="position-content">
              <ul>
                <li v-for="(item, index) in attentionList" :key="index">
                  <span>{{ item.district===''?item.city:item.district }}</span>
                  <span>天气</span>
                  <span>温度</span>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
      </div>
    </span>
    <span
      class="attention"
      :class="{ noAttention: noAttention }"
      @click="addAttention(location)"
      v-show="noAttention"
      >[添加关注]</span
    >
    <span class="attention" v-show="!noAttention">[已关注]</span>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="搜索市、区、县等"
      :trigger-on-focus="false"
      @select="handleSelect"
      @focus="_focus"
      @blur="delayBlur"
    ></el-autocomplete>
    <el-card class="box-card" v-show="showHistoryList">
      <div class="box-position">
        <span>当前定位</span>
        <div>
          {{currentLocation | initCurrent}}<i class="el-icon-location-outline"></i>
        </div>
      </div>
      <div class="box-history">
        <span>历史记录</span>
        <el-button @click="clearHistory()">清除</el-button>
        <div class="history">
          <div v-for="(h, index) in historyList" :key="index">{{ h.show }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import area from "../../public/area2";
export default {
  data() {
    return {
      restaurants: [],
      state: "",
      areaList: area,
      showHistoryList: false,
      historyList: [],
      noAttention: Boolean,
      attentionList: [],
      showAttentionList: false,
    };
  },
  methods: {
    addAttention(value) {
      let newAttentionList = [];
      if (window.localStorage.attentionCity) {
        newAttentionList = JSON.parse(window.localStorage.attentionCity);
      }
      newAttentionList.push({
        isDefault: false,
        ...value,
      });
      this.attentionList=newAttentionList;
      this.attentionYesOrNo(value)
      window.localStorage.setItem(
        "attentionCity",
        JSON.stringify(newAttentionList)
      );
    },//添加关注
    attentionYesOrNo(value){
      let a=this.attentionList.filter(i=>{
        return i.district===value.district&&i.city===value.city
      })
      if(a.length>0){
        this.noAttention=false
      }else{
        this.noAttention=true
      }
    },//判断是否关注
    addHistory(value){
      let newHistoryList=[]
      if (window.localStorage.searchHistory) {
        newHistoryList = JSON.parse(window.localStorage.searchHistory);
        newHistoryList=newHistoryList.filter((i) => {
          return i.show !== value.show
        });
      }
      newHistoryList.push(value);
      window.localStorage.setItem(
        "searchHistory",
        JSON.stringify(newHistoryList)
      );
      this.historyList = newHistoryList;
    },//添加历史记录
    delayBlur() {
      let _this = this;
      setTimeout(() => {
        _this.showHistoryList = false;
      }, 500);
    },//延迟失焦事件，因为子元素中有点击事件，立即失焦会触发不了点击事件
    _focus(e) {
      if (e.target.value === "") {
        this.showHistoryList = true;
      }
    },//获取焦点事件
    clearHistory() {
      window.localStorage.removeItem('searchHistory');
      this.historyList = "";
    },//清空历史记录
    querySearchAsync(queryString, cb) {
      this.showHistoryList = false;
      let area = this.areaList;
      let results = [];
      area.forEach((i) => {
        if (i.slice(3).indexOf(queryString) !== -1) {
          results.push({ value: i });
        }
      });
      cb(results);
    },//el-autocomplete事件，查询字符返回匹配的结果
    handleSelect(item) {
      item=item.value.split(",");
      let initItem={
        province:item[0],
        city:item[1],
        district:item[2]||''
      }
      let history = {
        ...initItem,
        show:initItem.district===''?initItem.city:initItem.district,
      };
      this.$store.commit("getLocation",initItem);
      this.$store.dispatch('getJson')
      this.state = "";
      this.attentionYesOrNo(initItem)
      this.addHistory(history)
    },//el-autocomplete事件，选择结果之后的回调
  },
  computed: {
    location(){
      return this.$store.state.location
    },
    currentLocation(){
      return this.$store.state.currentLocation
    }
  },
  filters: {
    initCurrent(value) {
      if (value.district === "") {
        return value.city;
      } else {
        return value.district;
      }
    },
    initLocation(value) {
      if (value.district === "") {
        return value.province + " " + value.city;
      } else {
        return value.city + " " + value.district;
      }
    },
  },
  mounted() {
    if (window.localStorage.searchHistory) {
      this.historyList = JSON.parse(window.localStorage.searchHistory);
    }
    if (window.localStorage.attentionCity) {
      this.attentionList = JSON.parse(window.localStorage.attentionCity);
    }
    this.attentionYesOrNo(this.location)
  },
};
</script>
<style scoped>
.header {
  height: 65px;
  text-align: right;
  line-height: 65px;
  position: relative;
}
.position {
  font-size: 16px;
  line-height: normal;
  color: #fff;
  cursor: pointer;
  position: relative;
  padding-bottom: 20px;
  z-index: 2;
}
.position-item {
  position: absolute;
  top: 30px;
  left: 0;
}
.position-box {
  width: 400px;
  min-height: 120px;
  text-align: left;
}
.position-title {
  font-size: 12px;
  color: #9f9f9f;
}
.position-content {
  margin-top: 15px;
  font-size: 14px;
  color: #9f9f9f;
  text-align: center;
  line-height: 20px;
}
.position-content li {
  display: flex;
  justify-content: space-between;
  list-style: none;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #555;
}
.position-content li span {
  width: 120px;
  text-align: left;
}
.position-content li span:last-child {
  width: 50px;
  text-align: right;
}
.header >>> .el-input__inner {
  border: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 49px;
  padding: 5px 13px;
  width: 277px;
  height: 30px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 20px;
  font-size: 14px;
}
.attention {
  font-size: 14px;
  color: #fff;
  opacity: 0.7;
  margin-right: 20px;
  margin-left: 15px;
}
.noAttention:hover {
  opacity: 1;
  cursor: pointer;
}
.box-card {
  text-align: left;
  width: 277px;
  position: absolute;
  right: -1px;
  top: 53px;
  padding: 20px 0 25px 0;
  line-height: normal;
}
.box-card >>> .el-card__body {
  padding: 0;
}
.box-card span {
  font-size: 12px;
  color: #9f9f9f;
  padding: 0 20px;
}
.box-position div {
  height: 14px;
  line-height: 14px;
  cursor: pointer;
  margin: 12px 0px 24px 20px;
}
.box-history .el-button {
  float: right;
  width: 40px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 9px;
  background-color: #f0f0f0;
  font-size: 12px;
  color: #868686;
  cursor: pointer;
  margin-right: 20px;
  margin-top: 5px;
  padding: 0;
}
.history {
  margin-top: 3px;
}
.history div {
  display: inline-block;
  height: 14px;
  line-height: 14px;
  cursor: pointer;
  margin: 12px 0px 0px 19px;
}
</style>