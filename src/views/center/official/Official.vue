<template>
  <div id="official">
    <title-bar title="公众号管理" :buttons="buttons" @btn-click="btnClick"></title-bar>
    <my-table ref="myTable" :head-list="headList" :data-list="dataList" @td-btn-click="tdBtnClick"></my-table>
    <qr-show ref="qrShow" v-show="showQRCode"></qr-show>
  </div>
</template>

<script>
import TitleBar from 'components/content/titleBar/TitleBar.vue'
import {cstTdType,MyTable} from 'components/common/table/MyTable.js'
import QrShow from './QrShow'

import {getAllOfficialAccounts, getQRCodeStr, insertAndUpdateOfficialAccounts, delOfficialAccountsById} from 'network/official'
import {infoByCode, validType} from 'common/util.js'

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
        {label: '清除筛选', type: 'clearFilter'},
        {label: '新建', type: 'addOfficial'},
        {label: '保存', type: 'saveOfficials'},
        {label: '删除', type: 'deleteOfficials'}
      ],
      headList: [
        {label: ' ', pname: 'checkRow', showArrow: false, type: cstTdType.CHECKBOX, style: {width: '30px'}},
        {label: '序号', pname: 'order', showArrow: false, type: cstTdType.ORDER, style: {width: '50px'}},
        {label: '公众号名称', pname: 'name', showArrow: false, type: cstTdType.EDIT, valid: {type: validType.VALID_ALL, minLen: 1, maxLen: 50}},
        {label: '模板ID', pname: 'template_id', showArrow: false, type: cstTdType.EDIT, valid: {type: validType.VALID_NO_CHINESE, minLen: 1, maxLen: 100}},
        {label: '微信推送地址', pname: 'url', showArrow: false, type: cstTdType.EDIT, valid: {type: validType.VALID_NO_CHINESE, minLen: 1, maxLen: 100}},
        {label: '报警跳转地址', pname: 'ip', showArrow: false, type: cstTdType.EDIT, valid: {type: validType.VALID_NO_CHINESE, minLen: 1, maxLen: 100}},
        {label: 'app_id', pname: 'app_id', showArrow: false, type: cstTdType.EDIT, valid: {type: validType.VALID_NO_CHINESE, minLen: 1, maxLen: 100}},
        {label: 'app_secret', pname: 'app_secret', showArrow: false, type: cstTdType.EDIT, valid: {type: validType.VALID_NO_CHINESE, minLen: 1, maxLen: 100}},
        {label: 'biz', pname: 'biz', showArrow: false, type: cstTdType.EDIT, valid: {type: validType.VALID_NO_CHINESE, minLen: 1, maxLen: 100}},
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
        // data[i].showRow = true
        data[i].checkRow = false
        data[i].qrCode = '查看'
      }
      return data;
    },
    createOfficialAccount(id,name,template_id,url,ip,app_id,app_secret,biz){
      const obj = {};
      obj.needUpdate = true;
      obj.checkRow = false
      obj.id = id;//公众号id
      obj.name = name;//公众号名
      obj.template_id = template_id;//模板id
      obj.url = url;//微信推送地址
      obj.ip = ip;//报警跳转地址
      obj.app_id = app_id;
      obj.app_secret = app_secret;
      obj.biz = biz;
      obj.qrCode = '查看'
      return obj;
    },
    /***事件 */
    btnClick(type){
      switch(type){
        case 'clearFilter':
          this.clearFilter()
          break
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
    clearFilter(){
      this.$refs.myTable.clearFilter()
    },
    addOfficial(){
      this.dataList.unshift(this.createOfficialAccount(this.newDataId,"","","","","","",""));
      this.newDataId--
    },
    saveOfficials(){
      const validData = this.$refs.myTable.doValidData()
      const updateRows = validData.updateRows
      if(updateRows.length === 0){
        this.$pop('数据未更改！')
        return
      }
      if(!validData.isValid){
        this.$pop('数据为空或格式不正确！')
        return
      }
      insertAndUpdateOfficialAccounts(updateRows).then(res => {
        if(res != null){
          const info = infoByCode(res.msg);
          this.$pop(info)
          if(res.msg === 0){
              this.getAllOfficials()
          }
        }
      })
    },
    deleteOfficials(){
      const delIds = this.$refs.myTable.getCheckedRowIds()
      delOfficialAccountsById(delIds).then(res => {
        if(res != null){
          const info = infoByCode(res.msg);
          this.$pop(info)
          if(res.msg === 0){
              this.getAllOfficials()
          }
        }
      })
    },
    tdBtnClick(rowItem,pname){
      switch(pname){
        case 'qrCode':
          this.qrShow(rowItem.id,rowItem.name)
          break;
      }
    },
    qrShow(id, name){
      if(id < 0){
        return
      }
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