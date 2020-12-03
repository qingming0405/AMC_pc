<template>
  <div id="main">
    <left></left>
    <div id="right">
      <top></top>
      <router-view></router-view>
    </div> 
  </div>
</template>

<script>
import Left from 'views/left/Left.vue'
import Top from 'views/top/Top.vue'


export default {
  name: 'Index',
  components:{
    Left,
    Top
  }
    
}
</script>

<style scoped>
  #main{
    display: flex;
    flex-wrap: wrap;
  }
  #right{
    display: flex;
    flex-direction: column;
    width: calc(100% - 200px);
  }
</style>