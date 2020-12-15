import Popbox from './Popbox.vue'

const MyPop = {
  install(Vue, options){
    const popC = Vue.extend(Popbox)
    let popI
    const init = () => {
      popI = new popC()
      const dom = popI.$mount().$el
      document.body.appendChild(dom)
    }
    Vue.prototype.$pop = (methodOptions) => {
      //初始化创建实例
      if(!popI){
        init()
      }
      //赋值参数
      if(typeof methodOptions === 'string'){
        popI.content = methodOptions
      }
      else{
        Object.assign(popI, methodOptions)
      }
      //返回处理结果
      return popI.openPop().then(res => {
        popI = null
        return Promise.resolve(res)
      }).catch(err => {
        popI = null
        return Promise.reject(err)
      })
    }
  }
}

export default MyPop