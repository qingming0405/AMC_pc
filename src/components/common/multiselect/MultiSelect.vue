<template>
  <div ref="multiSelect" class="select" v-show="isShow" :style="styleObj" @click="selectClick">
    <ul>
      <li v-for="(item,index) in options" :key="index" :pid="item.value">
        <label class="check-label">
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
      reject: ""
    }
  },
  methods: {
    showMultiSelect(){
      this.isShow = true;
      setTimeout(() => {
        document.body.addEventListener('click', this.clickOutside)
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
        document.body.removeChild(this.$el);
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