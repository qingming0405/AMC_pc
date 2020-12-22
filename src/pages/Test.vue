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
      let arr1 = [{id:1, label:"赵"}, {id:2, label:"钱"}]
      let arr2 = this.deepCopy(arr1)
      arr2[1].label = '孙'
      console.log(arr2);
      console.log(arr1);
      this.needChange = true
      this.message = Math.round(Math.random()*100)
    },
    deepCopy(obj){
      return JSON.parse(JSON.stringify(obj))
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