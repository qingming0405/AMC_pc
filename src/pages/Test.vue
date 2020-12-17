<template>
  <div id="test">
    <h2>needChange = {{needChange}}</h2>
    <h2>message = {{message}}</h2>
    <h2>result = {{resultMsg}}</h2>
    <button @click="btnClick">点击</button>
    <combobox :isShow="true" :label="label" :value="value" :options="options"/>
  </div>
</template>

<script>
import Combobox from '../components/common/combobox/Combobox.vue';

export default {
  components: { Combobox },
  name: 'Test',
  data() {
    return {
      message: 1,
      needChange: false,
      label: '张三',
      value: '20',
      options: [{label:'张三', value:'20'}, {label:'李四', value:'21'}, {label:'王五', value:'22'}]
    }
  },
  mounted() {
    console.log('aaaaaaaaaa');
  },
  computed: {
    resultMsg: function(){
      console.log('bbbbbbb');
      let result = ''
      if(this.needChange){
        result = 'a' + this.message
      }
      else{
        result = 'first'
        // this.needChange = true
      }
      return result
    }
  },
  methods: {
    btnClick(event){
      this.needChange = true
      this.message = Math.round(Math.random()*100)
    }
  }
}
</script>

<style scoped>
  #test{
    padding: 30px;
    width: 300px;
    height: 200px;
    font-size: 16px;
    position: relative;
  }
</style>