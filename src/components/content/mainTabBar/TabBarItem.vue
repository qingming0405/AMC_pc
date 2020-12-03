<template>
  <div class="tab-bar-item" @click="itemClick">
    <i class="iconfont" :class="iconClass"></i>
    <a>{{name}}</a>
    <span>&gt;</span>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    iconClass: '',
    path: '',
    name: ''
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .tab-bar-item{
    clear: both;
    width: 200px;
    height: 50px;
    color: #fff;
    line-height: 50px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
  .tab-bar-item a{
    margin-left: 5px;
    font-size: 16px;
    text-decoration: none;
    color: #fff;
  }
  .tab-bar-item:hover{
    background: rgba(255,255,255,0.3);
  }
  .tab-bar-item i{
    margin-left: 24px;
  }
  .tab-bar-item span{
    float: right;
    margin-right: 20px;
  }
</style>