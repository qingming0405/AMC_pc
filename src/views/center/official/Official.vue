<template>
  <div id="official">
    <title-bar title="公众号管理" :buttons="buttons" @btn-click="btnClick"></title-bar>
    <my-table :head-list="headList" :data-list="dataList" @td-btn-click="tdBtnClick"></my-table>
    <qr-show ref="qrShow" v-show="showQRCode"></qr-show>
  </div>
</template>

<script>
import TitleBar from 'components/content/titleBar/TitleBar.vue'
import {cstTdType,MyTable} from 'components/common/table/MyTable.js'
import QrShow from './QrShow'

import {getAllOfficialAccounts, getQRCodeStr} from 'network/official'



export default {
  name: 'Official',
  components: {
    TitleBar,
    MyTable,
    QrShow 
  },
  data() {
    return {
      buttons:[
        {label: '新建', type: 'addOfficial'},
        {label: '保存', type: 'saveOfficials'},
        {label: '删除', type: 'deleteOfficials'}
      ],
      headList: [
        {label: ' ', pname: 'checkRow', showArrow: false, type: cstTdType.CHECKBOX},
        {label: '序号', pname: 'order', showArrow: false, type: cstTdType.SHOW},
        {label: '公众号名称', pname: 'name', showArrow: true, type: cstTdType.EDIT},
        {label: '模板ID', pname: 'template_id', showArrow: true, type: cstTdType.EDIT},
        {label: '微信推送地址', pname: 'url', showArrow: true, type: cstTdType.EDIT},
        {label: '报警跳转地址', pname: 'ip', showArrow: true, type: cstTdType.EDIT},
        {label: 'app_id', pname: 'app_id', showArrow: false, type: cstTdType.EDIT},
        {label: 'app_secret', pname: 'app_secret', showArrow: false, type: cstTdType.EDIT},
        {label: 'biz', pname: 'biz', showArrow: false, type: cstTdType.EDIT},
        {label: '二维码', pname: 'qrCode', showArrow: false, type: cstTdType.BUTTON}
      ],
      dataList: [],
      newDataId: -1,
      showQRCode: false
    }
  },
  created(){
    this.getAllOfficials()
  },
  methods:{
    getAllOfficials(){
      getAllOfficialAccounts().then(res => {
        this.dataList = this.localDataList(res.officialAccounts)
      })
    },
    localDataList(data){
      for(let i=0; i<data.length; i++){
        data[i].needUpdate = false
        data[i].showRow = true
        data[i].checkRow = false
        data[i].order = i+1
        data[i].qrCode = '查看'
      }
      return data;
    },
    /***事件 */
    btnClick(type){
      switch(type){
        case 'addOfficial':
          this.addOfficial()
          break
        case 'saveOfficials':
          this.saveOfficials()
          break
        case 'deleteOfficials':
          this.deleteOfficials()
      }
    },
    addOfficial(){
      this.$pop('添加公众号')
    },
    saveOfficials(){

    },
    deleteOfficials(){

    },
    tdBtnClick(rowItem,pname){
      switch(pname){
        case 'qrCode':
          this.qrShow(rowItem.id,rowItem.name)
          break;
      }
    },
    qrShow(id, name){
      let dataP = {"id":id};
      getQRCodeStr(dataP).then(res => {
        this.$refs.qrShow.setInfos(name, res.str)
        this.showQRCode = true
      })
     
    }
  }
}
</script>

<style scoped>
  #official {
    width: 100%;
    height: calc(100vh - 60px);
    background: var(--bgcolor-wall);
  }
</style>