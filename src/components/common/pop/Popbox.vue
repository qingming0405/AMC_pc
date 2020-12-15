<template>
  <div id="popbox" class="modal-bg" v-show="isShow">
    <div class="modal-container">
      <div class="modal-head">
        <div class="modal-title">{{title}}</div>
      </div>
      <div class="modal-body info-content">
        {{content}}
      </div>
      <div class="modal-foot">
        <button class="sm-btn sure-btn" @click="onSure">确定</button>
        <button v-show="modalType == 1" class="sm-btn grey-btn cancel-btn" @click="onCancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popbox',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    btnNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isShow: false,
      promise: "",
      resolve: "",
      reject: "",
    }
  },
  computed: {
    modalType: function(){
      return this.btnNum === 2 ? 1 : 0
    }
  },
  methods: {
    openPop(){
      this.isShow = true;
      document.addEventListener("keydown", this.enter);
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    closePop(){
      this.isShow = false;
      document.removeEventListener("keydown", this.onKeyHandler);
      setTimeout(() => {
        this.$destroy();
        document.body.removeChild(this.$el);
      })
    },
    /* 事件监听 */
    onSure(){
      this.modalType === 1 ? this.resolve(true) : this.resolve(false)
      this.closePop()
    },
    onCancel(){
      this.resolve(false)
      this.closePop()
    },
    //回车关闭
    onKeyHandler(e){
      if (e && e.keyCode === 13) {
        this.closeAlert(1);
      }
    }
  }
}
</script>

<style scoped>
  .info-content{
    width: 260px;
    height: 60px;
    padding: 20px;
    text-align: center;
    word-wrap: break-word;
    overflow: auto;
  }
</style>