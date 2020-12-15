<template>
  <div class="my-table">
    <table>
      <thead>
        <tr>
          <th v-for="(headItem,col) in headList" :key="col" pname="headItem.pname">
            {{headItem.label}}
            <span :class="showArrow(headItem.showArrow)"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rowItem, row) in dataList" :key="row" :pid="rowItem.id" :class="[trBgColor(row), fontBold(rowItem.fontBold)]" @click="selectTr(rowItem, row)" @keydown="selectTr(rowItem, row)">
          <td v-for="(headItem, col) in headList" :key="col" :pname="headItem.pname">
            <div v-if="headItem.type === cstTdType.SHOW">{{rowItem[headItem.pname]}}</div>
            <div v-else-if="headItem.type === cstTdType.EDIT" contenteditable="true" @input="tdEditInput($event, rowItem, headItem.pname)">{{rowItem[headItem.pname]}}</div>
            <input v-else-if="headItem.type === cstTdType.CHECKBOX" type="checkbox" v-model="rowItem[headItem.pname]">
            <img v-else-if="headItem.type === cstTdType.ICON" :src="rowItem[headItem.pname]" alt="">
            <span v-else-if="headItem.type === cstTdType.BUTTON" class="td-button" @click="tdBtnClick(rowItem, headItem.pname)">{{rowItem[headItem.pname]}}</span>
            <div v-else-if="headItem.type === cstTdType.COMBOBOX" @dblclick="tdDblClick($event, rowItem, headItem.pname)">{{rowItem[headItem.pname].label}}</div>
            <div v-else-if="headItem.type === cstTdType.COO_EDIT" contenteditable="true" @input="tdEditInput($event, rowItem, headItem.pname, true)">{{rowItem[headItem.pname]}}</div>
            <div v-else>{{rowItem[headItem.pname]}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {cstTdType} from './MyTable.js'

export default {
  name: 'MyTable',
  props: {
    headList: {
      type: Array,
      default: []
    },
    dataList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      cstTdType,
      curIndex: -1,
    }
  },
  components: {
    
  },
  computed: {
    
  },
  methods: {
    /***公共方法区 */
    reOrderDataList(){
      for(let i in this.dataList){
        this.dataList[i].order = parseInt(i)+1
      }
    },
    getUpdateRows(){
      return this.dataList.filter(rowItem => rowItem.needUpdate)
    },
    getCheckedRows(){
      return this.dataList.filter(rowItem => rowItem.checkRow)
    },
    getCheckedRowIds(){
      const checkedRowIds = []
      this.dataList.forEach(rowItem => {
        if(rowItem.checkRow){
          checkedRowIds.push(rowItem.id)
        }
      })
      return checkedRowIds
    },
    addRow(){

    },
    delRows(){

    },
    /***事件方法区 */
    showArrow(isShow){
      return isShow? 'arrow-icon' : ''
    },
    trBgColor(index){
      if(this.curIndex === index){
        return 'select-tr'
      }
      else if(index%2 == 1){
        return 'tr-bgcolor2'
      }
      return 'tr-bgcolor1'
    },
    fontBold(fontBold){
      if(typeof fontBold !== 'undefined' && fontBold === 'font-bold'){
        return 'font-bold'
      }
      return ''
    },
    selectTr(rowItem, index){
      this.curIndex = index
      rowItem['needUpdate'] = true
    },
    tdEditInput(event, rowItem, pname, isCoo=false){
      rowItem[pname] = event.target.textContent
      if(isCoo && this.$parent){
        this.$parent.cooTdEditInput(rowItem, pname)
      }
    },
    tdBtnClick(rowItem, pname){
      this.$emit('td-btn-click',rowItem,pname)
    },
    tdDblClick(event, rowItem, pname){
      // console.log(event);
      console.log(event.clientX - event.offsetX);
      // this.$emit('td-dbl-click',rowItem,pname)
    }
  }
}
</script>

<style scoped>
  .my-table{
    width: calc(100% - 60px);
    height: calc(100% - 75px);
    margin: 0px 30px 30px 30px;
    overflow-y: auto;
  }
  .my-table table{
    width: 100%;
    background: var(--bgcolor-table);
    border: 1px solid var(--border-table);
    border-collapse: collapse;
  }
  tr{
    height: 50px;
  }
  .tr-bgcolor1{
    background: var(--bgcolor-table);
  }
  .tr-bgcolor2{
    background: var(--bgcolor-wall);
  }
  .select-tr,tr:hover{
    background: var(--bgcolor-tr-hover);
  }
  th,td{
    border: 1px solid var(--border-table);
    text-align: center;
    outline: none;
    min-width: 30px;
  }
  th{
    font-size: var(--font-size-h2);
    color: var(--color-label);
    background-color: var(--bgcolor-th);
    position: relative;
  }
  th .arrow-icon{
    position: absolute;
    top: 24px;
    right: 5px;
  }
  td{
    position: relative;
    font-size: var(--font-size);
    color: var(--color-text);
    word-wrap: break-word;
    word-break: break-all;
  }
  .td-bgcolor1{
    background: var(--color-warn);
  }
  td div{
    font-size: inherit;
  }
  td img{
    width: 32px;
  }
  td .td-button{
    color: #63BBFF;
    cursor: pointer;
  }
</style>