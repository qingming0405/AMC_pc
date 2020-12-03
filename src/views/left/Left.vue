<template>
  <div id="left">
    <div class="logo-div">
      <img src="~assets/img/left/logo_white.png" alt="logo">
    </div>
    <main-tab-bar>

    </main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'Left',
  components: {
    MainTabBar
  }
}
</script>

<style scoped>
  #left {
    width: 200px;
  }
  .logo-div{
    height: 60px;
    width: 200px;
    background:rgba(0,119,211,1);
    text-align: center;
  }
  .logo-div img{
    margin: 17px auto;
  }
</style>