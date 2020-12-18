<template>
  <div id="test">
    <h2>needChange = {{needChange}}</h2>
    <h2>message = {{message}}</h2>
    <h2>result = {{resultMsg}}</h2>
    <button @click="btnClick">点击</button>
  </div>
</template>

<script>

export default {
  name: 'Test',
  data() {
    return {
      message: 1,
      needChange: false,
      abc: {'a':100}
    }
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
      this.anull(this.abc)
    },
    anull(a){
      a = null
      console.log(this.abc);
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