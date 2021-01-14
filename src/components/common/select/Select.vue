<template>
  <div ref="select" class="select" v-show="isShow" :style="selectStyle" @click="selectClick" @mousewheel="selectClick">
    <div class="cb-ipt-div">
      <input ref="ipt" type="text" v-model="curLabel">
    </div>
    <ul>
      <li v-for="(item,index) in curOptions" :key="index" :title="item.label" @click="itemClick(item)">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  name: 'Select',
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
      curLabel: null,
      needMatch: false,
      curOptions: [],
      styleParams: {
        unit: 'px',
        top: 0,
        left: 0,
        width: 180,
        height: 30,
      },
      selectStyle: {},
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
    },
    styleObj: function(newValue, oldValue) {
      this.styleParams.unit = newValue.unit
      this.styleParams.top = parseInt(newValue.top)
      this.styleParams.left = parseInt(newValue.left)
      this.styleParams.width = parseInt(newValue.width)
      this.styleParams.height = parseInt(newValue.height)
      const {unit, top, left, width, height} = this.styleParams
      this.selectStyle = {
        top: top + unit,
        left: left + unit,
        width: width + unit,
        height: height + unit
      }
      const vw = document.body.offsetWidth
      const vh = document.body.offsetHeight
      if((left+width*1.5+30)>vw){
        Object.assign(this.selectStyle, {'align-items': 'flex-end'})
      }
      else{
        Object.assign(this.selectStyle, {'align-items': 'stretch'})
      }
      if((top+height+180)>vh){
        Object.assign(this.selectStyle, {'flex-direction': 'column-reverse'})
      }
      else{
        Object.assign(this.selectStyle, {'flex-direction': 'column'})
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
    showSelect(){
      this.isShow = true;
      this.curLabel = this.label
      this.$nextTick(() => {
        this.$refs.ipt.focus()
      })
      setTimeout(() => {
        document.body.addEventListener('click', this.clickOutside)
        document.body.addEventListener('wheel', this.clickOutside)
      })
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    closeSelect(){
      this.isShow = false;
      setTimeout(() => {
        this.$destroy();
        document.body.removeEventListener('click', this.clickOutside)
        document.body.removeEventListener('wheel', this.clickOutside)
        if(document.body.contains(this.$el)){
          document.body.removeChild(this.$el);
        }
      })
    },
    /**事件监听 */
    itemClick(item){
      // this.curLabel = item.label
      // this.label = item.label
      // this.value = item.value
      this.resolve && this.resolve(item)
      this.closeSelect()
    },
    selectClick(e){
      e.stopPropagation()
    },
    clickOutside(e){
      this.resolve({label:this.label, value:this.value})
      this.closeSelect()
    }
  }
}
</script>

<style scoped>

</style>