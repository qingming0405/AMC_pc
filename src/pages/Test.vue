<template>
  <div id="test">
    <edit-div></edit-div>
  </div>
</template>

<script>
import EditDiv from '../components/common/table/EditDiv.vue';


export default {
  name: 'Test',
  components: {
    EditDiv
  },
  data() {
    return {
      data: '',
      message: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或',
      isEdit: false
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  watch: {
    message: function(newValue, oldValue) {
      console.log(newValue);
    }
  },
  computed: {
    
  },
  methods: {
    isEditChange(){
      this.isEdit = !this.isEdit
      this.$nextTick(() => {
        if(this.isEdit){ 
          this.$refs.textarea.focus()
        }
      })
      
    }
  }
}
</script>

<style scoped>
  #test{
    padding: 30px;
    width: 200px;
    height: 50px;
    font-size: 16px;
    background-color: lavender;
  }
</style>