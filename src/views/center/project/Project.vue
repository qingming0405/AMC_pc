<template>
  <div id="project">
    <title-bar title="项目管理" :buttons="buttons" @btn-click="btnClick"/>
    <my-table :head-list="headList" :data-list="dataList" @td-btn-click="tdBtnClick"></my-table>
  </div>
</template>

<script>
import TitleBar from 'components/content/titleBar/TitleBar.vue'
import {cstTdType,MyTable} from 'components/common/table/MyTable.js'

import {getCurUser, isZZQA} from 'common/util.js'
import {getProjectInfo} from 'network/project.js'

export default {
  name: 'Project',
  components: {
    TitleBar,
    MyTable
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
        // {label: '工艺段/风场', pname: 'folder', showArrow: true, type: cstTdType.COMBOBOX},
        // {label: '项目管理员', pname: 'manager', showArrow: true, type: cstTdType.COO_COMBOBOX},
        // {label: '项目成员', pname: 'members', showArrow: true, type: cstTdType.MULTI_TEXT},
      ],
      dataList: [],
      newDataId: -1,
      folders: [],
      users: []
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
        this.folders = res.folders;
        this.users = res.users;
        this.dataList = this.localDataList(res.info)
        console.log(this.dataList);
      })
    },
    localDataList(data){
      for(let i=0; i<data.length; i++){
        data[i].needUpdate = false
        data[i].checkRow = false
        data[i].order = i+1
        data[i].id = data[i].project.id
        data[i].name = data[i].project.name
        data[i].folder = this.getFolderItem(data[i].project)
        data[i].manager = this.getManagerItem(data[i].managerInfo)
        data[i].members = this.getMembersItem(data[i].memberInfo)
      }
      return data;
    },
    getFolderItem(project){
      const options = []
      for(let folder of this.folders){
        options.push({label: folder.t_name, value: folder.t_name})
      }
      return {
        label: project.t_name,
        value: project.t_id,
        options
      }
    },
    getManagerItem(managerInfo){
      const options = []
      for(let user of this.users){
        options.push({label: user.username+'-'+user.phone, value: user.id})
      }
      return {
        label: managerInfo.username + '-' + managerInfo.phone,
        value: managerInfo.id,
        options
      }
    },
    getMembersItem(members){
      const texts = []
      for(let member of members){
        texts.push({text: member.username, fontBold: this.fontBold(member.company)})
      }
      return texts
    },
    fontBold(company){
      return isZZQA(company) ? '' : 'font-bold'
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
        case 'members':
          
          break;
      }
    }
  }
}
</script>

<style scoped>
  #project {
    width: 100%;
    height: calc(100vh - 60px);
    background: var(--bgcolor-wall);
  }
</style>