<template>
  <div id="test">
    <my-table :head-list="headList" :data-list="dataList">

    </my-table>
  </div>
</template>

<script>
import {cstTdType,MyTable} from 'components/common/table/MyTable.js'

export default {
  name: 'Test',
  components: {
    MyTable

  },
  data() {
    return {
      headList: [
        {label: 'xxxxx第1列xxxxxyyyyyyyyyy', pname: 'name1', showArrow: false, type: cstTdType.SHOW, style: {width: '200px'}},
        {label: 'xxxxx第2列xxxxx', pname: 'name2', showArrow: false, type: cstTdType.SHOW, style: ''},
        {label: 'xxxxx第3列xxxxx', pname: 'name3', showArrow: false, type: cstTdType.SHOW, style: ''},
        {label: 'xxxxx第4列xxxxx', pname: 'name4', showArrow: false, type: cstTdType.SHOW, style: ''},
        {label: 'xxxxx第5列xxxxx', pname: 'name5', showArrow: false, type: cstTdType.SHOW, style: ''},
        {label: 'xxxxx第6列xxxxx', pname: 'name6', showArrow: false, type: cstTdType.SHOW, style: ''},
        {label: 'xxxxx第7列xxxxx', pname: 'name7', showArrow: false, type: cstTdType.SHOW, style: ''},
        {label: 'xxxxx第8列xxxxx', pname: 'name8', showArrow: false, type: cstTdType.SHOW, style: ''},
        {label: 'xxxxx第9列xxxxx', pname: 'name9', showArrow: false, type: cstTdType.SHOW, style: {width: '60px'}},
      ],
      dataList: [],
    }
  },
  created() {
    this.dataList = [
        {id:0, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:1, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:2, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:3, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:4, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:5, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:6, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:7, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:8, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:9, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:10, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:11, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:12, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:13, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:14, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:15, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:16, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:17, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:18, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:19, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:20, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:21, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:22, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:23, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:24, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:25, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:26, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:27, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:28, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:29, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:30, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:31, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:32, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:33, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:34, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:35, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:36, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:37, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:38, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:39, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:40, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:41, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:42, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:43, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:44, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:45, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:46, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:47, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:48, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:49, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:50, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:51, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:52, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:53, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:54, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:55, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:56, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:57, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:58, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:59, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:60, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:61, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:62, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:63, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:64, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:65, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:66, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:67, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:68, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:69, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:70, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:71, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:72, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:73, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:74, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:75, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:76, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:77, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:78, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
        {id:79, name1:1, name2:2, name3:3, name4:4, name5:5, name6:6, name7:7, name8:8, name9:9},
      ]
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
    width: 400px;
    height: 800px;
    font-size: 16px;
    position: relative;
    background-color: lavender;
  }
</style>