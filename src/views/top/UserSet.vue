<template>
  <div id="userSet" class="my-dialog">
    <div class="dialog-head">
      <div class="dialog-title">当前账号</div>
      <div class="dialog-close" @click="onClose">&nbsp;X&nbsp;</div>
    </div>
    <div class="dialog-body userset-content">
      <div class="form-item-div">
        <label for="ipt-account">账号名称</label>
        <input v-model="account" type="text" readonly>
      </div>
      <div class="form-item-div">
        <label for="">账号角色</label>
        <input v-model="role" type="text" readonly>
      </div>
      <div class="form-item-div">
        <label>当前密码</label>
        <input v-model="psdOld" type="text" autocomplete="off" required="required" maxlength="50">
      </div>
      <div class="form-item-div">
        <label>重置密码</label>
        <input v-model="psdNew" type="text" autocomplete="off" required="required" maxlength="50">
      </div>
      <div class="form-item-div">
        <label>确认密码</label>
        <input v-model="psdSure" type="text" autocomplete="off" required="required" maxlength="50">
      </div>
      <p class="error-p">{{errorP}}</p>
    </div>
    <div class="dialog-foot">
      <button class="sm-btn sure-btn" @click="onSure">确定</button>
      <button class="sm-btn grey-btn cancel-btn" @click="onClose">取消</button>
    </div>
  </div>
</template>

<script>
import {validType, isValidData} from 'common/util.js'

import {updateAlarmUserInfo} from 'network/user.js'

export default {
  name: 'UserSet',
  data() {
    return {
      curUser: null,
      account: '',
      role: '',
      psdOld: '',
      psdNew: '',
      psdSure: '',
      errorP: ''
    }
  },
  methods: {
    initUserSet(user){
      this.curUser = user
      this.account = user.account
      this.role = user.isAdmin === 1 ? "超级管理员" : "普通用户"
      this.psdOld = ''
      this.psdNew = ''
      this.psdSure = ''
      this.errorP = ''
    },
    /***事件 */
    onSure(){
      if(!this.validDataForm()){
        return
      }
      console.log('updateAlarmUserInfo');
      this.onClose()
    },
    onClose(){
      this.$parent.showUserSet = false
    },
    validDataForm(){
      if(!isValidData(this.psdOld,validType.VALID_NO_CHINESE,1,50)){
        this.errorP = "当前密码不能为空，且不能包含中文"
        return false;
      }
      if(!isValidData(this.psdNew,validType.VALID_NO_CHINESE,1,50)){
        this.errorP = "重置密码不能为空，且不能包含中文"
        return false;
      }
      if(!isValidData(this.psdSure,validType.VALID_NO_CHINESE,1,50)){
        this.errorP = "确认密码不能为空，且不能包含中文"
        return false;
      }
      if(this.psdNew !== this.psdSure){
        this.errorP = "两次密码输入不一致"
        return false;
      }
      return true
    }
  }
}
</script>

<style>
  #userSet{
    top: calc(50% - 170px);
    left: calc(50% - 220px);
    width:323px;
    height:285px;
  }
  .userset-content{
    line-height: initial;
  }
  .error-p{
    text-align: center;
    font-size:16px;
    color: red;
  }
</style>