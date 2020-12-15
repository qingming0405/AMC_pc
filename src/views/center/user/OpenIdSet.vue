<template>
  <div id="openids-box" class="modal-bg">
    <div class="modal-container openids-container">
      <div class="modal-head">
        <div class="modal-title">设置</div>
        <div class="modal-close" @click="onClose">&nbsp;X&nbsp;</div>
      </div>
      <div class="modal-body openids-content">
        <div v-for="(item, index) in curOpenIds" :key="index" class="openid-div">
          <span>{{item.official_account_name}}</span>
          <input type="text" v-model="item.open_id">
        </div>
      </div>
      <div class="modal-foot">
        <button class="sm-btn sure-btn" @click="onSure">确定</button>
        <button class="sm-btn grey-btn cancel-btn" @click="onClose">取消</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OpenIdSet',
  props: {
    officialAccounts: {
      type: Array,
      default: []
    }
  },
  data() {
    return{
      srcOpenIds: [],
      curOpenIds: []
    }
  },
  methods: {
    setOpenIds(user_id, openIds){
      this.srcOpenIds = openIds //保存原始数据（地址）
      this.curOpenIds = []
      let obj
      for(let oa of this.officialAccounts){
        obj = {}
        obj.official_account_id = oa.id
        obj.official_account_name = oa.name
        obj.user_id = user_id
        obj.open_id = this.getOpenId(oa.id, openIds)
        this.curOpenIds.push(obj)
      }
    },
    getOpenId(oaId, openIds){
      for(let obj of openIds){
        if(obj.official_account_id === oaId){
          return obj.open_id
        }
      }
      return ''
    },
    /***事件 */
    onSure(){
      //更新原始数据的内容
      this.srcOpenIds.splice(0, this.srcOpenIds.length, ...this.curOpenIds)
      this.onClose()
    },
    onClose(){
      this.$parent.showOpenIdSet = false
    }
  }
}
</script>

<style scoped>
  .openids-container{
    width: 440px;
    height: 350px;
  }
  .openids-content{
    height: 250px;
    margin-top: 5px;
  }
  .openid-div{
    font-size: inherit;
    height: 36px;
    color: #666666;
  }
  .openid-div span{
    width: 140px;
    text-align: right;
    display: inline-block;
  }
  .openid-div input{
    width: 270px;
    height: 26px;
    margin-left: 5px;
    font-size: inherit;
    border: 1px solid rgba(204,204,204,1);
    color: #666666;
  }
</style>