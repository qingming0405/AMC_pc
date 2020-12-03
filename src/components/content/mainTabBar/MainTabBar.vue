<template>
  <div class="main-tab-bar">
    <tab-bar-item name="项目管理" iconClass="icon-zhuye" path="/index/project"/>
    <tab-bar-item name="人员管理" iconClass="icon-fl-renyuan" path="/index/user"/>
    <tab-bar-item name="公众号管理" iconClass="icon-gongzhonghao" path="/index/official"/>
    <tab-bar-item name="权限管理" iconClass="icon-shezhi" path="/index/rights"/>
  </div>
</template>

<script>
import TabBarItem from './TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBarItem
  }
}
</script>

<style scoped>
  .main-tab-bar{
    display: inline-block;
    width: 200px;
    height: calc(100vh - 60px);
    background: var(--bgcolor-tabbar);
  }
</style>