<template>
  <div id="project">
    <title-bar title="项目管理" :buttons="buttons" @btn-click="btnClick"/>
    <my-table ref="myTable" :head-list="headList" :data-list="dataList" 
               @coo-td-edit-blur="cooTdEditBlur" @td-dbl-click-back="tdDblClickBack" @td-dbl-click="tdDblClick"></my-table>
    <members-set ref="membersSet" v-show="showMembersSet" :users="users"></members-set>
  </div>
</template>

<script>
import TitleBar from 'components/content/titleBar/TitleBar.vue'
import {cstTdType,MyTable} from 'components/common/table/MyTable.js'
import MembersSet from './MembersSet.vue'

import {getCurUser, isZZQA, infoByCode, validType} from 'common/util.js'
import {getProjectInfo, insertAndUpdateProjects, delProjectByIds} from 'network/project.js'

export default {
  name: 'Project',
  components: {
    TitleBar,
    MyTable,
    MembersSet
  },
  data() {
    return {
      curUser: null,
      buttons:[
        {label: '清除筛选', type: 'clearFilter'},
        {label: '新建', type: 'addProject'},
        {label: '保存', type: 'saveProjects'},
        {label: '删除', type: 'deleteProjects'}
      ],
      headList: [
        {label: ' ', pname: 'checkRow', showArrow: false, type: cstTdType.CHECKBOX, style: {width: '30px'}},
        {label: '序号', pname: 'order', showArrow: false, type: cstTdType.ORDER, style: {width: '50px'}},
        {label: '项目名称', pname: 'name', showArrow: true, type: cstTdType.COO_EDIT, valid: {type: validType.VALID_ALL, minLen: 1, maxLen: 50}},
        {label: '工艺段/风场', pname: 'folder', showArrow: true, type: cstTdType.SELECT},
        {label: '项目管理员', pname: 'manager', showArrow: true, type: cstTdType.SELECT, style: {width: '140px'}},
        {label: '项目成员', pname: 'members', showArrow: false, type: cstTdType.MULTI_TEXT},
      ],
      dataList: [],
      newDataId: -1,
      folders: [],
      users: [],
      showMembersSet: false
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
      })
    },
    localDataList(data){
      for(let i=0; i<data.length; i++){
        data[i].needUpdate = false
        // data[i].showRow = true
        data[i].checkRow = false
        data[i].id = data[i].project.id
        data[i].name = data[i].project.name
        data[i].folder = this.getFolderItem(data[i].project)
        data[i].manager = this.getManagerItem(data[i].managerInfo)
        data[i].members = this.getMembersItem(data[i].memberInfo)
      }
      return data;
    },
    createProject(id,name,t_id,t_name,managerInfo,memberInfo){
      const obj = {};
      obj.needUpdate = true;//需要更新
      obj.checkRow = false
      obj.project = {id, name, t_id, t_name}
      obj.managerInfo = managerInfo;//管理员信息
      obj.memberInfo = memberInfo;//项目成员组信息
      obj.id = id;//项目id
      obj.name = name;//项目名称
      obj.folder = this.getFolderItem(obj.project)
      obj.manager = this.getManagerItem(obj.managerInfo)
      obj.members = this.getMembersItem(obj.memberInfo)
      return obj;
    },
    getFolderItem(project){
      const options = []
      for(let folder of this.folders){
        options.push({label: folder.t_name, value: folder.t_id})
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
      if(managerInfo==null || !managerInfo.hasOwnProperty("username")){
        return {
          label: '',
          value: -1,
          options
        }
      }
      else{
        return {
          label: managerInfo.username,
          value: managerInfo.id,
          options
        }
      }
    },
    getMembersItem(memberInfo, managerInfo){
      const texts = []
      for(let member of memberInfo){
        if(managerInfo != null && member.id === managerInfo.id){
          continue
        }
        texts.push({id: member.id, text: member.username, label: member.username+'-'+member.phone, fontBold: this.fontBold(member.company)})
      }
      return texts
    },
    fontBold(company){
      return isZZQA(company) ? '' : 'font-bold'
    },
    getPersonById(id){
      id = parseInt(id);
      let person = null;
      for(let i=0; i<this.users.length; i++){
        if(this.users[i].id === id){
          person = this.users[i];
          break;
        }
      }
      return person;
    },
    /***事件 */
    btnClick(type){
      switch(type){
        case 'clearFilter':
          this.clearFilter()
          break
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
    clearFilter(){
      this.$refs.myTable.clearFilter()
    },
    addProject(){
      this.dataList.unshift(this.createProject(this.newDataId,"",-1,"",{},[]));
      console.log(this.dataList);
      this.newDataId--
    },
    saveProjects(){
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
      insertAndUpdateProjects(updateRows).then(res => {
        if(res != null){
          const info = infoByCode(res.msg);
          this.$pop(info)
          if(res.msg === 0){
              this.getProjects()
          }
        }
      })
    },
    deleteProjects(){
      const delIds = this.$refs.myTable.getCheckedRowIds()
      delProjectByIds(delIds).then(res => {
        if(res != null){
          const info = infoByCode(res.msg);
          this.$pop(info)
          if(res.msg === 0){
              this.getProjects()
          }
        }
      })
    },
    cooTdEditBlur(rowItem, pname){
      switch(pname){
        case 'name':
          rowItem.project.name = rowItem[pname]
          break
      }
    },
    tdDblClick(rowItem,pname){
      switch(pname){
        case 'members':
          this.$refs.membersSet.initMembersSet(rowItem, rowItem[pname])
          this.showMembersSet = true
          break
      }
    },
    tdDblClickBack(rowItem,pname,result){
      switch(pname){
        case 'folder':
          Object.assign(rowItem[pname], result)
          rowItem.project.t_name = rowItem[pname].label
          rowItem.project.t_id = rowItem[pname].value
          break
        case 'manager':
          Object.assign(rowItem[pname], result)
          rowItem[pname].label = rowItem[pname] === '' ? '' : rowItem[pname].label.split('-')[0]
          rowItem.managerInfo = this.getPersonById(rowItem[pname].value)
          this.updateMembers(rowItem, rowItem.memberInfo, rowItem.managerInfo) //将某个项目成员转为项目管理员
          break
      }
    },
    updateMembers(rowItem, newMembers, managerInfo=null){
      const memberInfo = []
      let person
      for(let item of newMembers){
        person = this.getPersonById(item.id)
        if(person != null){
          memberInfo.push(person)
        }
      }
      rowItem.memberInfo = memberInfo
      rowItem.members = this.getMembersItem(memberInfo, managerInfo)
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