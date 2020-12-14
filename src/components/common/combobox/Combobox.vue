<template>
  <div ref="combobox" class="combobox">
    <div>
      <input type="text" v-model="label">
    </div>
    <ul>
      <li v-for="(item,index) in options" :key="index" :pid="item.value">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Combobox',
  data() {
    return {
      label: '',
      value: '',
      options: []
    }
  },
  methods: {
    initCombobox(label, value, options){
      this.$refs.combobox.getElementsByTagName('input')[0].focus()
      this.label = label
      this.value = value
      this.options = options
    }
  }
}
</script>

<style scoped>

</style>