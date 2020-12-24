<template>
  <div id="filterBox" class="modal-bg" v-show="isShow">
    <div class="modal-container">
      <div class="modal-body">
        <div class="filter-condition">
          <span>按值过滤：</span>
          <input type="text" v-model="curLabel" placeholder="搜索">
        </div>
        <div class="filter-control">
          <span @click="onCheckAll">全选</span>
          <span @click="onClearAll">清除</span>
        </div>
        <ul class="filter-content">
          <li v-for="(item, index) in curOptions" :key="index">
            <label class="check-label">
              <input type="checkbox" v-model="item.check">
              {{item.label}}
            </label>
          </li>
        </ul>
      </div>
      <div class="modal-foot">
        <button class="sm-btn sure-btn" @click="onSure">确定</button>
        <button class="sm-btn grey-btn cancel-btn" @click="onCancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FilterBox',
  props: {
    isShow: false,
    options: {
      type: Array,
      default: () => []
    },
    backConfig: { 
      type: Object,
      default: () => null
    }
  },
  data(){
    return {
      promise: "",
      resolve: "",
      reject: "",
      curLabel: null,
      curOptions: []
    }
  },
  watch: {
    curLabel: function(newValue, oldValue){
      if(oldValue != newValue){
        this.curOptions = this.options.filter((item) => {
          return item.label.indexOf(this.curLabel) >= 0
        })
      }
    }
  },
  methods: {
    showFilterBox(){
      this.isShow = true;
      this.curLabel = ''
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    closeFilterBox(){
      this.isShow = false;
      setTimeout(() => {
        this.$destroy();
        document.body.removeChild(this.$el);
      })
    },
    /**事件监听 */
    onSure(){
      this.resolve && this.resolve({options, backConfig})
      this.closeFilterBox()
    },
    onCancel(){
      this.resolve && this.resolve(null)
      this.closeFilterBox()
    },
    onCheckAll(){
      this.curOptions.forEach(item => {
        item.check = true
      });
    },
    onClearAll(){
      this.curOptions.forEach(item => {
        item.check = false
      });
    }
  }
}
</script>

<style scoped>
  .filter-condition input{
    font-size: 16px;
    border: 1px solid #d2d1d1;
    padding-left: 3px;
    width: 100%;
    height: 26px;
  }
  .check-control{
    text-align: right;
    word-spacing: 10px;
    color: var(--color-hyper);
  }
  .check-control span{
    user-select: none;
    cursor: pointer;
    margin-left: 10px;
  }
  .filter-content{
    margin: 0;
    padding: 0;
    list-style-type: none;
    max-height: 150px;
    min-height: 90px;
    overflow-y: auto;
  }
  .filter-content li{
    font-size: var(--font-size);
    font-weight: normal;
    height: 30px;
    line-height: 30px;
    cursor: default;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
  }
  .filter-content li:hover{
    background: var(--bgcolor-hover);
  }
</style>