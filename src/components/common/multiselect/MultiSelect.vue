<template>
  <div ref="multiSelect" class="select" v-show="isShow" :style="selectStyle" @click="selectClick" @mousewheel="selectClick">
    <ul>
      <li v-for="(item,index) in options" :key="index" :pid="item.value">
        <label class="check-label" :title="item.label">
          <input type="checkbox" v-model="item.check">
          {{item.label}}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  name: 'MultiSelect',
  props: {
    isShow: false,
    separator: '-',
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
  watch: {
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
      if((top+180)>vh){
        Object.assign(this.selectStyle, {'flex-direction': 'column-reverse'})
      }
      else{
        Object.assign(this.selectStyle, {'flex-direction': 'column'})
      }
    }
  },
  methods: {
    showMultiSelect(){
      this.isShow = true;
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
    getMultiLabel(){
      const labels = []
      this.options.forEach(item => {
        if(item.check){
          labels.push(item.label)
        }
      });
      return labels.join(this.separator)
    },
    /**事件监听 */
    selectClick(e){
      e.stopPropagation()
    },
    clickOutside(e){
      this.resolve({
        label: this.getMultiLabel(),
        options: this.options
      })
      this.closeSelect()
    }
  }
}
</script>

<style scoped>

</style>