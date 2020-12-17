<template>
  <div ref="combobox" class="combobox" v-show="isShow" :style="styleObj" @click="comboClick">
    <div class="cb-ipt-div">
      <input type="text" v-model="curLabel" v-focus>
    </div>
    <ul>
      <li v-for="(item,index) in curOptions" :key="index" :pid="item.value" :title="item.label" @click="itemClick(item)">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  name: 'Combobox',
  props: {
    isShow: false,
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    styleObj: {
      type: Object,
      default: () => {
        return {top: "0px", left: "0px", width: '180px', height: '30px'}
      }
    }
  },
  data() {
    return {
      promise: "",
      resolve: "",
      reject: "",
      curLabel: '',
      needMatch: false,
      curOptions: []
    }
  },
  created() {
    // this.curLabel = this.label
  },
  mounted(){
    
  },
  watch: {
    curLabel: function(newValue, oldValue){
      if(oldValue != newValue){
        let result = []
        if(this.needMatch){
          result = this.options.filter((item) => {
            return item.label.indexOf(this.curLabel) >= 0
          })
        }
        else{
          Object.assign(result, this.options)
          this.needMatch = true
        }
        this.curOptions = result
      }
    }
  },
  directives: {
    //自定义指令
    focus: {
      inserted: function(el) {
        el.focus
      }
    }
  },
  methods: {
    showCombo(){
      this.isShow = true;
      this.curLabel = this.label
      setTimeout(() => {
        document.body.addEventListener('click', this.clickOutside)
      })
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    closeCombo(){
      this.isShow = false;
      setTimeout(() => {
        this.$destroy();
        document.body.removeEventListener('click', this.clickOutside)
        document.body.removeChild(this.$el);
      })
    },
    /**事件监听 */
    itemClick(item){
      // this.curLabel = item.label
      // this.label = item.label
      // this.value = item.value
      this.resolve && this.resolve(item)
      this.closeCombo()
    },
    comboClick(e){
      e.stopPropagation()
    },
    clickOutside(e){
      this.resolve({label:this.label, value:this.value})
      this.closeCombo()
    }
  }
}
</script>

<style scoped>

</style>