<template>
  <div id="test">
    <my-table :head-list="headList" :data-list="dataList">

    </my-table>
  </div>
</template>

<script>
import MyTable from '../components/common/table/MyTable.vue'

export default {
  name: 'Test',
  components: {
    MyTable

  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    
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