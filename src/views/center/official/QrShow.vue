<template>
  <div id="qr-box" class="modal-bg">
    <div class="modal-container qr-container">
      <div class="modal-head">
        <div class="modal-title">{{title}}</div>
        <div class="modal-close" @click="onClose">&nbsp;X&nbsp;</div>
      </div>
      <div class="modal-body qrcode-content">
        <vue-qr ref="vueQr" :text="url" :size="size"/>
      </div>
      <div class="modal-foot">
        <button class="sm-btn sure-btn" @click="onDownload">下载</button>
        <button class="sm-btn grey-btn cancel-btn" @click="onClose">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueQr from 'components/common/qrcode/VueQr.vue'

import {downloadImg} from 'common/util.js'

export default {
  name: 'QrShow',
  components: {
    VueQr
  },
  data(){
    return {
      title: '',
      url: '',
      size: 180
    }
  },
  methods: {
    setInfos(title, url){
      this.title = title
      this.url = url
    },
    /***事件 */
    onDownload(){
      let src = this.$refs.vueQr.getImgSrc()
      downloadImg(src, this.title, "png")
    },
    onClose(){
      this.$parent.showQRCode = false
    }
  }
}
</script>

<style scoped>
  .qr-container{
    width: 260px;
    height: 280px;
  }
  .qrcode-content{
    height: 180px;
    width: 180px;
    padding: 5px;
    margin: 0px auto;
  }
</style>