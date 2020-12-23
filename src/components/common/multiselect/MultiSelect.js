import MultiSelect from './MultiSelect.vue'

const MyMultiSelect = {
  install(Vue, options) {
    const selectC = Vue.extend(MultiSelect);
    let selectI;
    const init = () => {
       selectI = new selectC();
       const dom = selectI.$mount().$el;
       document.body.appendChild(dom);
    };
    Vue.prototype.$multiselect = (methodOptions) => {
       if (!selectI) {
          init();
       }
       Object.assign(selectI, methodOptions);
       return selectI.showMultiSelect().then(res => {
         selectI = null
         return Promise.resolve(res)
       }).catch(err => {
         selectI = null
         return Promise.reject(err)
       })
    }
 },
}

export default MyMultiSelect