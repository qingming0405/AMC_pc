<template>
  <div id="qrcode" ref="qrcode"></div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  name: 'VueQr',
  components: {
    QRCode
  },
  props: {
    text: '',
    size: {
      type: Number,
      default: 256
    }
  },
  mounted(){
    
  },
  watch :{
    text: function(newText, oldText){
      this.updateProps()
    },
    size: function(newSize, oldSize){
      this.updateProps()
    }
  },
  methods: {
    updateProps(){
      this.text.length>0 && this.createQrCode({
        text: this.text,
        width: this.size,
        height: this.size
      })
    },
    createQrCode({text, width=256, height=256, colorDark='#000000', colorLight='#ffffff', correctLevel=2}){
      this.$refs.qrcode.innerHTML = ''
      this.$nextTick(() => {
        new QRCode('qrcode', { text, width, height, colorDark, colorLight, correctLevel })
      })
    },
    getImgSrc(){
      return this.$refs.qrcode.getElementsByTagName('img')[0].src
    }
  }
}
</script>

<style>

</style>