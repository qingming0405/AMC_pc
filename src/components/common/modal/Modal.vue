<template>
  <div class="modal-bg">
    <div class="modal-container">
      <div class="modal-head">
        <slot name="head">
          <div class="modal-title">{{title}}</div>
          <div v-show="showClose" class="modal-close" @click="onClose">&nbsp;X&nbsp;</div>
        </slot>
      </div>
      <div class="modal-body">
        <slot name="body">
          {{content}}
        </slot>
      </div>
      <div class="modal-foot">
        <slot>
          <button class="sm-btn sure-btn" @click="onSure">确定</button>
          <button v-show="operateType == 1" class="sm-btn grey-btn cancel-btn" @click="onClose">取消</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default : false
    },
    content: {
      type: String,
      default: ''
    },
    callback: {
      type: Function,
      default: null
    }
  },
  computed: {
    operateType: () => {
      return this.callback != null ? 1 : 0
    }
  },
  methods: {
    onSure(){
      if(this.operateType == 1){
        this.callback()
      }
      else{
        this.onClose()
      }
    },
    onClose(){
      this.$emit('close-modal')
    }
  }
}
</script>

<style>

</style>