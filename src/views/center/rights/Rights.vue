<template>
  <div id="rights">
    <title-bar title="权限管理" @btn-click="btnClick" :buttons="buttons"></title-bar>
    <my-table ref="myTable" :head-list="headList" :data-list="dataList" 
            @td-dbl-click-back="tdDblClickBack"/>
  </div>
</template>

<script>
import TitleBar from 'components/content/titleBar/TitleBar.vue'
import {cstTdType,MyTable} from 'components/common/table/MyTable.js'

import {getCurUser, isZZQA, infoByCode} from 'common/util.js'
import {getUserPrivilege, updateUserPri} from 'network/rights'

export default {
  name: 'Rights',
  components: {
    TitleBar,
    MyTable,

  },
  data() {
    return {
      curUser: null,
      buttons:[
        {label: '清除筛选', type: 'clearFilter'},
        {label: '保存', type: 'saveRights'},
      ],
      headList: [
        {label: ' ', pname: 'checkRow', showArrow: false, type: cstTdType.CHECKBOX, style: {width: '30px'}},
        {label: '序号', pname: 'order', showArrow: false, type: cstTdType.ORDER, style: {width: '50px'}},
        {label: '姓名', pname: 'userName', showArrow: true, type: cstTdType.SHOW, style: {width: '100px'}},
        {label: '项目名称', pname: 'projectName', showArrow: true, type: cstTdType.SHOW},
        {label: '工艺段/风场', pname: 't_name', showArrow: true, type: cstTdType.SHOW},
        {label: '项目角色', pname: 'projectRole', showArrow: false, type: cstTdType.SHOW, style: {width: '120px'}},
        {label: '公众号', pname: 'OAs', showArrow: false, type: cstTdType.MULTI_SELECT, style: {width: '120px'}},
        {label: '报警类型', pname: 'amcAlarmType', showArrow: false, type: cstTdType.MULTI_CHECKBOX},
        {label: '用户操作权限', pname: 'amcUserPri', showArrow: false, type: cstTdType.MULTI_CHECKBOX},
      ],
      dataList: [],
      newDataId: -1,
    }
  },
  created(){
    this.getUserPrivilege()
  },
  methods: {
    getUserPrivilege(){
      this.curUser = getCurUser()
      const config = {"id": this.curUser.id, "isAdmin": this.curUser.isAdmin}
      getUserPrivilege(config).then(res => {
        this.dataList = this.localDataList(res.data)
      })
    },
    localDataList(data){
      for(let i=0; i<data.length; i++){
        data[i].needUpdate = false
        // data[i].showRow = true
        data[i].checkRow = false
        data[i].userId = data[i].user_id;
        data[i].userName = data[i].user.username;
        data[i].company = data[i].user.company;
        data[i].fontBold = isZZQA(data[i].company) ? '' : 'font-bold'
        data[i].projectId = data[i].project_id;
        data[i].projectName = data[i].project.name;
        data[i].t_id = data[i].project.t_id;//组织id
        data[i].t_name = data[i].project.t_name;//组织名称
        data[i].projectRole = this.getProjectRole(data[i].type);
        data[i].OAs = this.getOAs(data[i].officialAccounts);//公众号
        data[i].amcAlarmType = this.getCheckLabelItems(JSON.parse(data[i].alarm_type));//报警类型
        data[i].amcUserPri = this.getCheckLabelItems(JSON.parse(data[i].user_pri));//用户操作权限
      }
      return data;
    },
    remoteDataList(data){
      for(let obj of data){
        obj.alarmType = this.remoteCheckItemsObj(obj.amcAlarmType)
        obj.userPri = this.remoteCheckItemsObj(obj.amcUserPri)
        obj.info = this.remoteOAs(obj.officialAccounts);
      } 
      return data
    },
    getProjectRole(type){
      switch(parseInt(type)){
        case 1:
          return "项目管理员";
        case 2:
          return "项目成员";
        default:
          return "未定义";
      }
    },
    getOAs(officialAccounts){
      const options = []
      for(let item of officialAccounts){
        options.push({
          label: item.name, 
          value: item.id, 
          check: item.beApplied===1 ? true : false
        })
      }
      return {
        label: this.getMultiLabel(options, ';'),
        separator: ';',
        options
      }
    },
    remoteOAs(OAs){
      if(OAs==null || OAs.length===0){
        return null;
      }
      const obj = {};
      for(let i=0; i<OAs.length; i++){
        obj[OAs[i].id] = OAs[i].beApplied;
      }
      return obj;
    },
    getMultiLabel(options, separator){
      const labels = []
      options.forEach(item => {
        if(item.check){
          labels.push(item.label)
        }
      });
      return labels.join(separator)
    },
    getCheckLabelItems(dataObj){
      let arr = []
      for(let key in dataObj){
        arr.push({
          check: dataObj[key] == 1,
          label: this.checkDirectory(key),
          value: key
        })
      }
      return arr
    },
    remoteCheckItemsObj(dataArr){
      let obj = {}
      for(let item of dataArr){
        obj[item.value] = item.check ? 1 : 0
      }
      console.log(obj);
      return obj
    },
    checkDirectory(key){
      switch(key){
        case 'h':
          return '预警'
        case 'hh':
          return '报警'
        case 'pushed':
          return '人工推送'
        case 'trend':
          return '趋势报警'
        case 'confirm':
          return '确认'
        case 'defend':
          return '维护'
        case 'push':
          return '推送'
        case 'refuse':
          return '拒绝'
        case 'reset':
          return '重置'
      }
    },
    /***事件 */
    clearFilter(){
      this.$refs.myTable.clearFilter()
    },
    saveRights(){
      const updateRows = this.$refs.myTable.getUpdateRows()
      const params = this.remoteDataList(updateRows)
      updateUserPri(params).then(res => {
        if(res != null){
          const info = infoByCode(res.msg);
          this.$pop(info)
          if(res.msg === 0){
              this.getUserPrivilege()
          }
        }
      })
    },
    btnClick(type){
      switch(type){
        case 'clearFilter':
          this.clearFilter()
          break
        case 'saveRights':
          this.saveRights()
          break
      }
    },
    tdDblClickBack(rowItem,pname,result){
      switch(pname){
        case 'OAs':
          Object.assign(rowItem[pname], result)
          this.updateOfficialAccounts(rowItem.officialAccounts, result.options)
          break
      }
    },
    updateOfficialAccounts(officialAccounts, newOptions){
      for(let item of officialAccounts){
        for(let option of newOptions){
          if(item.id === option.value){
            item.beApplied = option.check ? 1 : 0
            break
          }
        }
      }
    },
  }
}
</script>

<style scoped>
  #rights {
    width: 100%;
    height: calc(100vh - 60px);
    background: var(--bgcolor-wall);
  }
</style>
