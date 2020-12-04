<template>
  <div id="user">
    <title-bar title="人员管理" @btnClick="btnClick" :buttons="buttons"></title-bar>
    <my-table ref="myTable" :headList="headList" :dataList="dataList" 
            @tdBtnClick="tdBtnClick"/>
    <open-id-set ref="openIdSet" v-show="showOpenIdSet" :officialAccounts="officialAccounts"></open-id-set>
  </div>
</template>

<script>
import TitleBar from 'components/content/titleBar/TitleBar.vue'
import {MyTable, cstTdType} from 'components/common/table/MyTable.js'
import OpenIdSet from './OpenIdSet.vue'

import {getAllUserInfo} from 'network/user'

export default {
  name: 'User',
  components: {
    TitleBar,
    MyTable,
    OpenIdSet
  }, 
  data() {
    return {
      cstTdType,
      defaultIconUrl: require('assets/img/user/portrait.png'),
      buttons:[
        {label: '新建', type: 'addUser'},
        {label: '保存', type: 'saveUsers'},
        {label: '删除', type: 'deleteUsers'}
      ],
      headList: [
        {label: ' ', pname: 'checkRow', showArrow: false, type: cstTdType.CHECKBOX},
        {label: '序号', pname: 'order', showArrow: false, type: cstTdType.SHOW},
        {label: '姓名', pname: 'username', showArrow: true, type: cstTdType.EDIT},
        {label: '手机号码', pname: 'phone', showArrow: true, type: cstTdType.EDIT},
        {label: '公司名称', pname: 'company', showArrow: true, type: cstTdType.EDIT},
        {label: '工作岗位', pname: 'post', showArrow: true, type: cstTdType.EDIT},
        {label: '微信昵称', pname: 'nickname', showArrow: false, type: cstTdType.EDIT},
        {label: '微信头像', pname: 'iconurl', showArrow: false, type: cstTdType.ICON},
        {label: '微信openId', pname: 'operate', showArrow: false, type: cstTdType.BUTTON},
        {label: '账号', pname: 'account', showArrow: false, type: cstTdType.EDIT},
        {label: '密码', pname: 'password', showArrow: false, type: cstTdType.EDIT},
      ],
      dataList: [],
      officialAccounts: [],//公众号列表
      newDataId: -1,
      showOpenIdSet: false
    }
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
        data[i].checkRow = false
        data[i].order = i+1
        if(data[i].iconurl==null || data[i].iconurl==="" || data[i].iconurl==="null" || data[i].iconurl === "../../assets/img/image/portrait.png"){
          //没有头像，或旧版本
          data[i].iconurl = this.defaultIconUrl
        }
        data[i].operate = '设置'
        data[i].password = "▪▪▪▪▪▪▪▪"
      }
      return data;
    },
    /***事件 */
    btnClick(type){
      switch(type){
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
    addUser() {
      this.dataList.unshift(this.createUser(this.newDataId,"","","","","","",0,"",this.defaultIconUrl,[]))
      this.newDataId--
      this.$refs.myTable.reOrderDataList()
    },
    saveUsers() {
      console.log(this.$refs.myTable.getUpdateRows())
    },
    deleteUsers() {
      console.log(this.$refs.myTable.getCheckedRowIds())
      this.dataList = this.$refs.myTable.getCheckedRows()
    },
    createUser(id,username,company,post,phone,account,password,isAdmin,nickname,iconurl,openIds){
      const obj = {};
      obj.needUpdate = false;
      obj.checkRow = false
      obj.order = 1
      obj.id=id;
      obj.username=username;
      obj.company=company;
      obj.post=post;
      obj.phone=phone;
      obj.account=account;
      obj.password=password;
      obj.isAdmin=isAdmin;
      obj.nickname=nickname;
      obj.iconurl=iconurl;
      obj.openIds=openIds;
      obj.operate = '设置'
      obj.account = ''
      obj.password = ''
      return obj;
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