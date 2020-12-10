<template>
  <div id="project">
    <title-bar title="项目管理" :buttons="buttons" @btn-click="btnClick"/>
    <my-table :head-list="headList" :data-list="dataList" @td-btn-click="tdBtnClick"></my-table>
  </div>
</template>

<script>
import TitleBar from 'components/content/titleBar/TitleBar.vue'
import {cstTdType,MyTable} from 'components/common/table/MyTable.js'

import {getCurUser} from 'common/util.js'
import {getProjectInfo} from 'network/project.js'

export default {
  name: 'Project',
  components: {
    TitleBar

  },
  data() {
    return {
      curUser: null,
      buttons:[
        {label: '新建', type: 'addUser'},
        {label: '保存', type: 'saveProjects'},
        {label: '删除', type: 'deleteProjects'}
      ],
      headList: [
        {label: ' ', pname: 'checkRow', showArrow: false, type: cstTdType.CHECKBOX},
        {label: '序号', pname: 'order', showArrow: false, type: cstTdType.SHOW},
        {label: '项目名称', pname: 'name', showArrow: true, type: cstTdType.EDIT},
        {label: '工艺段/风场', pname: 't_name', showArrow: true, type: cstTdType.COMBOBOX},
        {label: '项目管理员', pname: 'manager', showArrow: true, type: cstTdType.COO_COMBOBOX},
        {label: '项目成员', pname: 'members', showArrow: true, type: cstTdType.EDIT},
      ],
      dataList: [],
      newDataId: -1,
      showQRCode: false
    }
  },
  created(){
    this.getProjects()
  },
  methods:{
    getProjects(){
      this.curUser = getCurUser()
      const config = {"id": this.curUser.id, "isAdmin": this.curUser.isAdmin}
      getProjectInfo(config).then(res => {
        this.dataList = this.localDataList(res.info)
      })
    },
    localDataList(data){
      for(let i=0; i<data.length; i++){
        data[i].needUpdate = false
        data[i].checkRow = false
        data[i].order = i+1
        data[i].qrCode = '查看'
      }
      return data;
    },
    /***事件 */
    btnClick(type){
      switch(type){
        case 'addProject':
          this.addProject()
          break
        case 'saveProjects':
          this.saveProjects()
          break
        case 'deleteProjects':
          this.deleteProjects()
      }
    },
    addProject(){

    },
    saveProjects(){

    },
    deleteProjects(){

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

<style>

</style>