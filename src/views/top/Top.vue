<template>
  <div id="top">
    <div title="退出系统" @click="loginOut"><i class="iconfont icon-tuichu"></i></div>
    <div class="user-div" @click="showCurUserInfo">当前账号</div>
    <user-set ref="userSet" v-show="showUserSet"/>
  </div>
</template>

<script>

import {getCurUser} from 'common/util.js'
import UserSet from './UserSet.vue'

export default {
  name: 'Top',
  components: {
    UserSet
  },
  data() {
    return {
      showUserSet: false,
    }
  },
  methods: {
    loginOut(){
      this.$router.replace('/login').catch(err => {
        console.log(err)
      })
    },
    showCurUserInfo(){
      this.$refs.userSet.initUserSet(getCurUser())
      this.showUserSet = true
    }
  }
}
</script>

<style scoped>
  #top{
    display: flex;
    flex-direction: row-reverse;
    
    height: 60px;
    line-height: 60px;
    background: #fff;
    color: #0077D3;
  }
  #top i{
    margin-right: 30px;
    cursor: pointer;
  }
  #top .user-div{
    margin-right: 20px;
    font-size: 16px;
    font-weight: 400;
    user-select: none;
    cursor: pointer;
  }
</style>