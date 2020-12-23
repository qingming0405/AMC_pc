import Select from './Select.vue'

const MySelect = {
  install(Vue, options) {
    const selectC = Vue.extend(Select);
    let selectI;
    const init = () => {
       selectI = new selectC();
       const dom = selectI.$mount().$el;
       document.body.appendChild(dom);
    };
    Vue.prototype.$select = (methodOptions) => {
       if (!selectI) {
          init();
       }
       Object.assign(selectI, methodOptions);
       return selectI.showSelect().then(res => {
         selectI = null
         return Promise.resolve(res)
       }).catch(err => {
         selectI = null
         return Promise.reject(err)
       })
    }
 },
}

export default MySelect