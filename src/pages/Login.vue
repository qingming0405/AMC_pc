<template>
  <div id="login">
    <div class="login-box" @keydown="onKeyDown">
      <p>状态监测系统报警</p>
      <p>微信分级推送配置中心</p>
      <p><img src="~assets/img/login/logo.png" alt="logo"></p>
      <div class="user-item">
        <i class="iconfont icon-icon-"></i>
        <input type="text" v-model="account" placeholder="账号" autocomplete="off" required="required" maxlength="50">
      </div>
      <div class="user-item password-div">
        <i class="iconfont icon-mima-copy"></i>
        <input type="password" v-model="password" placeholder="密码" autocomplete="off" required="required" maxlength="50">
      </div>
      <div class="login-div">
        <button type="button" @click="onLogin()">登录</button>
      </div>
      <p class="error-p">{{errorInfo}}</p>
    </div>
    <div class="foot-div">
      <p>版权所有：浙江中自庆安新能源技术有限公司 {{version}}</p>
    </div>
  </div>
</template>

<script>
import {getVersion, login} from 'network/login'
import {amc_md5} from 'common/util'

export default {
  name: 'Login',
  data: function() {
    return {
      version: 'V 1.0',
      account: '',
      password: '',
      errorInfo: ''
    }
  },
  methods: {
    getVersion(){
      getVersion().then(res => {
        this.version = res
      })
    },
    onLogin(){
      if(this.account.length === 0){
        this.showError('用户名不能为空')
        return
      }
      if(this.password.length === 0){
        this.showError('密码不能为空')
        return
      }
      let password = amc_md5(this.password);
      login(this.account, password).then(res => {
        sessionStorage.amc_token = res.token;
        sessionStorage.amc_user = JSON.stringify(res.userInfo);
        this.$router.replace('/index').catch(err => {
          console.log(err)
        })
      })
    },
    showError(err){
      this.errorInfo = err
    },
    onKeyDown(event){
      if(event.keyCode === 13){
        this.onLogin();
      }
    }
  },
  created() {
    this.getVersion()
  }
}
</script>

<style scoped>
  #login{
    height: 100vh;
    background: url("~assets/img/login/backpic_1080.png") no-repeat center 0px;
    background-size: cover;
    font-family:PingFang SC;
    font-weight: 500;
    color:rgba(0,0,0,1);
  }
  input:focus, button:focus{
  outline: none;
}
.login-box{
  width:466px;
  height:450px;
  background:rgba(255,255,255,1);
  border-radius:20px;
  position: relative;
  left: 64%;
  top: 24%;
}
.login-box p{
  text-align: center;
  padding-top: 6px;
}
.login-box p:first-child{
  padding-top: 50px;
  font-size:20px;
}
.login-box p:nth-child(2){
  font-size:32px;
}
.login-box div{
  margin: 30px auto 0px;
  text-align: center;
  position: relative;
}
.login-box .password-div{
  margin-top: 22px;
}
.login-box i{
  position: absolute;
  left: 65px;
  top: 16px;
  color: #D2D2D2;
}
.login-box input,button{
  margin: 0px auto;
  border: none;
  font-family:PingFang SC;
  font-weight: 500;
}
.login-box input{
  width:323px;
  height:50px;
  background:rgba(247,247,247,1);
  font-size: 20px;
  padding: 0px 0px 0px 64px;
}
.login-box button{
  width:387px;
  height:50px;
  padding: 0px 0px;
  border-radius:26px;
  background:rgba(80,57,251,1);
  background-image: linear-gradient(to right,#008dff,#5039fb);
  box-shadow: 0px 8px 18px #008dff;
  font-size: 22px;
  color:rgba(255,255,255,1);
}
.login-box .error-p{
  padding-top: 10px;
  font-size:20px;
  color: red;
}
.foot-div{
  width: 98%;
  margin: 0px auto;
  position: absolute;
  bottom: 40px;
  text-align: center;
}
.foot-div p{
  font-size:16px;
  font-weight:bold;
  color:rgba(255,255,255,1);
}
</style>