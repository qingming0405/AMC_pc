<template>
  <div id="membersSet" class="modal-bg">
    <div class="modal-container members-container">
      <div class="modal-head">
        <div class="modal-title">{{title}}</div>
        <div class="modal-close" @click="onClose">&nbsp;X&nbsp;</div>
      </div>
      <div class="modal-body members-content">
        <div class="member-div" v-for="(member,index) in curMembers" :key="index">
          <div class="member-info" @dblclick="member_ondblclick($event, member)">
            {{member.label}}
          </div>
          <div class="del-ico" @click="onDelMember(index)">
            <i class="iconfont icon-jianhao1"></i>
          </div>
        </div>
      </div>
      <div class="modal-foot">
        <button class="sm-btn sure-btn add-btn" @click="onAddMember">添加成员</button>
        <button class="sm-btn sure-btn" @click="onSure">确定</button>
        <button class="sm-btn grey-btn cancel-btn" @click="onClose">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {deepCopy} from 'common/util.js'

export default {
  name: 'MembersSet',
  props: {
    users: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      title: '项目成员',
      srcRowItem: null,
      curMembers: [],
      newMemberId: -1
    }
  },
  methods: {
    initMembersSet(rowItem){
      this.srcRowItem = rowItem
      this.curMembers = deepCopy(rowItem.members)
    },
    getOptions(){
      const options = []
      for(let user of this.users){
        options.push({label: user.username+'-'+user.phone, value: user.id})
      }
      return options
    },
    correctMembers(){
      let ids = []
      return this.curMembers.filter((member) => {
        if(member.id >= 0 && ids.indexOf(member.id) === -1){
          ids.push(member.id)
          return true
        }
        return false
      })
    },
    /***事件 */
    onAddMember(){
      this.curMembers.push({id:this.newMemberId, label:''})
      this.newMemberId--
    },
    onDelMember(index){
      this.curMembers.splice(index, 1)
    },
    onSure(){
      this.$parent.updateMembers(this.srcRowItem, this.correctMembers())
      this.onClose()
    },
    onClose(){
      this.$parent.showMembersSet = false
    },
    member_ondblclick(e, member) {
      const item = {
        label: member.label,
        value: member.id,
        options: this.getOptions()
      }
      const styleObj = {
        //覆盖td
        unit: 'px',
        left: (e.clientX - e.offsetX - e.detail),
        top: (e.clientY - e.offsetY - e.detail),
        width: e.path[0].offsetWidth,
        height: e.path[0].offsetHeight,
      }
      this.$select(Object.assign(
        {},
        item,
        {styleObj}
      )).then(res => {
        member.id = res.value
        member.label = res.label
      })
    }
  }
}
</script>

<style scoped>
  .members-container{
    width: 350px;
    height: 350px;
  }
  .members-content{
    height: 250px;
    margin-top: 5px;
    overflow: auto;
  }
  .member-div{
    font-size: 16px;
    height: 36px;
    color: #666666;
    padding-left: 40px;
  }
  .member-div .member-info{
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 240px;
    height: 26px;
    padding-left: 3px;
    font-size: 16px;
    border: 1px solid rgba(204,204,204,1);
    color: #666666;
    user-select: none;
  }
  .member-div .del-ico{
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    margin: 3px;
  }
  .member-div .del-ico>i{
    color: #0077D3;
  }
  .add-btn{
    width: 80px;
  }
  .member-info .cb-ipt-div{
    height: 26px;
  }
  .member-info .cb-ipt-div input{
    background: #fff;
  }
</style>>

</style>