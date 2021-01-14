<template>
  <div id="user">
    <title-bar title="人员管理" @btn-click="btnClick" :buttons="buttons"></title-bar>
    <my-table ref="myTable" :head-list="headList" :data-list="dataList" 
            @td-btn-click="tdBtnClick" @coo-td-edit-blur="cooTdEditBlur"/>
    <open-id-set ref="openIdSet" v-show="showOpenIdSet" :official-accounts="officialAccounts"></open-id-set>
  </div>
</template>

<script>
import TitleBar from 'components/content/titleBar/TitleBar.vue'
import {MyTable, cstTdType} from 'components/common/table/MyTable.js'
import OpenIdSet from './OpenIdSet.vue'

import {getAllUserInfo,insertAndUpdateUsers,delUserById} from 'network/user'

import {isZZQA, amc_md5} from 'common/util.js'

export default {
  name: 'User',
  components: {
    TitleBar,
    MyTable,
    OpenIdSet
  }, 
  data() {
    return {
      defaultIconUrl: require('assets/img/user/portrait.png'),
      buttons:[
        {label: '清除筛选', type: 'clearFilter'},
        {label: '新建', type: 'addUser'},
        {label: '保存', type: 'saveUsers'},
        {label: '删除', type: 'deleteUsers'}
      ],
      headList: [
        {label: ' ', pname: 'checkRow', showArrow: false, type: cstTdType.CHECKBOX, style: {width: '30px'}},
        {label: '序号', pname: 'order', showArrow: false, type: cstTdType.ORDER, style: {width: '50px'}},
        {label: '姓名', pname: 'username', showArrow: true, type: cstTdType.EDIT, style: ''},
        {label: '手机号码', pname: 'phone', showArrow: true, type: cstTdType.EDIT, style: ''},
        {label: '公司名称', pname: 'company', showArrow: true, type: cstTdType.COO_EDIT, style: ''},
        {label: '工作岗位', pname: 'post', showArrow: true, type: cstTdType.EDIT, style: ''},
        {label: '微信昵称', pname: 'nickname', showArrow: false, type: cstTdType.EDIT, style: {width: '120px'}},
        {label: '微信头像', pname: 'iconurl', showArrow: false, type: cstTdType.ICON, style: {width: '100px'}},
        {label: '微信openId', pname: 'operate', showArrow: false, type: cstTdType.BUTTON, style: {width: '120px'}},
        {label: '账号', pname: 'account', showArrow: false, type: cstTdType.EDIT, style: ''},
        {label: '密码', pname: 'amcPassword', showArrow: false, type: cstTdType.EDIT, style: ''},
      ],
      dataList: [],
      officialAccounts: [],//公众号列表
      newDataId: -1,
      showOpenIdSet: false
    }
  },
  watch: {

  },
  created() {
    this.getAllUserInfo()
  },
  methods: {
    /***请求数据 */
    getAllUserInfo(){
      getAllUserInfo().then(res => {
        this.dataList = this.localDataList(res.userInfos)
        this.officialAccounts = res.officialAccounts
      })
    },
    localDataList(data){
      for(let i=0; i<data.length; i++){
        data[i].needUpdate = false
        // data[i].showRow = true
        data[i].fontBold = isZZQA(data[i].company) ? '' : 'font-bold'
        data[i].checkRow = false
        if(data[i].iconurl==null || data[i].iconurl==="" || data[i].iconurl==="null" || data[i].iconurl === "../../assets/img/image/portrait.png"){
          //没有头像，或旧版本
          data[i].iconurl = this.defaultIconUrl
        }
        data[i].operate = '设置'
        data[i].amcPassword = "▪▪▪▪▪▪▪▪"
        data[i].password = ''
      }
      return data;
    },
    remoteDataList(data){
      for(let i=0; i<data.length; i++){
        if(data[i].amcPassword==="▪▪▪▪▪▪▪▪"){
          data[i].password = "";
        }
        else{
          data[i].password = amc_md5(data[i].amcPassword);
        }
      }
      return data;
    },
    infoByCode(code) {
      let info;
      switch (code){
        case 0:
          info="操作成功";
          break;
        case 1:
          info="参数错误";
          break;
        case 2:
          info="后台错误";
          break;
        case 3:
          info="号码重复";
          break;
        case 4:
          info="账号重复";
          break;

        default:
          info = "未定义"
      }
      return info;
    },
    /***事件 */
    btnClick(type){
      switch(type){
        case 'clearFilter':
          this.clearFilter()
          break
        case 'addUser':
          this.addUser()
          break
        case 'saveUsers':
          this.saveUsers()
          break
        case 'deleteUsers':
          this.deleteUsers()
      }
    },
    clearFilter(){
      this.$refs.myTable.clearFilter()
    },
    addUser() {
      this.dataList.unshift(this.createUser(this.newDataId,"","","","","","",0,"",this.defaultIconUrl,[]))
      this.newDataId--
    },
    saveUsers() {
      const updateRows = this.$refs.myTable.getUpdateRows()
      if(updateRows.length === 0){
        return
      }
      const params = this.remoteDataList(updateRows)
      insertAndUpdateUsers(params).then(res => {
        if(res != null){
          const info = this.infoByCode(res.msg);
          this.$pop(info)
          if(res.msg === 0){
              this.getAllUserInfo()
          }
        }
      })
    },
    deleteUsers() {
      const delIds = this.$refs.myTable.getCheckedRowIds()
      delUserById(delIds).then(res => {
        if(res != null){
          const info = this.infoByCode(res.msg);
          this.$pop(info)
          if(res.msg === 0){
              this.getAllUserInfo()
          }
        }
      })
    },
    createUser(id,username,company,post,phone,account,password,isAdmin,nickname,iconurl,openIds){
      const obj = {};
      obj.needUpdate = true;
      // obj.showRow = true
      obj.fontBold = ''
      obj.checkRow = false
      obj.id=id;
      obj.username=username;
      obj.company=company;
      obj.post=post;
      obj.phone=phone;
      obj.account=account;
      obj.amcPassword=password;
      obj.isAdmin=isAdmin;
      obj.nickname=nickname;
      obj.iconurl=iconurl;
      obj.openIds=openIds;
      obj.operate = '设置'
      obj.account = ''
      obj.password = ''
      return obj;
    },
    cooTdEditBlur(rowItem, pname){
      switch(pname){
        case 'company':
          this.updateFontBold(rowItem)
          break
      }
    },
    updateFontBold(rowItem){
      rowItem.fontBold = isZZQA(rowItem.company) ? '' : 'font-bold'
    },
    tdBtnClick(rowItem,pname){
      switch(pname){
        case 'operate':
          this.openIdSet(rowItem.id, rowItem.openIds)
          break;
      }
    },
    openIdSet(user_id, openIds){
      this.$refs.openIdSet.setOpenIds(user_id, openIds)
      this.showOpenIdSet = true
    }
  }
}
</script>

<style scoped>
  #user {
    width: 100%;
    height: calc(100vh - 60px);
    background: var(--bgcolor-wall);
  }
</style>