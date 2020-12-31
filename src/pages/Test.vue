<template>
  <div id="test">
    <h2>哈哈哈哈</h2>
    <button @click="btnClick">点击</button>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'Test',
  components: {
    
  },
  data() {
    return {
      dataList: [],
    }
  },
  created() {
    
  },
  mounted() {
    setTimeout(() => {
      this.setDataList(3)
    }, 1000);
  },
  computed: {
    
  },
  methods: {
    setDataList(len){
      const arr = []
      for(let i=0; i<len; i++){
        arr.push({label: 'xxxxxxxxx'+i})
      }
      this.dataList = arr
    },
    btnClick(){
      let len = Math.round(Math.random()*10)
      this.setDataList(len)
    }
  }
}
</script>

<style scoped>
  #test{
    padding: 30px;
    width: 800px;
    height: 100px;
    font-size: 16px;
    position: absolute;
    background-color: lavender;
    display: flex;
    flex-direction: column-reverse;
  }
  ul{
    /* display: flex;
    flex-direction: column-reverse; */
    overflow-y: auto;
    min-height: 90px;
    max-height: 150px;
  }
</style>