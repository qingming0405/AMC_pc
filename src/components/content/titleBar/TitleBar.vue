<template>
  <div class="title-bar">
    <div class="title-div">{{title}}</div>
    <div class="control-div">
      <button v-for="(item,index) in buttons" :key="index" @click="btnClick(item.type)">
        {{item.label}}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TitleBar',
  data() {
    return {
      
    }
  },
  props: {
    title: '',
    buttons: {
      type: Array,
      default: []
    }
  },
  methods: {
    btnClick(type){
      this.$emit('btn-click', type)
    }
  }
}
</script>

<style scoped>
  .title-bar{
    width: 100%;
    height: 45px;
    line-height: 45px;
    position: relative;
  }
  .title-div{
    position: absolute;
    left: 30px;
    font-size:26px;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .control-div{
    position: absolute;
    right: 30px;
    top: 5px;
    height: 45px;
    line-height: 45px;
  }
  button{
    margin-left: 8px;
  }
</style>